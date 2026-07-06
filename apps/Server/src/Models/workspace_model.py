from bson import ObjectId

def create_workspace_doc(name: str, icon: str, user_id) -> dict:
    return {
        "name": name,
        "icon": icon,
        "created_by": ObjectId(user_id) if isinstance(user_id, str) else user_id
    }
