from django.urls import path
from . import views

urlpatterns = [
    path('add', views.addToControlledStock),
    path('remove', views.removeFromControlledStock),
    path('configure', views.configureStock),
    path('retrieve/all', views.getAllControlledStock)
]