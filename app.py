from flask import Flask, request, render_template
from db import load_tables, save_tables
import json
app=Flask(__name__)

@app.route('/')
def home():
    pass

@app.route('/order')
def order():
    return render_template("order.html")

@app.route('/api/services', methods=['GET'])
def services():
    return json.dumps(load_tables())


@app.route('/api/services', methods=['POST'])
def order_services():
    pass