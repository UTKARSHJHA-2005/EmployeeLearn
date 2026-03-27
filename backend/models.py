from pydantic import BaseModel
from typing import List, Optional

class DAGNode(BaseModel):
    id: str
    label: str
    completed: bool = False

class DAGEdge(BaseModel):
    id: str
    source: str
    target: str

class LearningPath(BaseModel):
    nodes: List[DAGNode]
    edges: List[DAGEdge]

class Course(BaseModel):
    id: str
    title: str
    platform: str
    skills: List[str]
    level: Optional[str] = None
    duration_hours: Optional[int] = None
    url: Optional[str] = None

class AnalyzeResponse(BaseModel):
    skill_gap: List[str]
    learning_path: LearningPath
    courses: List[Course]
    estimated_weeks: int
