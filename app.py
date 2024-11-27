from flask import Flask, request, send_file, redirect, render_template
import requests
from db import load_tables, save_tables, save_date, save_restaraunt, load_restaraunt, save_image
import time
import json
app=Flask(__name__)

@app.route('/')
def home(message=''):
    return render_template('index.html', message=message)
    
@app.route('/bilder')
def table_bilder():
    return render_template('table_bilder.html')

@app.route('/api/services', methods=['GET'])
def services():
    return json.dumps(load_tables())


@app.route('/api/services', methods=['POST', 'GET'])
def order_services():
    if request.method=='POST':
        anwser=save_date(request.form)
        return home(message=anwser)

rest_name=""
@app.route('/api/saveTable', methods=['POST', 'GET'])
def table_save():
    if request.method=="GET":
        r_name='d'
        a=request.json
        print(a)
        return json.dumps(load_restaraunt(r_name=r_name))
    if request.method=='POST':
       try:
        global rest_name
        save_restaraunt(request.json)
        rest_name=request.json["restaraunt_name"]
        return table_bilder()
       except:
        save_image(image=request.files, r_name=rest_name)   
        return table_bilder()
