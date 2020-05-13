from flask import Flask, jsonify, request, json
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
	friends = request.get_json()['friends']
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
			'friends': friends,
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
				'email': response['email'],
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
		status = request.headers['status']
		response = mongo.db.audio.find_one({ 'audio_file_name': audio_file.filename })
		if(response):
			return jsonify({ 'result': "Audio is already Present", 'error': True })
		else:
			mongo.save_file(audio_file.filename, audio_file)
			mongo.db.audio.insert_one({ 'email': email, 'audio_file_name': audio_file.filename, 'status': status })
			return jsonify({ 'result': "Audio Saved", 'error': False })
	else:
		return jsonify({ 'result': "Failed to save Audio.", 'error': True })

@app.route('/users/getAudioName/', methods=['POST'])
def showAudioName():
	user = list()
	userStatus = list()
	data = dict()
	iterable = mongo.db.audio.find({ 'email': request.get_json()['email'] })
	for doc in iterable:
		user.append(doc['audio_file_name'])
		userStatus.append(doc['status'])
	data['songName'] = user
	data['songStatus'] = userStatus
	return data

@app.route('/users/getFriends/', methods=['POST'])
def showFriends():
	user = mongo.db.users.find_one({ 'email': request.get_json()['email'] })
	data = dict()
	data['friends'] = user['friends']
	return data

@app.route('/users/getAllUsers/', methods=['POST'])
def getAllUsers():
	users = list()
	iterable = mongo.db.users.find()
	data = dict()
	for doc in iterable:
		temp = dict()
		temp['first_name'] = doc['first_name']
		temp['last_name'] = doc['last_name']
		temp['email'] = doc['email']
		temp['friends'] = doc['friends']
		users.append(temp)
	data['users'] = users
	return data

@app.route('/users/updateStatus/', methods=['POST'])
def updateStatus():
	email = request.get_json()['email']
	name = request.get_json()['name']
	status = request.get_json()['status']
	user = {}
	if(status == "Private"):
		user = { 'email': email, 'audio_file_name': name, 'status': status }
		mongo.db.audio.update_one(user, { '$set': { 'email': email, 'audio_file_name': name, 'status': "Public" }})
		return jsonify({ 'result': True, "value": "Public" })
	elif(status == "Public"): 
		user = { 'email': email, 'audio_file_name': name, 'status': status }
		mongo.db.audio.update_one(user, { '$set': { 'email': email, 'audio_file_name': name, 'status': "Private" }})
		return jsonify({ 'result': True, "value": "Private" })

@app.route('/users/getAllAudio/<email>/<name>')
def show(email, name):
	iterable = mongo.db.audio.find({ 'email': email })
	for doc in iterable:
		if name == doc['audio_file_name']:
			return mongo.send_file(name)
	return ""

if __name__ == "__main__":
	app.run(debug=True)