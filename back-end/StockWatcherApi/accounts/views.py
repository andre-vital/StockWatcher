from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.http import require_POST
from .models import User
import json
import hashlib
from utils.decodeToken import encodeToken
from utils.passwordValidator import passwordValidator
# Create your views here.

@require_POST
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
    signupData = request.POST
    isPasswordValid = passwordValidator(signupData['password'])
    isUsernameInUse = User.objects.filter(username = signupData['username']).exists()
    isEmailInUse = User.objects.filter(email = signupData['email']).exists()
    if isEmailInUse:
        response = json.dumps({'error': 'Email already in use'})

    elif isUsernameInUse:
        response = json.dumps({'error': 'Username already in use'})
    
    elif not isPasswordValid:
        response = json.dumps({'error': 'Password not valid'})

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
  
    return HttpResponse(response, content_type='application/json')

@require_POST
def login(request):
    """
    Logs into the platform.

    parameters:
    -username: used for login.
    -password: used for login.

    output:
    logs into the platform and creates a token for validation.
    """
    loginData = request.POST
    usernameGuess = loginData['username']
    passwordGuess = loginData['password']
    try:
        user = User.objects.get(username = usernameGuess)
        hashedPasswordGuess = hashlib.sha256(passwordGuess.encode('utf-8')).hexdigest()
        if hashedPasswordGuess != user.password:
            response = json.dumps({"token":'','error': 'Wrong password'})
            return HttpResponse(response, content_type='application/json')

        payload = {
            'userId': user.id,
        }
        token = encodeToken(payload)
        response = json.dumps({"token":token, "success":'Token made'})

    except:
        response = json.dumps({"token":'','error': "Unable to retrieve token"})

    return HttpResponse(response, content_type='application/json')