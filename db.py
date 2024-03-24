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
        
def load_tables():
    load=list(query('SELECT name FROM r_table'))
    data=[]
    for d in load:
        data.append(d[0])
    new_dict={'tables':data}
    return (new_dict)
