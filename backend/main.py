from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from bson import ObjectId
import math

from db import courses_col
from dag import build_dag, topological_order
from resume_parser import extract_text, extract_skills
from models import AnalyzeResponse, LearningPath, DAGNode, DAGEdge, Course

app = FastAPI(title="Skill Gap Navigator API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Profile -> required skills mapping (extend as needed)
# ---------------------------------------------------------------------------
PROFILE_SKILLS = {
    "frontend developer": ["HTML", "CSS", "JavaScript", "React", "Git"],
    "junior frontend developer": ["HTML", "CSS", "JavaScript", "React", "Git"],
    "backend developer": ["Python", "Node.js", "SQL", "REST APIs", "Docker", "Git"],
    "full stack engineer": ["HTML", "CSS", "JavaScript", "React", "Node.js", "SQL", "REST APIs", "Docker", "Git"],
    "full stack developer": ["HTML", "CSS", "JavaScript", "React", "Node.js", "SQL", "REST APIs", "Docker", "Git"],
    "data scientist": ["Python", "Statistics", "Machine Learning", "Pandas", "NumPy", "SQL"],
    "ml engineer": ["Python", "Machine Learning", "Deep Learning", "TensorFlow", "Docker"],
    "devops engineer": ["Linux", "Docker", "Kubernetes", "CI/CD", "AWS", "Git"],
    "software engineer": ["Python", "SQL", "REST APIs", "System Design", "Git", "Docker"],
}


def normalize(profile: str) -> str:
    return profile.strip().lower()


def get_profile_skills(profile: str):
    key = normalize(profile)
    # Exact match
    if key in PROFILE_SKILLS:
        return PROFILE_SKILLS[key]
    # Partial match
    for k, v in PROFILE_SKILLS.items():
        if k in key or key in k:
            return v
    return []


@app.post("/api/analyze", response_model=AnalyzeResponse)
async def analyze(
    resume: UploadFile = File(...),
    current_profile: str = Form(...),
    desired_profile: str = Form(...),
    hours_per_week: int = Form(...),
):
    # 1. Parse resume
    file_bytes = await resume.read()
    resume_text = extract_text(file_bytes, resume.filename)
    current_skills = set(s.lower() for s in extract_skills(resume_text))

    # Also add skills implied by current profile
    for s in get_profile_skills(current_profile):
        current_skills.add(s.lower())

    # 2. Determine required skills for desired profile
    required_skills = get_profile_skills(desired_profile)
    if not required_skills:
        raise HTTPException(
            status_code=400,
            detail=f"Unknown desired profile '{desired_profile}'. Try: Full Stack Engineer, Data Scientist, DevOps Engineer, etc."
        )

    # 3. Compute skill gap
    skill_gap = [s for s in required_skills if s.lower() not in current_skills]

    if not skill_gap:
        # User already has all skills
        return AnalyzeResponse(
            skill_gap=[],
            learning_path=LearningPath(nodes=[], edges=[]),
            courses=[],
            estimated_weeks=0,
        )

    # 4. Build DAG
    raw_nodes, raw_edges = build_dag(skill_gap)
    nodes = [DAGNode(**n) for n in raw_nodes]
    edges = [DAGEdge(**e) for e in raw_edges]

    # 5. Fetch courses from MongoDB
    ordered_skills = topological_order(raw_nodes, raw_edges)
    courses_cursor = courses_col.find({"skills": {"$in": skill_gap}})
    raw_courses = await courses_cursor.to_list(length=20)

    # Sort courses by skill order
    skill_order = {s: i for i, s in enumerate(ordered_skills)}
    def course_priority(c):
        return min((skill_order.get(s, 999) for s in c.get("skills", [])), default=999)

    raw_courses.sort(key=course_priority)

    courses = [
        Course(
            id=str(c["_id"]),
            title=c["title"],
            platform=c.get("platform", ""),
            skills=c.get("skills", []),
            level=c.get("level"),
            duration_hours=c.get("duration_hours"),
            url=c.get("url"),
        )
        for c in raw_courses
    ]

    # 6. Estimate weeks
    total_hours = sum(c.duration_hours or 10 for c in courses) if courses else len(skill_gap) * 10
    estimated_weeks = max(1, math.ceil(total_hours / hours_per_week))

    return AnalyzeResponse(
        skill_gap=skill_gap,
        learning_path=LearningPath(nodes=nodes, edges=edges),
        courses=courses,
        estimated_weeks=estimated_weeks,
    )


@app.get("/api/health")
async def health():
    return {"status": "ok"}
