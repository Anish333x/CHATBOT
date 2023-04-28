

import os, json
from dotenv import load_dotenv
from pymongo import MongoClient
from os.path import join

curr_dir = os.getcwd()
parent = os.path.dirname(curr_dir)


# def get_database():
#     dotenv_path = join(dirname(__file__), 'config.env')
#     load_dotenv(dotenv_path)
#         
#     CONNECTION_STRING = os.environ.get('DATABASE_CONNECTION_STRING')
# 
#     DATABASE_PASSWORD = os.environ.get("DATABASE_PASSWORD")
#     DATABASE_NAME = os.environ.get('DATABASE_NAME')
#     
#     CONNECTION_STRING = CONNECTION_STRING.replace('<PASSWORD>', DATABASE_PASSWORD)
#     CONNECTION_STRING = CONNECTION_STRING.replace('<DATABASE_NAME>', DATABASE_NAME)
#     
#     print(CONNECTION_STRING)
#     
#     client = MongoClient(CONNECTION_STRING)
#     
#     return client['Students']
# =============================================================================

def get_database():
    dotenv_path = join(parent, 'config.env')
    print(dotenv_path)
    load_dotenv(dotenv_path)

    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    CONNECTION_STRING = os.environ.get('DATABASE_CONNECTION_STRING')
    DATABASE_PASSWORD = os.environ.get("DATABASE_PASSWORD")
    
    CONNECTION_STRING = CONNECTION_STRING.replace('<PASSWORD>', DATABASE_PASSWORD)

    # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
    client = MongoClient(CONNECTION_STRING)

    # Create the database for our example (we will use the same database throughout the tutorial
    return client['College']
    
# This is added so that many files can reuse the function get_database()

# =============================================================================
# If this script is run then all the contents of intents.json will be uploaded
# to database collection
# =============================================================================

# TODO
# CREATE A VALIDATION SCRIPT WHERE IT WILL VALIDATE DUPLICATE VALUES

if __name__ == "__main__":    
    
    # Get the database
    dbname = get_database()
    collection_name = dbname["Intents"]
    
    with open(f'{parent}\public\data/intents.json') as file:
        data = json.load(file)
    
    # print(type(json.dumps(data)))
    collection_name.insert_many(data)
    
