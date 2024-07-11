import sqlite3
import json
data1=[{'tables':'table1,table2,table3,table4,table5,table6,table7,table8,table9,table10'}]

def query(sql):
    with sqlite3.connect('restaurant.db') as conn:
        cur = conn.cursor()
        return cur.execute(sql).fetchall()
    
def save_tables(data):
    new_data=data[0]['tables'].split(",")
    new_str=''
    for d in new_data:
        new_str+=f"('{d}'),"
    query(f'INSERT or IGNORE INTO r_table (name) VALUES {new_str[:-1]}')


def save_date(data):
        new_data=dict(data)
        date=new_data['date']
        if date=='':
            return 'exist'
        id=new_data['id']
        test_data=query(f"SELECT table_id, date FROM order_status WHERE date='{date}' AND table_id={id}")
        if test_data==[]:
            query(f"INSERT INTO order_status (table_id,date) VALUES ({id}, '{date}')")
            return 'successfully saved'
        else:
            return 'sorry but the table is already ordered'

def load_tables():
    load=list(query('SELECT name FROM r_table'))
    data=[]
    for d in load:
        data.append(d[0])
    new_dict={'tables':data}
    return(new_dict)
