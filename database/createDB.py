import sqlite3

db = sqlite3.connect('db.sqlite')

# Create todos table
db.execute('''
DROP TABLE IF EXISTS todos
''')

db.execute('''
CREATE TABLE todos(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  task_name TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT 0
)
''')

# Insert example data
db.execute('''
INSERT INTO todos (task_name, completed) VALUES (?, ?)
''', ('Example Task', 0))

db.commit()

# Create users table
db.execute('''
DROP TABLE IF EXISTS users
''')

db.execute('''
CREATE TABLE users(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  password TEXT NOT NULL
)
''')

db.commit()
db.close()