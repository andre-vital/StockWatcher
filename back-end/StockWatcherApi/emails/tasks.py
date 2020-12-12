from __future__ import absolute_import, unicode_literals
from django.conf import settings
from django.core.mail import send_mail
from watchdog.models import ControlledStock, StockData
from .models import EmailLog
from datetime import datetime, timedelta
from celery import shared_task

def composeAndSendEmail(controlledStock, stockData, action):
    try:
        translator = "comprar" if action == 'buy' else "vender"
        time = datetime.strftime(stockData.updatedAt, "%H:%M:%S")
        subject = f"StockWatcher: ta na hora de {action}"
        message = f"""
        O preço da {controlledStock.stock.name} atingiu o valor de {stockData.price}.
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

def checkIfEmailWasAlreadySent(priceChecker, action, stock):
    
    try:
        emailLog = EmailLog.objects.filter(controlledStock=stock, sent=True).latest('id')
    except:
        return False
    
    if priceChecker == emailLog.priceChecker and action == emailLog.action:
        return True

    if not datetime.now() > emailLog.dispatchTime + timedelta(days = 1):
        return True
    
    return False

def determineAction(stock, price):
    buyPrice = stock.buyPrice
    sellPrice = stock.sellPrice
    if sellPrice < price:
        return 'sell'
    
    if buyPrice > price:
        return 'buy'
    
    return None

@shared_task
def sendEmailFeedback():
    controlledStocks = ControlledStock.objects.filter(active=True)
    for stock in controlledStocks: 
        stockData = StockData.objects.filter(controlledStock=stock).latest('id')
        price = stockData.price
        action = determineAction(stock, price)
        if action is None:
            continue

        elif action is 'sell':
            priceChecker = stock.sellPrice

        else:
            priceChecker = stock.buyPrice

        wasSent = checkIfEmailWasAlreadySent(priceChecker, action, stock)
        if wasSent:
            continue
        
        sent = composeAndSendEmail(stock, stockData, action) 
        emailLog = EmailLog(
            controlledStock = stock,
            sent = sent,
            action = action,
            priceChecker = priceChecker
        )
        emailLog.save()