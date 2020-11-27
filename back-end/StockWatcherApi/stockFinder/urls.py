from django.urls import path
from . import views

urlpatterns = [
    path('list', views.getStockList),
    path('lookup', views.searchStock)
]