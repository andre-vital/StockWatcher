from __future__ import absolute_import, unicode_literals
from django.shortcuts import render
from django.http import HttpResponse
from .models import ControlledStock, Value
from stockFinder.models import Stock
from accounts.models import User
from utils.getStockInfo import getStockInfo
import json

from celery import shared_task

@shared_task
def retrieveStocksPeriodically():
    controlledStocks = ControlledStock.objects.all()

    for controlledStock in controlledStocks:
        ticker = controlledStock.stock.ticker
        data = getStockInfo(ticker)
        marketData = data['results'][ticker]
        stockValues = Value(
            controlledStock = controlledStock,
            marketCap = marketData['market_cap'],
            price = marketData['price'],
            changePercentage = marketData['change_percent'],
            updatedAt = marketData['updated_at']
        )
        stockValues.save()