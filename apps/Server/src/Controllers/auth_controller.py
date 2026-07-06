from flask import Blueprint, request, jsonify
from flask_jwt_extended import set_access_cookies, unset_jwt_cookies, jwt_required
from src.Services.auth_service import register_user, login_user

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data or not data.get("email") or not data.get("password"):
        return jsonify({"error": "Missing email or password"}), 400
        
    response_data, status_code = register_user(data)
    return jsonify(response_data), status_code

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not data.get("email") or not data.get("password"):
        return jsonify({"error": "Missing email or password"}), 400
        
    response_data, status_code = login_user(data)
    
    response = jsonify({
        "message": response_data.get("message", "Login failed"),
        "user": response_data.get("user")
    })
    
    if status_code == 200:
        # Set the JWT token in an HTTP-only cookie
        set_access_cookies(response, response_data["token"])
        
    return response, status_code

@auth_bp.route('/logout', methods=['POST'])
def logout():
    response = jsonify({"message": "Logout successful"})
    unset_jwt_cookies(response)
    return response, 200

@auth_bp.route('/check', methods=['GET'])
@jwt_required()
def check_auth():
    return jsonify({"message": "Authenticated"}), 200
