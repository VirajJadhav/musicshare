from flask import Flask, jsonify, request, json, url_for, redirect
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from datetime import datetime
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token

app = Flask(__name__)

app.config['MONGO_DBNAME'] = "musicshare"
app.config['MONGO_URI'] = "mongodb://localhost:27017/musicshare"
app.config['JWT_SECRET_KEY'] = 'secret'

mongo = PyMongo(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app)

@app.route('/users/register', methods=['POST'])
def register():
	users = mongo.db.users
	first_name = request.get_json()['first_name']
	last_name = request.get_json()['last_name']
	email = request.get_json()['email']
	password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
	created = datetime.utcnow()
	result = users.find_one({ 'email': email })
	if(result):
		return jsonify({ 'result': "User with email already registered !", 'error': True })
	else:
		newUser = users.insert_one({
			'first_name': first_name,
			'last_name': last_name,
			'email': email,
			'password': password,
			'created': created
		})
		return jsonify({ 'result': "User Registered", 'error': False })

@app.route('/users/login', methods=['POST'])
def login():
	users = mongo.db.users
	email = request.get_json()['email']
	password = request.get_json()['password']
	response = users.find_one({ 'email': email })
	if response:
		if bcrypt.check_password_hash(response['password'], password):
			access_token = create_access_token(identity = {
				'first_name': response['first_name'],
				'last_name': response['last_name'],
				'email': response['email']
			})
			return jsonify({ 'result': access_token, 'error': False })
		else:
			return jsonify({ 'result': "Invalid password", 'error': True })
	else:
		return jsonify({ 'result': "Email not registered !", 'error': True })

@app.route('/users/upload', methods=['POST'])
def upload():
	if 'audio_file' in request.files:
		audio_file = request.files['audio_file']
		email = request.headers['email']
		# mongo.save_file(audio_file.filename, audio_file)
		# mongo.db.audio.insert_one({ 'email': email, 'audio_file_name': audio_file.filename })
		return jsonify({ 'audio_file': True })
	else:
		return jsonify({ 'audio_file': False })

#currently not used anywhere
@app.route('/users/getAudio/<email>', methods=['GET'])
def showAudio(email):
	user = mongo.db.audio.find_one_or_404({ 'email': email })
	return mongo.send_file(user['audio_file_name'])

@app.route('/users/getAudioName/', methods=['POST'])
def showAudioName():
	user = list()
	data = dict()
	iterable = mongo.db.audio.find({ 'email': request.get_json()['email'] })
	for doc in iterable:
		user.append(doc['audio_file_name'])
	data['songName'] = user
	return data

@app.route('/users/getAllAudio/<email>/<name>')
def show(email, name):
	iterable = mongo.db.audio.find({ 'email': email })
	for doc in iterable:
		if name == doc['audio_file_name']:
			return mongo.send_file(name)
	return ""

if __name__ == "__main__":
	app.run(debug=True)