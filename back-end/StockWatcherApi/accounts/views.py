from django.shortcuts import render
from django.http import HttpResponse
from .models import User
import json
import hashlib
from utils.decodeToken import encodeToken
# Create your views here.
def signup(request):
    """
    Creates an user.

    parameters:
    -username: used for login.
    -password: used for login.
    -email: used to receive changes from watchdog.
    -name: will be displayed on some parts of the app and also for the emails.

    output:
    A message regarding the result of the account creation
    """

    if request.method != 'POST':
        res = json.dumps({'error': 'Request MUST be a POST instead of ' + request.method})
        return HttpResponse(res, content_type='application/json')

    try:
        signupData = request.POST
        usernameInUse = User.objects.filter(username = signupData['username']).exists()
        emailInUse = User.objects.filter(email = signupData['email']).exists()
        if emailInUse:
            response = json.dumps({'error': 'Email already in use'})

        elif usernameInUse:
            response = json.dumps({'error': 'Username already in use'})

        else:
            hashedPassword = hashlib.sha256(signupData['password'].encode('utf-8')).hexdigest()

            user = User(
                username = signupData['username'],
                name = signupData['name'],
                password = hashedPassword,
                email = signupData['email'],
            )

            user.save()

            response = json.dumps({'message': 'Created User'})

    except Exception as e:
        print(e)
        response = json.dumps({'error': 'Could not create User'})
            

    return HttpResponse(response, content_type='application/json')
 
def login(request):
    """
    Logs into the platform.

    parameters:
    -username: used for login.
    -password: used for login.

    output:
    logs into the platform and creates a token for validation.
    """
    if request.method != 'POST':
        res = json.dumps({'error': 'Request MUST be a POST instead of ' + request.method})
        return HttpResponse(res, content_type='application/json')

    loginData = request.POST
    usernameGuess = loginData['username']
    passwordGuess = loginData['password']
    try:
        user = User.objects.get(username = usernameGuess)
        hashedPasswordGuess = hashlib.sha256(passwordGuess.encode('utf-8')).hexdigest()
        if hashedPasswordGuess != user.password:
            res = json.dumps({"token":'','success': False})
            return HttpResponse(res, content_type='application/json')

        payload = {
            'userId': user.id,
        }
        print(payload)
        token = encodeToken(payload)
        print(token)
        res = json.dumps({"token":token, "success":True})

    except Exception as e:
        res = json.dumps({"token":'','success': False})
        print(e)
        return HttpResponse(res, content_type='application/json')


        
    

    return HttpResponse(res, content_type='application/json')