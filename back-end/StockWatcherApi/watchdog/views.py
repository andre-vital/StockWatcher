from django.shortcuts import render
from django.http import HttpResponse
from django.core.serializers.json import DjangoJSONEncoder
from django.core.exceptions import ObjectDoesNotExist
from django.views.decorators.http import require_POST
from .models import ControlledStock, StockData
from stockFinder.models import Stock
from accounts.models import User
from utils.getStockInfo import getStockInfo
from utils.filterByTimeInterval import filterByTimeInterval
from utils.decodeToken import recoverUserIdFromToken
from datetime import datetime, timedelta
import json

# Create your views here.
@require_POST
def addToControlledStock(request):
    """
    Adds a specified stock to an users Stock list.

    parameters:
    -ticker: to link the ControlledStock table with the Stock table
    -userId: to link the ControlledStock table with the User table

    output:
    """
    try:
        stockData = request.POST
        ticker = stockData['ticker']
        token = stockData['token']
        userId = recoverUserIdFromToken(token)
        if userId is None:
            response = json.dumps({'Error': "User not found"})
            return HttpResponse(response, content_type='application/json')

        if ControlledStock.objects.filter(stock__ticker=ticker, user_id=userId).exists():
            controlledStock = ControlledStock.objects.get(stock__ticker=ticker, user_id=userId)
            controlledStock.active = True
            controlledStock.save()
        
        else:
            stock = Stock.objects.get(ticker=ticker)
            controlledStock = ControlledStock(
                stock = stock,
                user_id = userId
            )
            controlledStock.save()
            
            data = getStockInfo(stock.ticker)
            marketData = data['results'][stock.ticker]
            stockData = StockData(
                controlledStock = controlledStock,
                marketCap = marketData['market_cap'],
                price = marketData['price'],
                changePercentage = marketData['change_percent'],
                updatedAt = datetime.strptime(marketData['updated_at'], '%Y-%m-%d %H:%M:%S')
            )
            stockData.save()

        response = json.dumps({'success': "added to controlled stock"})

    except:
        response = json.dumps({'Error': "something went wrong"})
            
    return HttpResponse(response, content_type='application/json')

@require_POST
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
    try:
        stockData = request.POST
        stockId = stockData['stockId']
        token = stockData['token']
        userId = recoverUserIdFromToken(token)
        if userId is None:
            response = json.dumps({'Error': "User not found"})
            return HttpResponse(response, content_type='application/json')

        controlledStock = ControlledStock.objects.get(stock_id=stockId, user_id=userId)
        controlledStock.updateInterval = stockData['updateInterval']
        controlledStock.buyPrice = stockData['buyPrice']
        controlledStock.sellPrice = stockData['sellPrice']
        controlledStock.save()
        response = json.dumps(controlledStock.id)

    except ObjectDoesNotExist:
        response = json.dumps({'Error': "Couldn't retrieve object"})

    except:
        response = json.dumps({'Error': "something went wrong"})
            
    return HttpResponse(response, content_type='application/json')

@require_POST
def getAllControlledStock(request):
    """
    Retrieves every controlled stock from database.

    parameters:
    -userId: to specify from which user it should fetch the controlledStocks.

    output:
    An array of dicts containing every entry saved of every controlled stock 
    of a specific user.
    """
    try:
        stockData = request.POST
        token = stockData['token']
        userId = recoverUserIdFromToken(token)
        if userId is None:
            response = json.dumps({'Error': "User not found"})
            return HttpResponse(response, content_type='application/json')

        controlledStocks = ControlledStock.objects.filter(user_id=userId)
        myStocks = []

        for controlledStock in controlledStocks:
            controlledStockValues = list(StockData.objects.filter(controlledStock = controlledStock).values())

            stock = {}
            stock['stockId'] = controlledStock.stock.id
            stock['name'] = controlledStock.stock.name
            stock['buyPrice'] = controlledStock.buyPrice
            stock['sellPrice'] = controlledStock.sellPrice
            stock['updateInterval'] = controlledStock.updateInterval
            stock['values'] = filterByTimeInterval(controlledStockValues, controlledStock)
            stock['values'].reverse()
            
            myStocks.append(stock)
        
        response = json.dumps(myStocks, cls=DjangoJSONEncoder)

    except:
        response = json.dumps({'Error': "something went wrong"})
            
    return HttpResponse(response, content_type='application/json')

@require_POST
def removeFromControlledStock():
    """
    Removes a specific stock from users controlled stock list.

    parameters:
    -ticker: to link the ControlledStock table with the Stock table
    -userId: to link the ControlledStock table with the User table

    output:
    No output
    """
    try:
        stockData = request.POST
        ticker = stockData['ticker']
        token = stockData['token']
        userId = recoverUserIdFromToken(token)
        if userId is None:
            response = json.dumps({'Error': "User not found"})
            return HttpResponse(response, content_type='application/json')

        controlledStock = ControlledStock.objects.get(stock__ticker=ticker, user_id=userId)
        controlledStock.active = False
        controlledStock.save()
        response = json.dumps({'Success': "User not found"})

    except ObjectDoesNotExist:
        response = json.dumps({'Error': "Couldn't retrieve object"})

    except:
        response = json.dumps({'Error': "Something went wrong"})

    return HttpResponse(response, content_type='application/json')
