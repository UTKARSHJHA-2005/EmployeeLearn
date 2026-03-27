"""Run once to seed the courses collection in MongoDB."""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URI = "mongodb+srv://innovate:Utkarsh%4012@cluster0.v6erg.mongodb.net/?appName=Cluster0"
DB_NAME = "skill_gap_navigator"

COURSES = [
    {"title": "The Complete JavaScript Course", "platform": "Udemy", "skills": ["JavaScript"], "level": "Beginner", "duration_hours": 69, "url": "https://www.udemy.com/course/the-complete-javascript-course/"},
    {"title": "React - The Complete Guide", "platform": "Udemy", "skills": ["React", "JavaScript"], "level": "Intermediate", "duration_hours": 48, "url": "https://www.udemy.com/course/react-the-complete-guide-incl-redux/"},
    {"title": "Next.js & React - The Complete Guide", "platform": "Udemy", "skills": ["Next.js", "React"], "level": "Intermediate", "duration_hours": 25, "url": "https://www.udemy.com/course/nextjs-react-the-complete-guide/"},
    {"title": "Understanding TypeScript", "platform": "Udemy", "skills": ["TypeScript", "JavaScript"], "level": "Intermediate", "duration_hours": 15, "url": "https://www.udemy.com/course/understanding-typescript/"},
    {"title": "Node.js - The Complete Guide", "platform": "Udemy", "skills": ["Node.js", "Express", "REST APIs"], "level": "Intermediate", "duration_hours": 40, "url": "https://www.udemy.com/course/nodejs-the-complete-guide/"},
    {"title": "Python Bootcamp", "platform": "Udemy", "skills": ["Python"], "level": "Beginner", "duration_hours": 22, "url": "https://www.udemy.com/course/complete-python-bootcamp/"},
    {"title": "FastAPI - The Complete Course", "platform": "Udemy", "skills": ["FastAPI", "Python", "REST APIs"], "level": "Intermediate", "duration_hours": 10, "url": "https://www.udemy.com/course/fastapi-the-complete-course/"},
    {"title": "Django for Everybody", "platform": "Coursera", "skills": ["Django", "Python"], "level": "Beginner", "duration_hours": 20, "url": "https://www.coursera.org/specializations/django"},
    {"title": "SQL for Data Science", "platform": "Coursera", "skills": ["SQL", "Data Analysis"], "level": "Beginner", "duration_hours": 12, "url": "https://www.coursera.org/learn/sql-for-data-science"},
    {"title": "MongoDB - The Complete Developer's Guide", "platform": "Udemy", "skills": ["MongoDB"], "level": "Beginner", "duration_hours": 17, "url": "https://www.udemy.com/course/mongodb-the-complete-developers-guide/"},
    {"title": "Docker & Kubernetes: The Practical Guide", "platform": "Udemy", "skills": ["Docker", "Kubernetes"], "level": "Intermediate", "duration_hours": 24, "url": "https://www.udemy.com/course/docker-kubernetes-the-practical-guide/"},
    {"title": "AWS Certified Solutions Architect", "platform": "Udemy", "skills": ["AWS", "Docker"], "level": "Advanced", "duration_hours": 27, "url": "https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/"},
    {"title": "Machine Learning A-Z", "platform": "Udemy", "skills": ["Machine Learning", "Python", "Statistics"], "level": "Intermediate", "duration_hours": 44, "url": "https://www.udemy.com/course/machinelearning/"},
    {"title": "Deep Learning Specialization", "platform": "Coursera", "skills": ["Deep Learning", "Machine Learning", "TensorFlow"], "level": "Advanced", "duration_hours": 80, "url": "https://www.coursera.org/specializations/deep-learning"},
    {"title": "Data Analysis with Pandas and Python", "platform": "Udemy", "skills": ["Pandas", "NumPy", "Python", "Data Analysis"], "level": "Beginner", "duration_hours": 19, "url": "https://www.udemy.com/course/data-analysis-with-pandas/"},
    {"title": "Git & GitHub Bootcamp", "platform": "Udemy", "skills": ["Git"], "level": "Beginner", "duration_hours": 17, "url": "https://www.udemy.com/course/git-and-github-bootcamp/"},
    {"title": "Linux Command Line Basics", "platform": "Udemy", "skills": ["Linux"], "level": "Beginner", "duration_hours": 8, "url": "https://www.udemy.com/course/linux-command-line-volume1/"},
    {"title": "System Design Interview", "platform": "Educative", "skills": ["System Design", "Microservices"], "level": "Advanced", "duration_hours": 15, "url": "https://www.educative.io/courses/grokking-the-system-design-interview"},
    {"title": "GraphQL with React", "platform": "Udemy", "skills": ["GraphQL", "React"], "level": "Intermediate", "duration_hours": 13, "url": "https://www.udemy.com/course/graphql-with-react-course/"},
    {"title": "CI/CD with GitHub Actions", "platform": "YouTube", "skills": ["CI/CD", "Docker", "Git"], "level": "Intermediate", "duration_hours": 5, "url": "https://www.youtube.com/results?search_query=github+actions+cicd"},
]


async def seed():
    client = AsyncIOMotorClient(MONGO_URI)
    db = client[DB_NAME]
    col = db["courses"]
    await col.delete_many({})
    result = await col.insert_many(COURSES)
    print(f"Inserted {len(result.inserted_ids)} courses.")
    client.close()


if __name__ == "__main__":
    asyncio.run(seed())
