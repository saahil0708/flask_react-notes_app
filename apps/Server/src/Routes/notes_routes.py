from flask import Blueprint
from src.Middlewares.auth_middleware import require_auth
from src.Controllers.notes_controller import (
    add_note_controller, 
    get_notes_controller, 
    edit_note_controller, 
    remove_notes_controller,
    get_trashed_notes_controller,
    restore_notes_controller,
    permanently_delete_notes_controller
)

notes_bp = Blueprint('notes', __name__)

# Standard Note Routes
notes_bp.add_url_rule('', view_func=require_auth(add_note_controller), methods=['POST'])
notes_bp.add_url_rule('', view_func=require_auth(get_notes_controller), methods=['GET'])
notes_bp.add_url_rule('/<note_id>', view_func=require_auth(edit_note_controller), methods=['PATCH'])
notes_bp.add_url_rule('/bulk-delete', view_func=require_auth(remove_notes_controller), methods=['POST'])

# Trash Routes
notes_bp.add_url_rule('/trash', view_func=require_auth(get_trashed_notes_controller), methods=['GET'])
notes_bp.add_url_rule('/restore', view_func=require_auth(restore_notes_controller), methods=['POST'])
notes_bp.add_url_rule('/hard-delete', view_func=require_auth(permanently_delete_notes_controller), methods=['POST'])
