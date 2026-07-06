from src.Config.db_config import get_db
from src.Models.user_model import create_user_doc
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token

def register_user(data):
    db = get_db()
    
    # Check if user exists
    if db.user.find_one({"email": data.get("email")}):
        return {"error": "User already exists"}, 400
        
    hashed_password = generate_password_hash(data.get("password"))
    user_doc = create_user_doc(
        user_name=data.get("user_name"),
        email=data.get("email"),
        password=hashed_password
    )
    
    db.user.insert_one(user_doc)
    return {"message": "User registered successfully"}, 201

def authenticate_user(email, password):
    db = get_db()
    user = db.user.find_one({"email": email})
    
    if user and check_password_hash(user["password"], password):
        return user
    
    return None
