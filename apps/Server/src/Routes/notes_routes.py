from flask import Blueprint
from src.Middlewares.auth_middleware import require_auth
from src.Controllers.notes_controller import (
    add_note_controller, 
    get_notes_controller, 
    edit_note_controller, 
    remove_notes_controller
)

notes_bp = Blueprint('notes', __name__)

notes_bp.add_url_rule('', view_func=require_auth(add_note_controller), methods=['POST'])
notes_bp.add_url_rule('', view_func=require_auth(get_notes_controller), methods=['GET'])
notes_bp.add_url_rule('/<note_id>', view_func=require_auth(edit_note_controller), methods=['PATCH'])
notes_bp.add_url_rule('/bulk-delete', view_func=require_auth(remove_notes_controller), methods=['POST'])
