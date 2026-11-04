import sqlite3

conn = sqlite3.connect("product.db")

# create cursor to execute sql cmd or query
cursor = conn.cursor()

# @ execute query
cursor.execute("""
    CREATE TABLE IF NOT EXISTS students
    id INT PRUMARY KEY NOT NULL

""")

#  commit the change and close the connection
conn.commit()
conn.close()
