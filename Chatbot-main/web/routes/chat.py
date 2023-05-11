from urllib import response
from urllib.robotparser import RequestRate

import requests
from server import Intents
from flask import jsonify, request
from flask_restful import Resource
from flask_pymongo import PyMongo

from utils.Response import Response


class Chat(Resource):
    # basic get request
    def get(self):
        return Response("Hello, lets chat", 200).sendResponse()
    
    # post request
    def post(self):
       id = request.get_json()['id']
       msg = request.get_json()['message']
       # if message is empty
       if (msg == ""):
           return Response(message = "bot replied").sendResponse(data = "Say something man")

       data = {"sender" : id, "message" : msg}
       print('dATA:00', data)
       response = requests.post("http://127.0.0.1:5005/webhooks/rest/webhook", json = data)
    #    print(response.json())
       return Response(message = "bot replied!").sendResponse(data = response.json()[0]['text'])