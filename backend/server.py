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
	songs = request.get_json()['songs']
	status = request.get_json()['status']
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
			'songs': songs,
			'status': status,
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
		user = mongo.db.users.find_one({ 'email': email })
		newSongs = user['songs']
		newStatus = user['status']
		if audio_file.filename in newSongs:
			return jsonify({ 'result': "Audio is already Present", 'error': True })
		else:
			newSongs.append(audio_file.filename)
			newStatus.append(status)
			mongo.save_file(audio_file.filename, audio_file)
			mongo.db.users.update_one({ 'email': email }, { '$set': { 'songs': newSongs, 'status': newStatus } })
			return jsonify({ 'result': "Audio Saved", 'error': False })
	else:
		return jsonify({ 'result': "Failed to save Audio.", 'error': True })

@app.route('/users/updateStatus/', methods=['POST'])
def updateStatus():
	email = request.get_json()['email']
	index = request.get_json()['index']
	status = request.get_json()['status']
	user = mongo.db.users.find_one({ 'email': email })
	newStatus = list(user['status'])
	if(status == "Private"):
		newStatus[index] = "Public"
		mongo.db.users.update_one({ 'email': email }, { '$set': { 'status': newStatus }})
		return jsonify({ 'result': True, "value": "Public" })
	elif(status == "Public"): 
		newStatus[index] = "Private"
		mongo.db.users.update_one({ 'email': email }, { '$set': { 'status': newStatus }})
		return jsonify({ 'result': True, "value": "Private" })

@app.route('/users/getAllAudio/<email>/<name>')
def show(email, name):
	user = mongo.db.users.find_one({ 'email': email })
	for doc in user['songs']:
		if name == doc:
			return mongo.send_file(name)
	return ""

@app.route('/users/getAudioName/', methods=['POST'])
def showAudioName():
	data = dict()
	userSongs = list()
	userStatus = list()
	user = mongo.db.users.find_one({ 'email': request.get_json()['email'] })
	data['songName'] = user['songs']
	data['songStatus'] = user['status']
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
	email = request.get_json()['email']
	data = dict()
	for doc in iterable:
		if email != doc['email']:
			temp = dict()
			temp['first_name'] = doc['first_name']
			temp['last_name'] = doc['last_name']
			temp['email'] = doc['email']
			temp['friends'] = doc['friends']
			users.append(temp)
	data['users'] = users
	return data

@app.route('/users/addFriend/', methods=['POST'])
def addFriend():
	tempFriends = []
	user = mongo.db.users.find_one({ 'email': request.get_json()['email'] })
	tempFriends = user['friends']
	tempFriends.append(request.get_json()['friendEmail'])
	mongo.db.users.update_one({ 'email': user['email'] }, { '$set': { 'friends': tempFriends } })
	return jsonify({ 'result': "Added as friend", 'error': False })

@app.route('/users/getFriendsData/', methods=['POST'])
def getFriendsData():
	data = dict()
	requested = mongo.db.users.find_one({ 'email': request.get_json()['email'] })
	friends = requested['friends']
	index = 1
	if(len(friends) > 0):
		for doc in friends:
			user = mongo.db.users.find_one({ 'email': doc })
			del user['_id']
			del user['created']
			del user['password']
			data['friend' + str(index)] = user
			index += 1
	return data

@app.route('/users/deleteSong/', methods=['POST'])
def deleteSong():
	email = request.get_json()['email']
	songName = request.get_json()['songName']
	user = mongo.db.users.find_one({ 'email': email })
	songs = user['songs']
	index = songs.index(songName)
	status = user['status']
	songs.remove(songName)
	del status[index]
	mongo.db.users.update_one({ 'email': email }, { '$set': { 'songs': songs, 'status': status } })
	return jsonify({ 'result': 'Song deleted !', 'error': False })

@app.route('/users/deleteFriend/', methods=['POST'])
def removeFriend():
	email = request.get_json()['email']
	friend_email = request.get_json()['deleteFriend']
	user = mongo.db.users.find_one({ 'email': email })
	friends = user['friends']
	friends.remove(friend_email)
	mongo.db.users.update_one({ 'email': email }, { '$set': { 'friends': friends } })
	return jsonify({ 'result': 'Friend Removed', 'error': False })

if __name__ == "__main__":
	app.run(debug=True)