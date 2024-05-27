"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint

from api.models import db, User, Availability, Goals, Activity_Frequency

from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# AVAILABILITY ENDPOINTS
@api.route('/availability', methods=['GET'])
def get_availabilities():
    availabilities = Availability.query.all()
    availabilities_list = list(map(lambda prop: prop.serialize(),availabilities))

    return jsonify(availabilities_list), 200

@api.route('/availability/<int:availability_id>', methods=['GET'])
def get_availability(availability_id):
    availability = Availability.query.filter_by(id=availability_id).first()
    return jsonify(availability.serialize()), 200

@api.route('/availability', methods=['POST'])
def add_availability():
    availability_data = request.json
    required_properties = ["day", "hour"]

    for prop in required_properties:
        if prop not in availability_data: return jsonify({"error": f"The property '{prop}' was not properly written"}), 400 
    
    for key in availability_data:
        if availability_data[key] == "": return jsonify({"error": f"The '{key}' must not be empty"}), 400 

    availability_to_add = Availability(**availability_data)
    db.session.add(availability_to_add)
    db.session.commit()

    return jsonify(availability_to_add.serialize()), 200

@api.route('/availability/<int:availability_id>', methods=['PUT'])
def update_availability(availability_id):
    data = request.json
    required_properties = ["day", "hour"]

    for prop in required_properties:
        if prop not in data: return jsonify({"error": f"The property '{prop}' was not properly written"}), 400 
    
    for key in data:
        if data[key] == "": return jsonify({"error": f"The '{key}' must not be empty"}), 400 

    availability = Availability.query.get(availability_id)

    if availability is None:
        return jsonify({"error": f"The ID '{availability_id}' was not found in Availability"}), 400

    for prop in data:
        setattr(availability, prop, data[prop])

    db.session.commit()

    return jsonify(availability.serialize()), 200

@api.route('/availability/<int:availability_id>', methods=['DELETE'])
def del_availability(availability_id):
    availability = Availability.query.get(availability_id)
    if not availability: return jsonify({"error": f"The ID '{availability_id}' was not found in Availability"}), 400
    db.session.delete(availability)
    db.session.commit()

    return jsonify({"deleted": f"Availability '{availability.day}' and '{availability.hour}' was deleted successfully"}), 200 
  
# GOALS ENDPOINTS  
@api.route('/goals', methods=['GET'])
def get_goals():
    all_goals = Goals.query.all()
    results = map(lambda goals: goals.serialize(),all_goals)

    return jsonify (list(results)), 200

@api.route('/goals/<int:goal_id>', methods=['GET'])
def get_goal(goal_id):
    goal = Goals.query.filter_by(id=goal_id).first()
    return jsonify(goal.serialize()), 200

@api.route('/goals', methods=['POST'])
def create_goals():
    goals_data = request.json
    goal_to_create = Goals(**goals_data)

    db.session.add(goal_to_create)
    db.session.commit()

    return jsonify(goal_to_create.serialize()), 200
  
@api.route('/goals/<int:goal_id>', methods=['PUT'])
def update_goal(goal_id):
    goal_data = request.json
    goal = Goals.query.get(goal_id)
    if not goal:
        return jsonify({"Error": f"The goal id was not found"}), 400
    
    goal.kind = goal_data["kind"]
    goal.description = goal_data["description"]
    db.session.commit()

    return jsonify(goal.serialize()), 200

@api.route('/goals/<int:goal_id>', methods=['DELETE'])
def delete_goal(goal_id):
    goal = Goals.query.filter_by(id=goal_id).first()

    db.session.delete(goal)
    db.session.commit()

    return jsonify({"Deleted": f"The goal was deleted"}), 200

# ACTIVITY FREQUENCY ENDPOINTS  
@api.route('/activities', methods=['GET'])
def get_activity_frequency():
    all_activities = Activity_Frequency.query.all()
    results = map(lambda activities: activities.serialize(),all_activities)

    return jsonify (list(results)), 200

@api.route('/activities/<int:activity_id>', methods=['GET'])
def get_singleActivity_frequency(activity_id):
    activity = Activity_Frequency.query.filter_by(id=activity_id).first()
    return jsonify(activity.serialize()), 200

@api.route('/activities', methods=['POST'])
def create_activity_frequency():
    activities_data = request.json
    activity_to_create = Activity_Frequency(**activities_data)

    db.session.add(activity_to_create)
    db.session.commit()

    return jsonify(activity_to_create.serialize()), 200
  
@api.route('/activities/<int:activity_id>', methods=['PUT'])
def updateActivityFrequency(activity_id):
    activity_data = request.json
    activity = Activity_Frequency.query.get(activity_id)
    if not activity:
        return jsonify({"Error": f"The activity id was not found"}), 400
    
    activity.mode = activity_data["mode"]
    db.session.commit()

    return jsonify(activity.serialize()), 200

@api.route('/activities/<int:activity_id>', methods=['DELETE'])
def deleteActivityFrequency(activity_id):
    activity = Activity_Frequency.query.filter_by(id=activity_id).first()

    db.session.delete(activity)
    db.session.commit()

    return jsonify({"Deleted": f"The activity was deleted"}), 200

