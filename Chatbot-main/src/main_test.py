# -*- coding: utf-8 -*-
"""
Created on Sun Mar  6 13:51:57 2022

@author: OP
"""
import json 
import numpy as np
from tensorflow import keras
# from sklearn.preprocessing import LabelEncoder

import os
import pickle

# =============================================================================
# Setting current directory
# =============================================================================
# =============================================================================
# Loading our json file
# =============================================================================
# =============================================================================
# 
# with open(f'{parent}\public\data/intents.json') as file:
#     data = json.load(file)
#     
# def chat(data):
#     model = keras.models.load_model('models/chat_model')
#     
#     with open('objects/tokenizer.pickle', 'rb') as handle:
#         tokenizer = pickle.load(handle)
#         
#     with open('objects/label_encoder.pickle', 'rb') as enc:
#         lbl_encoder = pickle.load(enc)
#         
#     
#     max_len = 20
#     
#     while True:
#         
#         inp = input()
#         
#         if (inp.lower() == 'quit'):
#             break
#         
#         result = model.predict(keras.preprocessing.sequence.pad_sequences(
#             tokenizer.texts_to_sequences([inp]), 
#             truncating = 'post', maxlen = max_len))
#         
#         tag = lbl_encoder.inverse_transform([np.argmax(result)])
#         
#         for i in data:
#             if i['tag'] == tag:
#                 print(np.random.choice(i['responses']))
#         
# =============================================================================

from .database import get_database

dbname = get_database()
collection_name = dbname["intents"]
data = collection_name.find()

model = keras.models.load_model('models/chat_model')

with open('objects/tokenizer.pickle', 'rb') as handle:
    tokenizer = pickle.load(handle)

with open('objects/label_encoder.pickle', 'rb') as enc:
    lbl_encoder = pickle.load(enc)

max_len = 20


def chat(inp):
    result = model.predict(keras.preprocessing.sequence.pad_sequences(
        tokenizer.texts_to_sequences([inp]),
        truncating='post', maxlen=max_len))

    tag = lbl_encoder.inverse_transform([np.argmax(result)])

    for i in data:
        if i['tag'] == tag:
            return  np.random.choice(i['responses'])

        
if __name__ == "__main__":
        
    print("Talk here : ")
    print(chat(input()))
            