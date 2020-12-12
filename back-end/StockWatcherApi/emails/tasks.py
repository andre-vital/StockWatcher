from __future__ import absolute_import, unicode_literals
from django.conf import settings
from django.core.mail import send_mail
from watchdog.models import ControlledStock, Value
from .models import EmailLog
from datetime import datetime, timedelta
import json
from celery import shared_task

def composeAndSendEmail(controlledStock, value):
    try:
        action = "comprar" if controlledStock.buyPrice > value.price else "vender"
        time = datetime.strftime(value.updatedAt, "%H:%M:%S")
        subject = f"StockWatcher: ta na hora de {action}"
        message = f"""
        O preço da {controlledStock.stock.name} atingiu o valor de {value.price}.
        Recomendamos {action} as ações da {controlledStock.stock.name}

        A última atualização feita foi às {time}
    
        """
        send_mail(
            subject,
            message,
            settings.EMAIL_HOST_USER,
            [controlledStock.user.email],
            fail_silently=False,
        )
        return True

    except:
        return False

def checkIfEmailWasAlreadySent(stock, price):
    buy = stock.buyPrice
    sell = stock.sellPrice
    priceChecker, action = (buy, "buy") if buy > price else (sell, "sell")
    try:
        emailLog = EmailLog.objects.filter(controlledStock=stock).latest('id')
    except:
        return False, priceChecker, action

    if not emailLog.sent:
        return False, priceChecker, action

    if not datetime.now() > emailLog.dispatchTime + timedelta(days = 1):
        return True, priceChecker, action
    
    return False, priceChecker, action


@shared_task
def sendEmailFeedback():
    controlledStocks = ControlledStock.objects.all()
    for stock in controlledStocks:
        if not stock.active:
            continue

        buyPrice = stock.buyPrice
        sellPrice = stock.sellPrice
        value = Value.objects.filter(controlledStock=stock).latest('id')
        price = value.price
        if not buyPrice > price and not sellPrice < price:
            continue

        wasSent, priceChecker, action = checkIfEmailWasAlreadySent(stock, price)
        if wasSent:
            continue
        
        sent = composeAndSendEmail(stock, value) 
        emailLog = EmailLog(
            controlledStock = stock,
            sent = sent,
            action = action,
            priceChecker = priceChecker
        )
        emailLog.save()