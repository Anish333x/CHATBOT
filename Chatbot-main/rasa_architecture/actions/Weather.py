from rasa_sdk import Action

import requests

def getCurrentUserLocation():
    return "Surat"

class GiveWeatherDetails(Action):
    def name(self):
        return "action_utter_weather"

    def run(self, dispatcher, tracker, domain):

        location = tracker.get_slot("location")
        print('LOCALTION:0,', location)
        if (location == None):
            location = getCurrentUserLocation()

        res = requests.get(f"http://127.0.0.1:8000/api/v1/weather/?city={location}")

        res = res.json()

        dispatcher.utter_message(text = f"weather of {location} is : {res['weather']}")

        return []
    