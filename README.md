# StockWatcher
## Demo



## Setup

## Requirements

## Build

## Setup the server
#### 1. Clone this project
```sh
git clone https://github.com/andre-vital/StockWatcher.git
```
#### 2. Enter the project's back-end directory:
```sh
cd StockWatcher/back-end
```
#### 3. Create a virtual environment and activate it 
```sh
python3 -m venv env
source env/bin/activate
```
#### 4. Install the packages listed in the requirements.txt
```sh
pip3 install -r requirements.txt
```
#### 5. Starting the server
```sh
cd StockWatcherApi
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver 0.0.0.0:8000
```
#### 6. Starting up celery worker for scheduled tasks (must be on the your virtual environment and on the same directory as the manage.py).
```sh 
celery -A StockWatcherApi worker -l INFO
```
#### 7. Starting up celery beat (the same thing for the worker).
```sh 
celery -A StockWatcherApi beat -l INFO
```

## Setup the web interface
#### 1. Enter the the front-end directory
```sh
cd StockWatcher/front-end/stockwatcher
```
#### 2. Install the node modules
With npm
```sh
sudo npm install
```
With yarn
```sh
sudo yarn
```
#### 3. Run it 
With npm
```sh
npm start
```
With yarn
```sh
yarn start
```
