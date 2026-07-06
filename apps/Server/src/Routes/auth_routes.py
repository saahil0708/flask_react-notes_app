from flask import Blueprint
from src.Middlewares.auth_middleware import require_auth
from src.Controllers.auth_controller import (
    register_controller, 
    login_controller, 
    logout_controller, 
    check_auth_controller
)

auth_bp = Blueprint('auth', __name__)

auth_bp.add_url_rule('/register', view_func=register_controller, methods=['POST'])
auth_bp.add_url_rule('/login', view_func=login_controller, methods=['POST'])
auth_bp.add_url_rule('/logout', view_func=logout_controller, methods=['POST'])

# Apply custom middleware
auth_bp.add_url_rule('/check', view_func=require_auth(check_auth_controller), methods=['GET'])
