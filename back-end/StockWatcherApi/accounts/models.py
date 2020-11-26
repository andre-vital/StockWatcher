from django.db import models

# Create your models here.

class User(models.Model):
    """
    Model which contains every User information.
    """
    username = models.CharField(max_length=12)
    password = models.CharField(max_length=12)
    name = models.CharField(max_length=20)
    email = models.EmailField()
    creationDate = models.DateTimeField(auto_now_add=True)
    active = models.BooleanField(default=True)
    avatar = models.ImageField(upload_to = 'assets/avatar/images', blank=True, null=True)
