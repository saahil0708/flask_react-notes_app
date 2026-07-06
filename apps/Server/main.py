from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from src.Config.db_config import connect_db
import os
from dotenv import load_dotenv

from src.Controllers.auth_controller import auth_bp
from src.Controllers.workspace_controller import workspace_bp
from src.Controllers.notes_controller import notes_bp

load_dotenv()

app = Flask(__name__)

CORS(app, supports_credentials=True) # type: ignore

# Configure JWT
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
app.config["JWT_COOKIE_SECURE"] = False  # Set to True in production (HTTPS only)
app.config["JWT_COOKIE_CSRF_PROTECT"] = False # Disabling for simplicity during dev, enable in prod!

jwt = JWTManager(app)

# Connect to database
connect_db()

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(workspace_bp, url_prefix='/api/workspaces')
app.register_blueprint(notes_bp, url_prefix='/api/notes')

@app.route("/")
def hello_world():
    return jsonify({
        "message": "Hello World",
        "status": "ok"
    }), 200

if __name__ == "__main__":
    app.run(debug=True, port=8000)
