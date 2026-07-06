from flask import Flask, jsonify
from src.Config.db_config import connect_db

app = Flask(__name__)
connect_db()

@app.route("/")
def hello_world():
    return jsonify({
        "message": "Hello World",
        "status": "ok"
    }), 200

if __name__ == "__main__":
    app.run(debug=True, port=8000)

