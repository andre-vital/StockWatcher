from django.shortcuts import render
from django.http import HttpResponse
from .models import Stock
from django.views.decorators.http import require_POST, require_GET
from utils.getStockInfo import getStockInfo
import json

# Create your views here.
@require_POST
def searchStock(request):
    """
    Searchs for a stock using it's ticker and saves basic information if theres no entry
    on the database for the given ticker.

    parameters:
    -ticker: symbol used for lookup on an external API

    output:
    returns current information of the specified stock.
    """

    try:
        stockData = request.POST
        ticker = stockData['ticker']
        data = getStockInfo(ticker)
        stockList = []
        if not Stock.objects.filter(ticker = ticker).exists():
            for key in data['results']:
                stock = Stock(
                    name = data['results'][key]['name'],
                    ticker = key,
                    region = data['results'][key]['region']
                )
                stockList.append(stock)
                
            Stock.objects.bulk_create(stockList)
        
        response = json.dumps(data['results'][ticker])

    except:
        response = json.dumps({'Error': "Unable to find stock"})
            
    return HttpResponse(response, content_type='application/json')

@require_GET
def getStockList(request):
    """
    retrieves all known (that were previously searched on the platform) tickers.

    parameters:
    None

    output:
    a list containing every ticker possible for lookup
    """
    stockList = list(Stock.objects.all().values())
    response = json.dumps(stockList)      

    return HttpResponse(response, content_type='application/json')