from __future__ import absolute_import
import os
from celery import Celery
from django.conf import settings

# set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'StockWatcherApi.settings')
app = Celery('StockWatcherApi')

# Using a string here means the worker will not have to
# pickle the object when using Windows.
app.config_from_object('django.conf:settings')


app.conf.beat_schedule = {
    'retrieveStocksPeriodically': {
        'task': 'watchdog.tasks.retrieveStocksPeriodically',
        'schedule': 60.0,
    },
}

app.autodiscover_tasks()