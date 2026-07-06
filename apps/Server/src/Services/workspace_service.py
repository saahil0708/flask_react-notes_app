from src.Config.db_config import get_db
from src.Models.workspace_model import create_workspace_doc
from bson import ObjectId

def create_workspace(data, user_id):
    db = get_db()
    workspace_doc = create_workspace_doc(
        name=data.get("name"),
        icon=data.get("icon"),
        user_id=user_id
    )
    result = db.workspace.insert_one(workspace_doc)
    
    return {
        "message": "Workspace created",
        "workspace": {
            "id": str(result.inserted_id),
            "name": workspace_doc["name"],
            "icon": workspace_doc["icon"]
        }
    }, 201

def get_workspaces_for_user(user_id):
    db = get_db()
    workspaces = db.workspace.find({"created_by": ObjectId(user_id)})
    
    result = []
    for w in workspaces:
        result.append({
            "id": str(w["_id"]),
            "name": w["name"],
            "icon": w["icon"]
        })
        
    return {"workspaces": result}, 200

def delete_workspace(workspace_id, user_id):
    db = get_db()
    
    # Check if workspace exists and belongs to user
    workspace = db.workspace.find_one({"_id": ObjectId(workspace_id), "created_by": ObjectId(user_id)})
    if not workspace:
        return {"error": "Workspace not found or unauthorized"}, 404
        
    db.workspace.delete_one({"_id": ObjectId(workspace_id)})
    # Also delete associated notes
    db.notes.delete_many({"workspace_id": ObjectId(workspace_id)})
    
    return {"message": "Workspace deleted"}, 200
