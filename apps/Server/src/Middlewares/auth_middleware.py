from functools import wraps
from flask import jsonify, g
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity

def require_auth(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        try:
            verify_jwt_in_request()
            # Attach the user_id to Flask's 'g' context so controllers can access it directly
            g.user_id = get_jwt_identity()
        except Exception as e:
            return jsonify({"error": "Unauthorized or missing token", "details": str(e)}), 401
            
        return fn(*args, **kwargs)
        
    return wrapper
