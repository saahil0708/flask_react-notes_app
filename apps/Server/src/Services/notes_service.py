from src.Config.db_config import get_db
from src.Models.notes_model import create_note_doc
from bson import ObjectId
import datetime

def create_note(data, user_id):
    db = get_db()
    note_doc = create_note_doc(
        title=data.get("title"),
        description=data.get("description", ""),
        tags=data.get("tags", []),
        workspace_id=data.get("workspace_id"),
        user_id=user_id,
        is_completed=data.get("is_completed", False),
        is_pinned=data.get("is_pinned", False)
    )
    
    result = db.notes.insert_one(note_doc)
    
    # Add string ID back for response
    note_doc["id"] = str(result.inserted_id)
    # Remove ObjectIds for JSON serialization
    note_doc.pop("_id", None)
    note_doc["workspace_id"] = str(note_doc["workspace_id"])
    note_doc["created_by"] = str(note_doc["created_by"])
    
    return {"message": "Note created", "note": note_doc}, 201

def get_notes_for_workspace(workspace_id, user_id):
    db = get_db()
    
    query = {"created_by": ObjectId(user_id)}
    if workspace_id:
        query["workspace_id"] = ObjectId(workspace_id)
        
    notes = db.notes.find(query)
    
    result = []
    for n in notes:
        n["id"] = str(n.pop("_id"))
        n["workspace_id"] = str(n["workspace_id"])
        n["created_by"] = str(n["created_by"])
        result.append(n)
        
    return {"notes": result}, 200

def update_note(note_id, data, user_id):
    db = get_db()
    
    # We only allow updating certain fields
    update_data = {"updated_at": datetime.datetime.now()}
    if "title" in data: update_data["title"] = data["title"]
    if "description" in data: update_data["description"] = data["description"]
    if "tags" in data: update_data["tags"] = data["tags"]
    if "is_completed" in data: update_data["is_completed"] = data["is_completed"]
    if "is_pinned" in data: update_data["is_pinned"] = data["is_pinned"]
    if "workspace_id" in data: update_data["workspace_id"] = ObjectId(data["workspace_id"])
        
    result = db.notes.update_one(
        {"_id": ObjectId(note_id), "created_by": ObjectId(user_id)},
        {"$set": update_data}
    )
    
    if result.matched_count == 0:
        return {"error": "Note not found or unauthorized"}, 404
        
    return {"message": "Note updated"}, 200

def delete_notes(note_ids, user_id):
    db = get_db()
    
    object_ids = [ObjectId(nid) for nid in note_ids]
    
    result = db.notes.delete_many({
        "_id": {"$in": object_ids},
        "created_by": ObjectId(user_id)
    })
    
    return {"message": f"{result.deleted_count} notes deleted"}, 200
