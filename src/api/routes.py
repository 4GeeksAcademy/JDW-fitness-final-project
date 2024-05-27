"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Availability, Experience
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

# EXPERIENCE ENDPOINTS
@api.route('/experience', methods=['GET'])
def get_experiences():
    experiences = Experience.query.all()
    experiences_list = list(map(lambda prop: prop.serialize(),experiences))

    return jsonify(experiences_list), 200

@api.route('/experience/<int:experience_id>', methods=['GET'])
def get_experience(experience_id):
    experience = Experience.query.filter_by(id=experience_id).first()
    return jsonify(experience.serialize()), 200

@api.route('/experience', methods=['POST'])
def add_experience():
    experience_data = request.json

    if "time" not in experience_data: return jsonify({"error": f"The property 'time' was not properly written"}), 400 
    
    if experience_data["time"] == "": return jsonify({"error": f"The 'time' must not be empty"}), 400 

    experience_to_add = Experience(**experience_data)
    db.session.add(experience_to_add)
    db.session.commit()

    return jsonify(experience_to_add.serialize()), 200

@api.route('/experience/<int:experience_id>', methods=['PUT'])
def update_experience(experience_id):
    experience_data = request.json
    new_time = experience_data.get('time')

    if "time" not in experience_data: return jsonify({"error": f"The property 'time' was not properly written"}), 400 
    
    if experience_data["time"] == "": return jsonify({"error": f"The 'time' must not be empty"}), 400 

    experience = Experience.query.get(experience_id)

    if experience is None:
        return jsonify({"error": f"The ID '{experience_id}' was not found in experience"}), 400

    experience.time = new_time
    db.session.commit()

    return jsonify(experience.serialize()), 200

@api.route('/experience/<int:experience_id>', methods=['DELETE'])
def del_experience(experience_id):
    experience = Experience.query.get(experience_id)
    if not experience: return jsonify({"error": f"The ID '{experience_id}' was not found in experience"}), 400
    db.session.delete(experience)
    db.session.commit()

    return jsonify({"deleted": f"Experience '{experience.time}' was deleted successfully"}), 200 