from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from datetime import timedelta
from src.Config.db_config import connect_db
import os
from dotenv import load_dotenv

# Import blueprints from Routes
from src.Routes.auth_routes import auth_bp
from src.Routes.workspace_routes import workspace_bp
from src.Routes.notes_routes import notes_bp

load_dotenv()

app = Flask(__name__)

CORS(app, supports_credentials=True) # type: ignore

# Configure JWT
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
app.config["JWT_COOKIE_SECURE"] = False  # Set to True in production (HTTPS only)
app.config["JWT_COOKIE_CSRF_PROTECT"] = False # Disabling for simplicity during dev, enable in prod!
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=7)
app.config["JWT_SESSION_COOKIE"] = False

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
