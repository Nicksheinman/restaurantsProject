from flask import Flask, request, send_file, redirect, render_template
import requests
from db import load_tables, save_tables, save_date
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
        if anwser=='ok':
            return home(message=anwser)
        else:
            return home(message=anwser)

        