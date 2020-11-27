from django.shortcuts import render
from django.http import HttpResponse
from .models import Stock
import json
import requests

# Create your views here.

def searchStock(request):
    """
    Searchs for a stock using it's ticker.

    parameters:
    -ticker: symbol used for lookup on an external API

    output:
    returns current information of the specified stock.
    """

    if request.method == 'POST':
        try:
            stockData = request.POST
            ticker = stockData['ticker']
            key = '6f027336'
            url = f'https://api.hgbrasil.com/finance/stock_price?key={key}&symbol={ticker}'
            externalResponse = requests.get(url)


        except Exception as e:
            externalResponse = json.dumps({'Error': "something went wrong"})
            print(e)
            

    return HttpResponse(externalResponse, content_type='application/json')

def getStockList(request):
    """
    retrieves all known (that were previously searched on the platform) tickers.

    parameters:
    None

    output:
    a list containing every ticker possible for lookup
    """

    if request.method == 'GET':
        try:
            stockList = list(Stock.objects.all().values())
            response = json.dumps(stockList, cls=DjangoJSONEncoder)

        except Exception as e:
            print(e)
            response = json.dumps({'Error': "unable to retrieve stock list"})

    else:
        response = json.dumps({'Error': 'must be a GET request'})        

    return HttpResponse(response, content_type='application/json')