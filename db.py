import sqlite3
data1=[{'tables':'table1,table2,table3,table4,table5,table6,table7,table8,table9,table10'}]


def query(sql):
    with sqlite3.connect('restaurant.db') as conn:
        cur = conn.cursor()
        return cur.execute(sql).fetchall()
    
def save_tables(data):
    new_data=data[0]['tables'].split(",")
    for d in new_data:
        query(f'INSERT or IGNORE INTO r_table (name) VALUES ("{d}")')

def load_tables():
    load=list(query('SELECT name FROM r_table'))
    data=''
    for d in load:
        data+=d[0]
        data+=','
    new_dict={'tables':data[:-1]}
    return new_dict

load_tables()