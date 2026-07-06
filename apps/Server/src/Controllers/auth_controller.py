from flask import request, jsonify
from flask_jwt_extended import set_access_cookies, unset_jwt_cookies, create_access_token
from src.Services.auth_service import register_user, authenticate_user

def register_controller():
    data = request.get_json()
    if not data or not data.get("email") or not data.get("password"):
        return jsonify({"error": "Missing email or password"}), 400
        
    response_data, status_code = register_user(data)
    return jsonify(response_data), status_code

def login_controller():
    data = request.json or {}
    
    user = authenticate_user(data.get("email"), data.get("password"))
    
    if user:
        access_token = create_access_token(identity=str(user["_id"]))
        
        # Include user data in response so the frontend knows who logged in
        response = jsonify(
            message="Login Successful!",
            user={
                "id": str(user["_id"]),
                "user_name": user["user_name"],
                "email": user["email"]
            }
        )
        
        set_access_cookies(response, access_token)
        return response, 200

    return jsonify(message="Invalid email or password"), 401

def logout_controller():
    response = jsonify({"message": "Logout Successful!"})
    unset_jwt_cookies(response)
    return response, 200

def check_auth_controller():
    return jsonify({"message": "Authenticated"}), 200
