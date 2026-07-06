from flask import Blueprint
from src.Middlewares.auth_middleware import require_auth
from src.Controllers.workspace_controller import (
    add_workspace_controller, 
    get_workspaces_controller, 
    remove_workspace_controller
)

workspace_bp = Blueprint('workspaces', __name__)

workspace_bp.add_url_rule('', view_func=require_auth(add_workspace_controller), methods=['POST'])
workspace_bp.add_url_rule('', view_func=require_auth(get_workspaces_controller), methods=['GET'])
workspace_bp.add_url_rule('/<workspace_id>', view_func=require_auth(remove_workspace_controller), methods=['DELETE'])
