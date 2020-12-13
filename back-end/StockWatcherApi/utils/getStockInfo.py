import json
import requests

def getStockInfo(ticker):
    apiKeys = ['a6f8438a', '3a7911d9', '376a08aa', '8e4e0e07']
    for apiKey in apiKeys:
        url = f'https://api.hgbrasil.com/finance/stock_price?key={apiKey}&symbol={ticker}'
        responseJson = requests.get(url)
        response = json.loads(responseJson.text)
        if response['results']:
            return response
        
