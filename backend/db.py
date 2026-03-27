import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

client = AsyncIOMotorClient(os.getenv("MONGO_URI", ""))
db = client[os.getenv("DB_NAME", "skill_gap_navigator")]

courses_col = db["courses"]
skills_col = db["skills"]
