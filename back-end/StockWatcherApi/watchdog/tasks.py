from __future__ import absolute_import, unicode_literals
from .models import ControlledStock, StockData
from utils.getStockInfo import getStockInfo
from celery import shared_task

@shared_task
def retrieveStocksPeriodically():
    controlledStocks = ControlledStock.objects.filter(active=True)
    stockDataList = []
    for controlledStock in controlledStocks:
        ticker = controlledStock.stock.ticker
        data = getStockInfo(ticker)
        marketData = data['results'][ticker]

        stockData = StockData(
            controlledStock = controlledStock,
            marketCap = marketData['market_cap'],
            price = marketData['price'],
            changePercentage = marketData['change_percent'],
            updatedAt = marketData['updated_at']
        )
        stockDataList.append(stockData)

    StockData.objects.bulk_create(stockDataList)