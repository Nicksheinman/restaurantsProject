from app import services
from db import load_tables,query, save_date
import json
import requests
TEST_URL='http://127.0.0.1:5000/api/services'

def test_services():
    table=dict(load_tables())['tables']
    api_tables=dict(json.loads(requests.get(TEST_URL).text))['tables']
    assert len(api_tables)==len(table)


def test_save_data():
    query('DELETE FROM order_status WHERE date="2024-03-14" AND table_id=1')
    first_save=save_date({'date':'2024-03-14', 'id':'1'})
    second_save=save_date({'date':'2024-03-14', 'id':'1'})
    assert first_save=='ok' and second_save=='exist'