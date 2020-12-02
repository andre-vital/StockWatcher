from django.db import models
from stockFinder.models import Stock
from accounts.models import User

# Create your models here.
class ControlledStock(models.Model):
    """
    """
    stock = models.ForeignKey(Stock, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    updateInterval = models.IntegerField(default = 0)
    lowPrice = models.FloatField(default = 0)
    highPrice = models.FloatField(default = 0)

class Value(models.Model):
    """
    """
    controlledStock = models.ForeignKey('ControlledStock', on_delete=models.CASCADE)
    marketCap = models.FloatField()
    price = models.FloatField()
    changePercentage = models.FloatField()
    updatedAt = models.DateTimeField()
    entryTime = models.DateTimeField(auto_now_add=True)
