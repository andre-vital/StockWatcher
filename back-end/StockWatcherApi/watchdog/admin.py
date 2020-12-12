from django.contrib import admin
from .models import ControlledStock, StockData

admin.site.register(ControlledStock)
admin.site.register(StockData)
# Register your models here.
