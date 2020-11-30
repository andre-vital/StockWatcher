from django.shortcuts import render
from django.http import HttpResponse
from .models import MyStock, Values
from stockFinder.models import Stock
from accounts.models import User
from utils.getStockInfo import getStockInfo
import json

# Create your views here.

def addToMyStock(request):
    """
    Adds a specified stock to an users Stock list.

    parameters:
    -stockId: to link the MyStock table with the Stock table
    -userId: to link the MyStock table with the User table

    output:
    """

    if request.method == 'POST':
        try:
            stockData = request.POST
            stockId = stockData['stockId']
            userId = stockData['userId']

            stock = Stock.objects.filter(id = stockId)
            user = User.objects.filter(id = userId)
            myStock = MyStock(
                stock = stock,
                user = user
            )
            myStock.save()

            key = '6f027336'
            data = getStockInfo(stock.ticker, key)
            marketData = data['results'][stock.ticker]
            stockValues = Values(
                myStock = myStock,
                marketCap = marketData['market_cap'],
                price = marketData['price'],
                changePercentage = marketData['change_percent'],
                updatedAt = marketData['updated_at']
            )
            stockValues.save()

        except Exception as e:
            response = json.dumps({'Error': "something went wrong"})
            print(e)
            

    return HttpResponse(response, content_type='application/json')

def configureStock(request):
    """
    Adds a specified stock to an users Stock list.

    parameters:
    -stockId: to link the MyStock table with the Stock table
    -userId: to link the MyStock table with the User table

    output:
    """

    if request.method == 'POST':
        try:
            stockData = request.POST
            stockId = stockData['stockId']
            userId = stockData['userId']

            stock = Stock.objects.filter(id = stockId)
            user = User.objects.filter(id = userId)
            myStock = MyStock(
                stock = stock,
                user = user
            )
            myStock.save()

            key = '6f027336'
            data = getStockInfo(stock.ticker, key)
            marketData = data['results'][stock.ticker]
            stockValues = Values(
                myStock = myStock,
                marketCap = marketData['market_cap'],
                price = marketData['price'],
                changePercentage = marketData['change_percent'],
                updatedAt = marketData['updated_at']
            )
            stockValues.save()

        except Exception as e:
            response = json.dumps({'Error': "something went wrong"})
            print(e)
            

    return HttpResponse(response, content_type='application/json')