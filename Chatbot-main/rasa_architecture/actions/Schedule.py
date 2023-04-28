import datetime, requests

from typing import Dict, List, Text, Any
from rasa_sdk import Action, Tracker


class CreateSchedule(Action):
    def name(self) -> Text:
        return "action_create_schedule"

    def run(self, dispatcher, tracker, domain):
        try:
            req_time = tracker.get_slot("time")
            task = tracker.get_slot("task")

            con_time = datetime.datetime.strptime(req_time, "%Y-%m-%dT%H:%M:%S.000+00:00")
            end_time = con_time + datetime.timedelta(minutes = 60)

            data = {"startTime" : str(con_time), "endTime" : str(end_time), 'task' : task}

            response = requests.post("http://127.0.0.1:8000/api/v1/schedule", json = data)
            response = response.json()

            dispatcher.utter_message(text = f"{response['message']}")

        except:
            dispatcher.utter_message(text = "something went wrong while doing your work")

        return []

        
class ConfirmScheduleDetails(Action):
    def name(self) -> Text:
        return "action_utter_schedule_confirmation"

    def run(self, dispatcher, tracker, domain):

        req_time = tracker.get_slot("time")
        task = tracker.get_slot("task")

        con_time = datetime.datetime.strptime(req_time, "%Y-%m-%dT%H:%M:%S.000+00:00")
        end_time = con_time + datetime.timedelta(minutes = 60)

        dispatcher.utter_message(text = f"Your start time : {con_time}, end time : {end_time}, task : {task}, is it right")

        return []