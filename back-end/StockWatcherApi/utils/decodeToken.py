import jwt
from StockWatcherApi.local_settings import LOCAL_SETTINGS

TOKEN_SECRET = LOCAL_SETTINGS['TOKEN_SECRET']
TOKEN_ALGORITHM = LOCAL_SETTINGS['TOKEN_ALGORITHM']

def decodeToken(token):
    try:
        payload = jwt.decode(token, TOKEN_SECRET, TOKEN_ALGORITHM)
        return payload

    except:
        return None

def encodeToken(payload):
    try:
        token = jwt.encode(payload, TOKEN_SECRET, TOKEN_ALGORITHM).decode('utf-8')
        return token

    except:
        return None


def recoverUserIdFromToken(token):
    payload = decodeToken(token)
    if payload is None:
        return None

    return payload['userId']