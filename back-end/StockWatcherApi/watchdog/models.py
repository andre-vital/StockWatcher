from django.db import models
from stockFinder.models import Stock
from accounts.models import User

# Create your models here.
class MyStock(models.Model):
    """
    """
    stock = models.ForeignKey('Stock', on_delete=models.CASCADE)
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    updateInterval = models.IntegerField()
    lowPrice = models.FloatField()
    highPrice = models.FloatField()

class Values(models.Model):
    """
    """
    myStock = models.ForeignKey('MyStock', on_delete=models.CASCADE)
    marketCap = models.FloatField()
    price = models.FloatField()
    changePercentage = models.FloatField()
    updatedAt = models.DateField()
