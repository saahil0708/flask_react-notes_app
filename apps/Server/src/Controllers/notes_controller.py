from flask import request, jsonify, g
from src.Services.notes_service import create_note, get_notes_for_workspace, update_note, delete_notes

def add_note_controller():
    user_id = g.user_id
    data = request.get_json()
    
    if not data or not data.get("title") or not data.get("workspace_id"):
        return jsonify({"error": "Title and workspace_id are required"}), 400
        
    response_data, status_code = create_note(data, user_id)
    return jsonify(response_data), status_code

def get_notes_controller():
    user_id = g.user_id
    workspace_id = request.args.get("workspace_id") # Optional filter
    
    response_data, status_code = get_notes_for_workspace(workspace_id, user_id)
    return jsonify(response_data), status_code

def edit_note_controller(note_id):
    user_id = g.user_id
    data = request.get_json()
    
    response_data, status_code = update_note(note_id, data, user_id)
    return jsonify(response_data), status_code

def remove_notes_controller():
    user_id = g.user_id
    data = request.get_json()
    
    if not data or not data.get("note_ids"):
        return jsonify({"error": "note_ids array is required"}), 400
        
    response_data, status_code = delete_notes(data.get("note_ids"), user_id)
    return jsonify(response_data), status_code
