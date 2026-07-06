import datetime
from typing import List
from bson import ObjectId

def create_note_doc(title: str, description: str, tags: List[str], workspace_id, user_id, is_completed: bool = False, is_pinned: bool = False, is_trashed: bool = False) -> dict:
    now = datetime.datetime.now()
    return {
        "title": title,
        "description": description,
        "tags": tags,
        "is_completed": is_completed,
        "is_pinned": is_pinned,
        "is_trashed": is_trashed,
        "created_at": now,
        "updated_at": now,
        "workspace_id": ObjectId(workspace_id) if isinstance(workspace_id, str) else workspace_id,
        "created_by": ObjectId(user_id) if isinstance(user_id, str) else user_id,
    }
