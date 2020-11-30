import json
import requests

def getStockInfo(ticker, key):
    url = f'https://api.hgbrasil.com/finance/stock_price?key={key}&symbol={ticker}'
    response = requests.get(url)
    return json.loads(response.text)