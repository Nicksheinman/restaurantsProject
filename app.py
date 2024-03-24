from flask import Flask, request, render_template, send_file
from db import load_tables, save_tables
import json
app=Flask(__name__)

@app.route('/')
def home():
    return send_file('static/index.html')


@app.route('/api/services', methods=['GET'])
def services():
    return json.dumps(load_tables())


@app.route('/api/services', methods=['POST'])
def order_services():
    pass