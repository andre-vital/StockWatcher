from django.db import models
from watchdog.models import ControlledStock
from accounts.models import User

# Create your models here.
class EmailLog(models.Model):
    """
    """
    controlledStock = models.ForeignKey(ControlledStock, on_delete=models.CASCADE)
    sent = models.BooleanField(default=False)
    dispatchTime = models.DateTimeField(auto_now_add=True)
    action = models.CharField(max_length=10)
    priceChecker = models.FloatField(null=True, blank=True, default=None)


