from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from src.Services.workspace_service import create_workspace, get_workspaces_for_user, delete_workspace

workspace_bp = Blueprint('workspaces', __name__)

@workspace_bp.route('', methods=['POST'])
@jwt_required()
def add_workspace():
    user_id = get_jwt_identity()
    data = request.get_json()
    
    if not data or not data.get("name"):
        return jsonify({"error": "Workspace name is required"}), 400
        
    response_data, status_code = create_workspace(data, user_id)
    return jsonify(response_data), status_code

@workspace_bp.route('', methods=['GET'])
@jwt_required()
def get_workspaces():
    user_id = get_jwt_identity()
    response_data, status_code = get_workspaces_for_user(user_id)
    return jsonify(response_data), status_code

@workspace_bp.route('/<workspace_id>', methods=['DELETE'])
@jwt_required()
def remove_workspace(workspace_id):
    user_id = get_jwt_identity()
    response_data, status_code = delete_workspace(workspace_id, user_id)
    return jsonify(response_data), status_code
