from datetime import datetime, timedelta

def filterByTimeInterval(dataToBeFiltered, stock):
    lastData = dataToBeFiltered[0]
    result = [lastData]
    for data in dataToBeFiltered:
        timeDiff = data['updatedAt'] - lastData['updatedAt']
        if timeDiff >= timedelta(minutes=stock.updateInterval):
            lastData = data
            result.append(data)
    
    return result