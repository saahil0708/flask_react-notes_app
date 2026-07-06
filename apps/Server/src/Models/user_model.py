import datetime

def create_user_doc(user_name: str, email: str, password: str) -> dict:
    now = datetime.datetime.now()
    return {
        "user_name": user_name,
        "email": email,
        "password": password,
        "date_created": now,
        "last_login": now
    }