import sqlite3
from flask import Flask, jsonify, request, abort
from argparse import ArgumentParser


DB = 'db.sqlite'

def get_todo_as_dict(row):
    row_dict = {
        'id': row[0],
        'task_name': row[1],
        'completed': row[2],
    }

    return row_dict

def get_user_as_dict(row):
    row_dict = {
        'id': row[0],
        'username': row[1],
        'password': row[2],
    }

    return row_dict

app = Flask(__name__)


@app.route('/api/todos/get', methods=['GET'])
def index():
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM todos')
    rows = cursor.fetchall()

    print(rows)

    db.close()

    rows_as_dict = []
    for row in rows:
        row_as_dict = get_todo_as_dict(row)
        rows_as_dict.append(row_as_dict)

    return jsonify(rows_as_dict), 200


@app.route('/api/todos/post', methods=['POST'])
def add_todo():
    if not request.json or 'task_name' not in request.json:
        abort(400)  

    task_name = request.json['task_name']
    completed = int(request.json.get('completed', False))  

    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('INSERT INTO todos (task_name, completed) VALUES (?, ?)', (task_name, completed))
    db.commit()

    db.close()

    return jsonify({'task_name': task_name, 'completed': completed}), 201

@app.route('/api/todos/<int:todo_id>', methods=['PUT'])
def update_todo(todo_id):
    if not request.json or 'task_name' not in request.json:
        abort(400) 

    task_name = request.json['task_name']
    completed = int(request.json.get('completed', False))  

    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('UPDATE todos SET task_name = ?, completed = ? WHERE id = ?', (task_name, completed, todo_id))
    db.commit()
    db.close()

    return jsonify({'task_name': task_name, 'completed': completed}), 200


@app.route('/api/todos/<int:todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('DELETE FROM todos WHERE id = ?', (todo_id,))
    db.commit()
    db.close()
    return jsonify({'result': 'success'}), 200


if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=5000,
                        type=int, help='port to listen on')
    args = parser.parse_args()
    port = args.port

    app.run(host='0.0.0.0', port=port)