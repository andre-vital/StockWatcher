import json
import requests

def getStockInfo(ticker):
    apiKey = 'c350a661'
    url = f'https://api.hgbrasil.com/finance/stock_price?key={apiKey}&symbol={ticker}'
    response = requests.get(url)
    return json.loads(response.text)