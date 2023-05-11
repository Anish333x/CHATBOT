import requests, datetime
from typing import Text

from rasa_sdk import Action

class GetExpenses(Action):
    def name(self) -> Text:
        return "action_get_expenses"

    def run(self, dispatcher, tracker, domain):
        try:
            response = requests.get('http://127.0.0.1:8000/api/v1/expense')
            response = response.json()
            totalAmount = 0

            for expense in response['data']:
                res = ''
                for x in expense['amount']:
                    try:
                        int(x)
                        res += x
                    except:
                        continue
                totalAmount += int(res)
            print('TOTAL:', totalAmount)
            dispatcher.utter_message(f"Your toal expense : {totalAmount}")

        except:
            print("There was some error in getting expenses")
            dispatcher.utter_message("There was some error in getting expenses")

class CreateExpense(Action):
    def name(self) -> Text:
        return "action_add_expense"

    def run(self, dispatcher, tracker, domain):
        try:
            item = tracker.get_slot("item")
            time = tracker.get_slot("time")
            price = tracker.get_slot("amount-of-money")
            newPrice = ''
            for x in price:
                try:
                    int(x)
                    newPrice += x
                except:
                    continue
            if (time == None):
                time = datetime.datetime.now()
            # con_time = datetime.datetime.strptime('2023/04/27', "%Y-%m-%dT%H:%M:%S.000+00:00")
            # con_time = int(con_time.timestamp() * 1000)


            newExpense = {"title" : item, "amount" : newPrice, "date" : '2023/04/27'}

            response = requests.post("http://127.0.0.1:8000/api/v1/expense", json=newExpense)
            response = response.json()
            print('RESPONSE:', response)
            if (response['status'] == 'success'): 
                dispatcher.utter_message(text = f"Your expenese has been added to our Expense Tracker")

            else: dispatcher.utter_message(text ="Something went wrong with our api")

        except Exception as e:
            print("there is some error in actions", e)
            dispatcher.utter_message(text = "Something went wrong while creating your expense")

        return []