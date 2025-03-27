from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token
from flask_cors import CORS
import re

app = Flask(__name__)
CORS(app)  
app.config['JWT_SECRET_KEY'] = 'supersecretkey'  
jwt = JWTManager(app)
bcrypt = Bcrypt(app)


users = {}
journals = {}


EMAIL_REGEX = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'


@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username, email, password = data.get('username'), data.get('email'), data.get('password')

    if not username or not email or not password:
        return jsonify({'error': 'All fields are required'}), 400

    if not re.match(EMAIL_REGEX, email):
        return jsonify({'error': 'Invalid email format'}), 400

    if username in users:
        return jsonify({'error': 'Username already taken'}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    users[username] = {'email': email, 'password': hashed_password}

    return jsonify({'message': 'User registered successfully'}), 201


@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username, password = data.get('username'), data.get('password')

    if username not in users or not bcrypt.check_password_hash(users[username]['password'], password):
        return jsonify({'error': 'Invalid credentials'}), 401

    token = create_access_token(identity=username)
    return jsonify({'message': 'Login successful', 'token': token}), 200

if __name__ == '__main__':
    app.run(debug=True)
