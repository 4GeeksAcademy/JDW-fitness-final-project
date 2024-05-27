"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Availability, Education
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

# EDUCATION ENDPOINTS
@api.route('/education', methods=['GET'])
def get_educations():
    educations = Education.query.all()
    educations_list = list(map(lambda prop: prop.serialize(),educations))

    return jsonify(educations_list), 200

@api.route('/education/<int:education_id>', methods=['GET'])
def get_education(education_id):
    education = Education.query.filter_by(id=education_id).first()
    return jsonify(education.serialize()), 200

@api.route('/education', methods=['POST'])
def add_education():
    education_data = request.json

    if "rank" not in education_data: return jsonify({"error": f"The property 'rank' was not properly written"}), 400 
    
    if education_data["rank"] == "": return jsonify({"error": f"The 'rank' must not be empty"}), 400 

    education_to_add = Education(**education_data)
    db.session.add(education_to_add)
    db.session.commit()

    return jsonify(education_to_add.serialize()), 200

@api.route('/education/<int:education_id>', methods=['PUT'])
def update_education(education_id):
    education_data = request.json
    new_rank = education_data.get('rank')

    if "rank" not in education_data: return jsonify({"error": f"The property 'rank' was not properly written"}), 400 
    
    if education_data["rank"] == "": return jsonify({"error": f"The 'rank' must not be empty"}), 400 

    education = Education.query.get(education_id)

    if education is None:
        return jsonify({"error": f"The ID '{education_id}' was not found in education"}), 400

    education.rank = new_rank
    db.session.commit()

    return jsonify(education.serialize()), 200

@api.route('/education/<int:education_id>', methods=['DELETE'])
def del_education(education_id):
    education = Education.query.get(education_id)
    if not education: return jsonify({"error": f"The ID '{education_id}' was not found in education"}), 400
    db.session.delete(education)
    db.session.commit()

    return jsonify({"deleted": f"Education '{education.rank}' was deleted successfully"}), 200 