from django.urls import path
from . import views

urlpatterns = [
    path('add', views.addToControlledStock),
    path('configure', views.configureStock),
    path('values', views.getStockValuesByTimeDiff),
]