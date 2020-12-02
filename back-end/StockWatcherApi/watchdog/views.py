from django.shortcuts import render
from django.http import HttpResponse
from django.core.serializers.json import DjangoJSONEncoder
from django.core.exceptions import ObjectDoesNotExist
from .models import ControlledStock, Value
from stockFinder.models import Stock
from accounts.models import User
from utils.getStockInfo import getStockInfo
from datetime import datetime, timedelta
import json

# Create your views here.
#TODO: function that deactivates a controlledStock
def addToControlledStock(request):
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
            if ControlledStock.objects.filter(stock__id=stockId, user__id=userId).exists():
                controlledStock = ControlledStock.objects.get(stock__id=stockId, user__id=userId)
                controlledStock.active = True
                controlledStock.save()
            
            else:
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
                controlledStock.updateInterval = stockData['updateInterval']
                controlledStock.buyPrice = stockData['buyPrice']
                controlledStock.sellPrice = stockData['sellPrice']
                controlledStock.save()
                response = json.dumps(controlledStock.id)

            except Exception as e:
                response = json.dumps({'Error': "couldn't retrieve controlled stock"})
                print(e)

        except Exception as e:
            response = json.dumps({'Error': "something went wrong"})
            print(e)
            
    return HttpResponse(response, content_type='application/json')

def getStockValuesByTimeDiff(request):
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

            controlledStock = ControlledStock.objects.get(stock__id=stockId, user__id=userId)
            controlledStockValues = list(Value.objects.filter(controlledStock = controlledStock).values())

            lastControlledStockValue = controlledStockValues[0]
            specifiedControlledStockValuesList = [lastControlledStockValue]

            for controlledStockValue in controlledStockValues:
                timeDiff = controlledStockValue['entryTime'] - lastControlledStockValue['entryTime']

                if timeDiff >= timedelta(minutes=controlledStock.updateInterval):
                    lastControlledStockValue = controlledStockValue
                    specifiedControlledStockValuesList.append(controlledStockValue)

            response = json.dumps(specifiedControlledStockValuesList,  cls=DjangoJSONEncoder)

        except ObjectDoesNotExist as e:
            print(e)
            response = json.dumps({'Error': "couldn't retrieve"})

        except Exception as e:
            print(e)
            response = json.dumps({'Error': "couldn't retrieve controlled stock"})
       
    return HttpResponse(response, content_type='application/json')