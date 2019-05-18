from flask import Flask,Response
import json
import random

app = Flask(__name__)

@app.route('/fetch',methods=['GET'])
def fetch():
    records = []
    val = random.randrange(1,4)
    print (val)
    devices = ['humidity','waterleak']
    if val <= 1:
        for i in range(100):
            
            deviceName = devices[random.randint(0,1)]
            
            if deviceName == 'humidity':
                humidity = random.randrange(1,50)
                records.append({"deviceId":"humidity","temperature":random.random()*30,"humidity":humidity,"pointInfo":"This is a critical message."}) 
            elif deviceName == 'waterleak':
                records.append({"deviceId":deviceName,"leak":"False","pointInfo":"This is a critical message."}) 
            
            
    elif val <= 2:
        for i in range(100):
            deviceName = devices[random.randint(0,1)]
            if deviceName == 'humidity':
                humidity = random.randrange(1,80)
                records.append({"deviceId":"humidity","temperature":random.random()*30,"humidity":humidity,"pointInfo":"This is a critical message."}) 
            elif deviceName == 'waterleak':
                records.append({"deviceId":deviceName,"leak":"False","pointInfo":"This is a critical message."}) 
    else:
        for i in range(100):
            deviceName = devices[random.randint(0,1)]
            if deviceName == 'humidity':
                records.append({"deviceId":"humidity","temperature":random.random()*30,"humidity":random.random()*100,"pointInfo":"This is a critical message."}) 
            elif deviceName == 'waterleak':
                records.append({"deviceId":deviceName,"leak":str(bool(random.randint(0,1))),"pointInfo":"This is a critical message."}) 
        

    resp = Response(json.dumps(records))
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp