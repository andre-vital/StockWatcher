import json
import requests

def getStockInfo(ticker):
    apiKey = '8e4e0e07'
    url = f'https://api.hgbrasil.com/finance/stock_price?key={apiKey}&symbol={ticker}'
    response = requests.get(url)
    return json.loads(response.text)