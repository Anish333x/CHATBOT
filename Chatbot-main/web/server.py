from flask import Flask, request
from flask_restful import Api
from flask_pymongo import PyMongo
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

# app.config.from_object('config.env')
app.config['MONGO_URI'] = 'mongodb://localhost:27017/config'
api = Api(app)

mongo_cl = PyMongo(app)
print(mongo_cl.db)
Intents = mongo_cl.db.intents

if __name__ == "__main__":
    print("Server started!!")