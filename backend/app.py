from flask import Flask, jsonify, request
from models import db, Item, Board, Users
from flask_cors import CORS
import os
import psycopg2
import jwt
import datetime
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests from frontend

app.config['SECRET_KEY'] = 'your_secret_key'

# PostgreSQL connection
app.config[
    'SQLALCHEMY_DATABASE_URI'] = f"postgresql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@db:5432/{os.getenv('DB_NAME')}"

app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql://{'user'}:{'password'}@localhost:6432/{'mydb'}"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)


# Initialize database
@app.before_first_request
def create_tables():
    db.create_all()


# API to fetch all items
@app.route('/boards', methods=['GET'])
def get_boards():
    boards = Board.query.all()
    return jsonify([{'id': board.id, 'ssid': board.ssid, 'url': board.url} for board in boards])


@app.route('/boards', methods=['POST'])
def add_boards():
    print(request)

    data = request.json
    print(data)
    new_board = Board(ssid=data['ssid'], url=data['url'])
    db.session.add(new_board)
    db.session.commit()
    return jsonify({'id': new_board.id, 'ssid': new_board.ssid, 'url': new_board.url})


@app.route('/boards/<int:id>', methods=['DELETE'])
def delete_board(id):
    board = Board.query.get(id)
    if board:
        db.session.delete(board)
        db.session.commit()
    return '', 204


@app.route('/boards/<int:id>', methods=['GET'])
def activate_board(id):
    board = Board.query.get(id)
    if board:
        print(f"Opening gate at url: {board.url}")
    return '', 204


# -------------------
@app.route('/users', methods=['GET'])
def get_users():
    users = Users.query.all()
    return jsonify([{'id': user.id, 'nationalityId': user.nationalityId, 'firstName': user.firstName,
                     'lastName': user.lastName, 'email': user.email} for user in users])


@app.route('/users', methods=['POST'])
def add_users():
    data = request.json
    new_user = Users(nationalityId=data['nationalityId'], firstName=data['firstName'], lastName=data['lastName'],
                     email=data['email'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'id': new_user.id, 'nationalityId': new_user.nationalityId, 'firstName': new_user.firstName,
                    'lastName': new_user.lastName, 'email': new_user.email})


@app.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = Users.query.get(id)
    if user:
        db.session.delete(user)
        db.session.commit()
    return '', 204


def get_db_connection():
    conn = psycopg2.connect(
        dbname='login_db',
        user='login_user',
        password='yourpassword',
        host='localhost'
    )
    return conn


@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM users WHERE email = %s', (email,))
    user = cur.fetchone()
    cur.close()
    conn.close()

    if user and check_password_hash(user[2], password):  # Assuming password is at index 2
        token = jwt.encode({
            'user_id': user[0],  # Assuming id is at index 0
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        }, app.config['SECRET_KEY'])

        return jsonify({'token': token}), 200
    else:
        return jsonify({'message': 'Invalid credentials!'}), 401


# Sample route for a homepage (protected)
@app.route('/api/home', methods=['GET'])
def home():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'message': 'Token is missing!'}), 401

    try:
        data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
        return jsonify({'message': 'Welcome to the homepage!', 'user_id': data['user_id']}), 200
    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Token has expired!'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'message': 'Invalid token!'}), 401


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
