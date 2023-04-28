
# from routes.searchController import search
from routes.chat import Chat
from server import app, api
from utils.Response import Response

# base route
@app.route('/')
def hello_world():
    return Response("Hello", 200).sendResponse(), 200

api.add_resource(Chat, '/chat')
# api.add_resource(search, '/search')


if __name__ == "__main__":
    app.run(debug=True)
