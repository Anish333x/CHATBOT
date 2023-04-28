# This is my CP project where i am creating a chatbot

## 1: First create config.env file with follwing variables:

    PORT=8000
    NODE_HOST=localhost

    FLASK_PORT=5000
    HOST=127.0.0.1
    NODE_ENV=development

    DATABASE_CONNECTION_STRING=(YOUR_DATABSE_CONNECTION_STRING)
    DATABASE_PASSWORD=(YOUR_DATABSE_PASSWORD)
    DATABASE_NAME=(YOUR_DATABASE_NAME)

    JWT_SECRET=(YOUR_JWT_SECRET_TOKEN)
    JWT_COOKIE_EXP_IN=90
    JWT_EXPIRES_IN=90

    GOOGLE_CALENDER_VERSION=v3
    GOOGLE_CLIENT_ID=(YOUR_GOOGLE_CLIENT_ID)
    GOOGLE_SECRET=(YOUR_GOOGLSE_SECRET_KEY)
    REFRESH_TOKEN=(YOUR_GOOGLE_REFRESH_TOKEN)

    OPENWEATHER_API_KEY=(OPEN_WEATHER_API_KEY)

You need to setup firebase realtime database to run this app:
You can check out:

    https://firebase.google.com/docs/database/

Add those envirnoment variables to config.env file:

    FIREBASE_API_KEY
    FIREBASE_AUTHDOMAIN
    FIREBASE_DATABASE_URL
    FIREBASE_PROJECT_ID
    FIREBASE_STORAGE_BUCKET
    FIREBASE_MESSAGE_SENDER_ID
    FIREBASE_APP_ID

To get started run the following commands

    npm install

## 2: create a python virtual envirnoment:

    virtualenv chatbot_env --python=python3.8

(recommended version: python 3.8)

## 3: Now activate your virtual envirnoment

To activate follow these steps:

1 run:

    cd name_of_env
    cd Scripts
    activate

## 4: And then run this command:

    pip install rasa==3.1 --extra-index-url https://pypi.rasa.com/simple

### 5: Meanwhile make sure you have docker installed in your system

## 6: With docker installed excecute this command:

    docker pull rasa/duckling

## 7: And then install all these packages:

    pip install Flask
    pip install sklearn
    pip install pymongo[srv]
    pip install flask_restful
    pip install flask_pymongo

Remember to change dir to rasa_architecture folder

---

Run(on new terminal):

    cd rasa_architecture

## Now running the Project

First traing your model:

    rasa train

For command line interface of chatbot:

    rasa shell

Now to interact with the bot more deeply use this:

    srasa interactive

To start the api server use this command:

    docker run rasa/duckling

To run actions server of rasa:

    rasa run actions

To start rasa api server:

    rasa run --enable-api --i 127.0.0.1 -p 4000

ports to note:

        rasa/duckling : 5001
        react : http://localhost:3000
        rasa actions : http://0.0.0.0:5055
        flask : http://127.0.0.1:5000
        node : http://localhost:8000
