from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Create a list called 'events' with a couple of sample event dictionaries
events = [
    {"id": 1, "title": "Python Workshop"},
    {"id": 2, "title": "Flask Tutorial"}
]

# TASK: Create a route for "/"
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Welcome to the Event Catalog API!"}), 200

# TASK: Create a GET route for "/events"
@app.route("/events", methods=["GET"])
def get_events():
    return jsonify(events), 200

# TASK: Create a POST route for "/events"
@app.route("/events", methods=["POST"])
def create_event():
    # 1. Get the JSON data from the request
    data = request.get_json()
    
    # 2. Validate that "title" is provided
    if not data or "title" not in data or not data["title"]:
        return jsonify({"error": "Title is required"}), 400
    
    # 3. Create a new event with a unique ID and the provided title
    new_id = max([event["id"] for event in events], default=0) + 1
    new_event = {
        "id": new_id,
        "title": data["title"]
    }
    
    # 4. Add the new event to the events list
    events.append(new_event)
    
    # 5. Return the new event with status code 201
    return jsonify(new_event), 201

if __name__ == "__main__":
    app.run(debug=True)
