from django.db import models
from stockFinder.models import Stock
from accounts.models import User

# Create your models here.
class ControlledStock(models.Model):
    """
    """
    stock = models.ForeignKey(Stock, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    updateInterval = models.IntegerField(default = 5)
    buyPrice = models.FloatField(default = None, null=True, blank=True)
    sellPrice = models.FloatField(default = None, null=True, blank=True)
    active = models.BooleanField(default = True)

class StockData(models.Model):
    """
    """
    controlledStock = models.ForeignKey('ControlledStock', on_delete=models.CASCADE)
    marketCap = models.FloatField()
    price = models.FloatField()
    changePercentage = models.FloatField()
    updatedAt = models.DateTimeField()
    entryTime = models.DateTimeField(auto_now_add=True)
