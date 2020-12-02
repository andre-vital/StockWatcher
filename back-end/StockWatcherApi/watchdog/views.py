from django.shortcuts import render
from django.http import HttpResponse
from .models import ControlledStock, Value
from stockFinder.models import Stock
from accounts.models import User
from utils.getStockInfo import getStockInfo
from datetime import datetime
import json

# Create your views here.

def addToMyStock(request):
    """
    Adds a specified stock to an users Stock list.

    parameters:
    -stockId: to link the ControlledStock table with the Stock table
    -userId: to link the ControlledStock table with the User table

    output:
    """

    if request.method == 'POST':
        try:
            stockData = request.POST
            stockId = stockData['stockId']
            userId = stockData['userId']

            controlledStock = ControlledStock(
                stock__id = stockId,
                user__id = userId
            )
            controlledStock.save()
            
            data = getStockInfo(stock.ticker)
            marketData = data['results'][stock.ticker]
            stockValues = Value(
                controlledStock = controlledStock,
                marketCap = marketData['market_cap'],
                price = marketData['price'],
                changePercentage = marketData['change_percent'],
                updatedAt = datetime.strptime(marketData['updated_at'], '%Y-%m-%d %H:%M:%S')
            )
            stockValues.save()
            response = json.dumps(stockValues.id)

        except Exception as e:
            response = json.dumps({'Error': "something went wrong"})
            print(e)
            
    return HttpResponse(response, content_type='application/json')

def configureStock(request):
    """
    Sets buyPrice, sellPrice and the updateInterval to a specific controlled stock.

    parameters:
    -stockId: to link the ControlledStock table with the Stock table
    -userId: to link the ControlledStock table with the User table
    -buyPrice: the desired price to buy.
    -sellPrice: the desired price to sell.
    -updateInterval: desired time interval to retrieve more information regarding
    a stock.

    output:
    No output.
    """
    if request.method == 'POST':
        try:
            stockData = request.POST
            stockId = stockData['stockId']
            userId = stockData['userId']
            try:
                controlledStock = ControlledStock.objects.get(stock__id=stockId, user__id=userId)
                controlledStock(
                    updateInterval = stockData['updateInterval'],
                    buyPrice = stockData['buyprice'],
                    sellPrice = stockData['sellPrice']
                )
                controlledStock.save()
                response = json.dumps(controlledStock.id)

            except Exception as e:
                response = json.dumps({'Error': "something went wrong"})
                print(e)

        except Exception as e:
            response = json.dumps({'Error': "something went wrong"})
            print(e)
            
    return HttpResponse(response, content_type='application/json')