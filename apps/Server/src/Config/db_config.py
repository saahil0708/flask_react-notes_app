from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

db = None

def connect_db():
    global db
    try:
        client = MongoClient(MONGO_URI)
        client.admin.command('ping')
        db = client.get_default_database(default='flask_notes')
        
        print("✅ Successfully connected to MongoDB via PyMongo!")
    except Exception as e:
        print(f"❌ Failed to connect to MongoDB: {e}")
        raise

def get_db():
    """Returns the database instance to be used across the app."""
    if db is None:
        raise Exception("Database not initialized. Call connect_db() first.")
    return db