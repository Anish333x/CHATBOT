from typing import Text

from rasa_sdk import Action
from rasa_sdk.events import SlotSet

class GiveUserStateDetails(Action):
    def name(self) -> Text:
        return "action_utter_state_got"

    def run(self, dispatcher, tracker, domain):

        state = tracker.get_slot("state")

        dispatcher.utter_message(text = f"so you are {state}")

        return [SlotSet('state', state)]