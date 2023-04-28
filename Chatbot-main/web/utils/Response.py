import json
from flask import jsonify

class Response():
    def __init__(self, message, statusCode = 200):
        self.status = ''
        self.message = message
        self.statusCode = statusCode

        if (self.statusCode >= 200 or self.statusCode < 300):
            self.status = 'success'

        else: self.status = 'fail'
    
    def sendResponse(self, data = ""):
        retJson = {
            'status' : self.status,
            'message' : self.message,
            "data" : data
        }

        return jsonify(retJson)

    def sendResponseData(self, data):
        retJson = {
            'status' : self.status,
            'message' : self.message,
        }
        retJson.update(data)

        return jsonify(retJson)

