from flask import request, jsonify, g
from src.Services.workspace_service import create_workspace, get_workspaces_for_user, delete_workspace

def add_workspace_controller():
    user_id = g.user_id
    data = request.get_json()
    
    if not data or not data.get("name"):
        return jsonify({"error": "Workspace name is required"}), 400
        
    response_data, status_code = create_workspace(data, user_id)
    return jsonify(response_data), status_code

def get_workspaces_controller():
    user_id = g.user_id
    response_data, status_code = get_workspaces_for_user(user_id)
    return jsonify(response_data), status_code

def remove_workspace_controller(workspace_id):
    user_id = g.user_id
    response_data, status_code = delete_workspace(workspace_id, user_id)
    return jsonify(response_data), status_code
