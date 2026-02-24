import sqlite3
from pathlib import Path

def connectDB():
    DB_PATH = Path(__file__).resolve().parent / "stock.db"
    return sqlite3.connect(DB_PATH)
    
def initializeDB():
    with connectDB() as database:
        database.execute("""
        CREATE TABLE IF NOT EXISTS products (
            site TEXT NOT NULL,
            product_id INTEGER NOT NULL,
            name TEXT,
            url TEXT,
            price DOUBLE,
            amount INTEGER,
            PRIMARY KEY (site, product_id)
        ) 
        """)

def insertData(site, product_id, name, url, price, amount):
    with connectDB() as database:
        
        oldStock = 0
        
        cursor = database.execute("""
        SELECT amount FROM products WHERE site = ? AND product_id = ?
        """, (site, product_id))
        
        previousStock = cursor.fetchone()
        
        if previousStock is not None:
            oldStock = previousStock[0]
        else:
            oldStock = 0
    
        database.execute("""
        INSERT INTO products VALUES (?, ?, ?, ?, ?, ?)
        ON CONFLICT(site, product_id) DO UPDATE SET
            name = excluded.name,
            price = excluded.price,
            amount = excluded.amount   
        RETURNING products.amount = 0 AND amount > 0 AS restocked;
        """, (site, product_id, name, url, price, amount))
        
        return oldStock == 0 and int(amount) > oldStock

def getSpecificItemData(name):
    with connectDB() as database:
        cursor = database.execute("""
        SELECT site, name, url, price, amount FROM products WHERE name = ?
        """, (name, ))
        
        results = cursor.fetchall()
        
        if results is not None:
            return results[0]
        else:
            return None

initializeDB()

#rint(insertData('webhallen', '393804', 'Pokemon ME2.5 Ascended Heroes Enhanced Booster 2-pack', 'https://www.webhallen.com/se/category/4661-Pokmon?page=1', '199.0', '0'))
