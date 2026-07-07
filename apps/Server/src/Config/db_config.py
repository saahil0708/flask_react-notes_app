from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

db = None

def create_indexes(database):
    """Creates MongoDB indexes for faster querying."""
    try:
        # User index for fast login/registration checks
        database.user.create_index([("email", 1)], unique=True)
        
        # Notes indexes for fast fetching and filtering
        database.notes.create_index([("created_by", 1), ("is_trashed", 1)])
        database.notes.create_index([("created_by", 1), ("workspace_id", 1), ("is_trashed", 1)])
        
        # Workspace indexes
        database.workspaces.create_index([("created_by", 1)])
        print("✅ MongoDB Indexes created/verified successfully!")
    except Exception as e:
        print(f"⚠️ Failed to create indexes: {e}")

def connect_db():
    global db
    try:
        client = MongoClient(MONGO_URI)
        client.admin.command('ping')
        db = client.get_default_database(default='flask_notes')
        
        print("✅ Successfully connected to MongoDB via PyMongo!")
        
        # Initialize indexes for faster queries
        create_indexes(db)
    except Exception as e:
        print(f"❌ Failed to connect to MongoDB: {e}")
        raise

def get_db():
    """Returns the database instance to be used across the app."""
    if db is None:
        raise Exception("Database not initialized. Call connect_db() first.")
    return db