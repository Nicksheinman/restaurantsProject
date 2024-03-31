from flask import Flask, request, send_file, redirect
import requests
from db import load_tables, save_tables, save_date
import time
import json
app=Flask(__name__)

@app.route('/')
def home():
    return send_file('static/index.html')
    
@app.route('/exist')
def exist():
    return send_file('static/exist.html')

@app.route('/api/services', methods=['GET'])
def services():
    return json.dumps(load_tables())


@app.route('/api/services', methods=['POST', 'GET'])
def order_services():
    if request.method=='POST':
        anwser=save_date(request.form)
        if anwser=='ok':
            return redirect("/")
        else:
            return redirect('/exist')

        