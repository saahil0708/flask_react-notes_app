from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from src.Services.notes_service import create_note, get_notes_for_workspace, update_note, delete_notes

notes_bp = Blueprint('notes', __name__)

@notes_bp.route('', methods=['POST'])
@jwt_required()
def add_note():
    user_id = get_jwt_identity()
    data = request.get_json()
    
    if not data or not data.get("title") or not data.get("workspace_id"):
        return jsonify({"error": "Title and workspace_id are required"}), 400
        
    response_data, status_code = create_note(data, user_id)
    return jsonify(response_data), status_code

@notes_bp.route('', methods=['GET'])
@jwt_required()
def get_notes():
    user_id = get_jwt_identity()
    workspace_id = request.args.get("workspace_id") # Optional filter
    
    response_data, status_code = get_notes_for_workspace(workspace_id, user_id)
    return jsonify(response_data), status_code

@notes_bp.route('/<note_id>', methods=['PATCH'])
@jwt_required()
def edit_note(note_id):
    user_id = get_jwt_identity()
    data = request.get_json()
    
    response_data, status_code = update_note(note_id, data, user_id)
    return jsonify(response_data), status_code

@notes_bp.route('/bulk-delete', methods=['POST'])
@jwt_required()
def remove_notes():
    user_id = get_jwt_identity()
    data = request.get_json()
    
    if not data or not data.get("note_ids"):
        return jsonify({"error": "note_ids array is required"}), 400
        
    response_data, status_code = delete_notes(data.get("note_ids"), user_id)
    return jsonify(response_data), status_code
