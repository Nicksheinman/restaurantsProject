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

def save_restaraunt(data):
    r_name=data['restaraunt_name']
    o_tables=data['tables']['ordinaryTables']
    b_tables=data['tables']['bigTables']
    h_tables=data['tables']['hugeTables']
    try:
        query(f'''CREATE TABLE "{r_name}" (
        "id"	INTEGER,
        "t_type"	TEXT,
        "t_name"	TEXT,
        "t_style"	TEXT,
        PRIMARY KEY("id")
        )''')
        print(o_tables)
    except:
        for o_table in o_tables:
            query(f"INSERT INTO {r_name} (t_type,t_name,t_style) VALUES ('o_table', '{o_table['id']}', '{o_table['style']}')")
        for b_table in b_tables:
            query(f"INSERT INTO {r_name} (t_type,t_name,t_style) VALUES ('b_table', '{b_table['id']}', '{b_table['style']}')")
        for h_table in h_tables:
            query(f"INSERT INTO {r_name} (t_type,t_name,t_style) VALUES ('o_table', '{h_table['id']}', '{h_table['style']}')")    

def load_restaraunt(r_name):
    o_tabless=query(f'SELECT * FROM {r_name} WHERE t_type="o_table"')
    o_tables=[]
    for table in o_tabless:
        new_table={'id': table[2], 'style':table[3]}
        o_tables.append(new_table)
    b_tabless=query(f'SELECT * FROM {r_name} WHERE t_type="b_table"')
    b_tables=[]
    for table in b_tabless:
        new_table={'id': table[2], 'style':table[3]}
        b_tables.append(new_table)
    h_tabless=query(f'SELECT * FROM {r_name} WHERE t_type="h_table"')
    h_tables=[]
    for table in h_tabless:
        new_table={'id': table[2], 'style':table[3]}
        h_tables.append(new_table)
    all_tables={'ordinaryTables':o_tables, 'bigTables':b_tables, 'hugeTables':h_tables}
    print(all_tables)
        
