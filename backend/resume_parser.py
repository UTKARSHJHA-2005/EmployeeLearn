"""
Simple resume parser — extracts text from PDF or plain text,
then matches against known skills.
"""
import io
import re
from typing import List

try:
    import pdfplumber
    PDF_SUPPORT = True
except ImportError:
    PDF_SUPPORT = False

KNOWN_SKILLS = {
    "python", "javascript", "typescript", "java", "c++", "c#", "go", "rust",
    "html", "css", "react", "vue", "angular", "next.js", "node.js", "express",
    "fastapi", "django", "flask", "spring", "sql", "postgresql", "mysql",
    "mongodb", "redis", "docker", "kubernetes", "aws", "azure", "gcp",
    "git", "linux", "rest apis", "graphql", "machine learning", "deep learning",
    "tensorflow", "pytorch", "pandas", "numpy", "data analysis", "statistics",
    "system design", "microservices", "ci/cd",
}


def extract_text(file_bytes: bytes, filename: str) -> str:
    if filename.lower().endswith(".pdf") and PDF_SUPPORT:
        with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
            return "\n".join(page.extract_text() or "" for page in pdf.pages)
    return file_bytes.decode("utf-8", errors="ignore")


def extract_skills(text: str) -> List[str]:
    text_lower = text.lower()
    found = []
    for skill in KNOWN_SKILLS:
        # Use word boundary matching
        pattern = r'\b' + re.escape(skill) + r'\b'
        if re.search(pattern, text_lower):
            # Return in title case for display
            found.append(skill.title())
    return found
