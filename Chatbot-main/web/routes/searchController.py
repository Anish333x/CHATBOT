from googleapiclient.discovery import build
from flask_restful import Resource

from server import app

def search(Resource):
    resource = build('customsearch', 'v1', developerKey=app.config.API_KEY).cse()
    print(type(resource))
