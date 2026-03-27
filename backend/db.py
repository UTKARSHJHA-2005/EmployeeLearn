import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

client = AsyncIOMotorClient(os.getenv("MONGO_URI", "mongodb+srv://innovate:Utkarsh%4012@cluster0.v6erg.mongodb.net/?appName=Cluster0"))
db = client[os.getenv("DB_NAME", "skill_gap_navigator")]

courses_col = db["courses"]
skills_col = db["skills"]
