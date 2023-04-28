# -*- coding: utf-8 -*-
"""
Created on Sat Mar  5 18:40:13 2022

@author: OP
"""
# FROM DATABASE.PY FILE
import pickle
from database import get_database

import os
import re
import numpy as np
import pandas as pd
# from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer
from nltk.stem.snowball import SnowballStemmer
from nltk.stem.wordnet import WordNetLemmatizer

# lAYERS
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Embedding, GlobalAveragePooling1D
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from sklearn.preprocessing import LabelEncoder
from sklearn.feature_extraction.text import CountVectorizer


# =============================================================================
# Setting current directory
# =============================================================================
curr_dir = os.getcwd()
parent = os.path.dirname(curr_dir)

# =============================================================================
# Loading our json file
# =============================================================================

# with open(f'{parent}\public\data/intents.json') as file:
#     data = json.load(file)


# =============================================================================
# Initialise dbname from module imported above..
# retrive database values
# add all the intents in the intent variable
# =============================================================================
dbname = get_database()
collection_name = dbname["intents"]
intents = collection_name.find()

# for intent in intents:
#     print(intent)

# =============================================================================
#   PREPROCESSING
# =============================================================================

# Initialise varaibles

corpus = []
training_sentences = []
training_labels = []
labels = []
responses = []

# =============================================================================
# Segregating our data

# Adding all the raw sentences in corpus and the preprocessing it
# Suppose our training_sentences is of size = n (1 D)
# training_label size = n (1 D)
# Also called Target label corresponding to each training_data

# Response : Output i.e. response have size here : 8

# Labels : unique intents
# =============================================================================

for intent in intents:
    for patern in intent['patterns']:
        # Setting training sentences and therit respective labels
        corpus.append(patern)
        training_labels.append(intent['tag'])
    responses.append(intent['responses'])

    # Add all the unique tags to labels list
    if (intent['tag'] not in labels):
        labels.append(intent['tag'])


num_classes = len(labels)

# =============================================================================
# First cleaning text, lemmeatizing, stemming sentences, filtering stopword
# removal, finnaly our preprocessing function
# =============================================================================


def text_clean(corpus, keep_list):
    '''
    Purpose : Function to keep only alphabets, digits and certain words (punctuations, qmarks, tabs etc. removed)

    Input : Takes a text corpus, 'corpus' to be cleaned along with a list of words, 'keep_list', which have to be retained
            even after the cleaning process

    Output : Returns the cleaned text corpus

    '''
    cleaned_corpus = pd.Series()
    for row in corpus:
        qs = []
        for word in row.split():
            if word not in keep_list:
                # If the letter is a special symbol the replace it with space..
                p1 = re.sub(pattern='[^a-zA-Z0-9]', repl=' ', string=word)
                # Lowering case of all the letters
                p1 = p1.lower()
                qs.append(p1)
            else:
                qs.append(word)
        cleaned_corpus = cleaned_corpus.append(pd.Series(' '.join(qs)))
    return cleaned_corpus


# extract the base form of the words by removing affixes from them
def stem(corpus, stem_type=None):
    if stem_type == 'snowball':
        stemmer = SnowballStemmer(language='english')
        corpus = [[stemmer.stem(x) for x in x] for x in corpus]
    else:
        stemmer = PorterStemmer()
        corpus = [[stemmer.stem(x) for x in x] for x in corpus]
    return corpus


def lemmatize(corpus):
    lem = WordNetLemmatizer()
    corpus = [[lem.lemmatize(x, pos='v') for x in x] for x in corpus]
    return corpus


def stopwords_removal(corpus):
    wh_words = ['who', 'what', 'when', 'why', 'how', 'which', 'where', 'whom']
    stop = set(stopwords.words('english'))
    for word in wh_words:
        stop.remove(word)
    corpus = [[x for x in x.split() if x not in stop] for x in corpus]
    return corpus


def preprocess(corpus, keep_list, cleaning=True, stemming=False, stem_type=None, lemmatization=False, remove_stopwords=True):
    '''
    Purpose : Function to perform all pre-processing tasks (cleaning, stemming, lemmatization, stopwords removal etc.)

    Input : 
    'corpus' - Text corpus on which pre-processing tasks will be performed
    'keep_list' - List of words to be retained during cleaning process
    'cleaning', 'stemming', 'lemmatization', 'remove_stopwords' - Boolean variables indicating whether a particular task should 
                                                                  be performed or not
    'stem_type' - Choose between Porter stemmer or Snowball(Porter2) stemmer. Default is "None", which corresponds to Porter
                  Stemmer. 'snowball' corresponds to Snowball Stemmer

    Note : Either stemming or lemmatization should be used. There's no benefit of using both of them together

    Output : Returns the processed text corpus

    '''

    if cleaning == True:
        corpus = text_clean(corpus, keep_list)

    if remove_stopwords == True:
        corpus = stopwords_removal(corpus)
    else:
        corpus = [[x for x in x.split()] for x in corpus]

    if lemmatization == True:
        corpus = lemmatize(corpus)

    if stemming == True:
        corpus = stem(corpus, stem_type)

    corpus = [' '.join(x) for x in corpus]

    return corpus


training_sentences = preprocess(corpus, keep_list=[])

vectorizer_ngram_range = CountVectorizer(analyzer='word', ngram_range=(1, 3))
bow_matrix_ngram = vectorizer_ngram_range.fit_transform(training_sentences)


# print(vectorizer_ngram_range.get_feature_names())
# print(bow_matrix_ngram.toarray())

# TODO
# Here use one hot encoder instead of labelEncoder
# I will change this afterwards
# =============================================================================
# Use LabelEncoder() to convert target Label into model understandable form
# =============================================================================
lbl_encoder = LabelEncoder()
lbl_encoder.fit(training_labels)

training_labels = lbl_encoder.transform(training_labels)

vocab_size = 1000
embedding_dim = 32
max_len = 20
oov_token = "unk"

tokenizer = Tokenizer(num_words=vocab_size, oov_token=oov_token)

tokenizer.fit_on_texts(training_sentences)
word_index = tokenizer.word_index

sequences = tokenizer.texts_to_sequences(training_sentences)
padded_sequences = pad_sequences(sequences, truncating='post', maxlen=max_len)

model = Sequential()
model.add(Embedding(vocab_size, embedding_dim, input_length=max_len))
model.add(GlobalAveragePooling1D())

model.add(Dense(64, activation='relu'))
model.add(Dense(64, activation='relu'))

model.add(Dense(num_classes, activation='softmax'))

model.compile(loss='sparse_categorical_crossentropy',
              optimizer='adam', metrics=['accuracy'])

model.summary()

epochs = 2000

history = model.fit(padded_sequences, np.array(training_labels), epochs=epochs)
model.save("models/chat_model")

# =============================================================================
# Saved my model just for testing purpose
# =============================================================================


# to save the fitted tokenizer
with open('objects/tokenizer.pickle', 'wb') as handle:
    pickle.dump(tokenizer, handle, protocol=pickle.HIGHEST_PROTOCOL)

# to save the fitted label encoder
with open('objects/label_encoder.pickle', 'wb') as ecn_file:
    pickle.dump(lbl_encoder, ecn_file, protocol=pickle.HIGHEST_PROTOCOL)
