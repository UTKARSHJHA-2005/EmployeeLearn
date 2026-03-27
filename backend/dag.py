"""
DAG builder for skill learning paths.
Each skill node may have prerequisites (edges pointing to it).
We do a topological sort to produce an ordered learning path.
"""
from collections import defaultdict, deque
from typing import List, Dict, Tuple

# Skill prerequisite map: skill -> [prerequisites]
# This can be extended or loaded from MongoDB
SKILL_PREREQS: Dict[str, List[str]] = {
    "React": ["JavaScript", "HTML", "CSS"],
    "Next.js": ["React", "Node.js"],
    "TypeScript": ["JavaScript"],
    "Node.js": ["JavaScript"],
    "Express": ["Node.js"],
    "FastAPI": ["Python"],
    "Django": ["Python"],
    "PostgreSQL": ["SQL"],
    "MongoDB": [],
    "Docker": [],
    "Kubernetes": ["Docker"],
    "AWS": ["Docker"],
    "GraphQL": ["REST APIs"],
    "REST APIs": [],
    "SQL": [],
    "Python": [],
    "JavaScript": ["HTML"],
    "HTML": [],
    "CSS": ["HTML"],
    "Machine Learning": ["Python", "Statistics"],
    "Statistics": [],
    "Deep Learning": ["Machine Learning"],
    "Data Analysis": ["Python", "Statistics"],
    "Pandas": ["Python"],
    "NumPy": ["Python"],
    "TensorFlow": ["Deep Learning"],
    "PyTorch": ["Deep Learning"],
    "CI/CD": ["Docker"],
    "Git": [],
    "Linux": [],
    "System Design": ["REST APIs", "SQL"],
    "Redis": [],
    "Microservices": ["Docker", "REST APIs"],
}


def build_dag(skill_gap: List[str]) -> Tuple[List[dict], List[dict]]:
    """
    Given a list of skills the user needs to learn,
    expand with prerequisites and return DAG nodes + edges.
    """
    # Expand skills with all transitive prerequisites
    all_skills = set()
    queue = deque(skill_gap)
    while queue:
        skill = queue.popleft()
        if skill in all_skills:
            continue
        all_skills.add(skill)
        for prereq in SKILL_PREREQS.get(skill, []):
            if prereq not in all_skills:
                queue.append(prereq)

    # Build edges: prereq -> skill
    edges = []
    edge_id = 0
    for skill in all_skills:
        for prereq in SKILL_PREREQS.get(skill, []):
            if prereq in all_skills:
                edges.append({
                    "id": f"e{edge_id}",
                    "source": prereq,
                    "target": skill,
                })
                edge_id += 1

    nodes = [{"id": s, "label": s, "completed": False} for s in all_skills]
    return nodes, edges


def topological_order(nodes: List[dict], edges: List[dict]) -> List[str]:
    """Returns skills in learning order (prerequisites first)."""
    in_degree = defaultdict(int)
    adj = defaultdict(list)
    all_ids = {n["id"] for n in nodes}

    for e in edges:
        adj[e["source"]].append(e["target"])
        in_degree[e["target"]] += 1

    queue = deque([n["id"] for n in nodes if in_degree[n["id"]] == 0])
    order = []
    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbor in adj[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return order
