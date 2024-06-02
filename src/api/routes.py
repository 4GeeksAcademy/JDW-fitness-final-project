"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint

from api.models import db, User, Availability, Goals, Availability_client, Client

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
  
#GOALS ENDPOINTS  
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

    # CLIENT ENDPOINTS
@api.route('/client', methods=['GET'])
def get_clients():
    clients = Client.query.all()
    clients_list = list(map(lambda prop: prop.serialize(),clients))

    return jsonify(clients_list), 200

@api.route('/client/<int:client_id>', methods=['GET'])
def get_client(client_id):
    client = Client.query.filter_by(id=client_id).first()
    return jsonify(client.serialize()), 200



# Availability_client  GET ENDPOINTS
@api.route('/availability_client', methods=['GET'])
def get_availability_client():
    all_availability_client = Availability_client.query.all()
    results = list(map(lambda availability_client: availability_client.serialize(), all_availability_client))
    return jsonify(results), 200 

# Availability_client GET_ID ENDPOINTS
@api.route('/availability_client/<int:availability_client_id>', methods=['GET'])
def get_client_availabilities(availability_client_id):
    # Obtener todas las entradas de Availability_client asociadas con el client_id
    availability_clients = Availability_client.query.filter_by(client_id=availability_client_id).all()
    
    if not availability_clients:
        return jsonify({'message': 'No availabilities found for the given client_id'}), 404
    
    # Serializar cada entrada de Availability_client
    results = [availability_client.serialize() for availability_client in availability_clients]
    
    return jsonify(results), 200


    # ENDPOINT PARA POST  

@api.route('/availability_client', methods=['POST'])
def create_availability_client():
    data = request.json
    if not data:
        return jsonify({'message': 'No input data provided'}), 400

    client_email = data.get('client_email')
    availability_day = data.get('availability_day')
    if not client_email or not availability_day:
        return jsonify({'message': 'Client email and availability day must be provided'}), 400

    try:
        # Find the client by email
        client = Client.query.filter_by(email=client_email).first()
        if not client:
            return jsonify({'message': 'Client not found'}), 404

        # Find the availability by day
        availability = Availability.query.filter_by(day=availability_day).first()
        if not availability:
            return jsonify({'message': 'The specified availability day does not exist'}), 404

        # Check if the availability is already occupied by the client
        existing_entry = Availability_client.query.filter_by(client_id=client.id, availability_id=availability.id).first()
        if existing_entry:
            return jsonify({'message': 'The availability is already occupied by the client'}), 400

        # Create a new availability_client entry
        new_availability_client = Availability_client(client_id=client.id, availability_id=availability.id)
        db.session.add(new_availability_client)
        db.session.commit()

        return jsonify({'message': 'Availability client entry created successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Error while creating the availability client entry', 'error': str(e)}), 500




# ENDPOINT TO DELETE A SINGLE AVAILABILITY_CLIENT ENTRY

@api.route('/availability_client/<int:id>', methods=['DELETE'])
def delete_availability_client(id):
    availability_client = Availability_client.query.get(id)
    
    if availability_client is None:
        return jsonify({'message': 'Availability client entry not found'}), 404
    
    db.session.delete(availability_client)
    db.session.commit()
    
    return jsonify({'message': 'Availability client entry deleted successfully'}), 200

# ENDPOINT TO DELETE ALL AVAILABILITY_CLIENT ENTRIES FOR A SPECIFIC CLIENT.
@api.route('/availability_client/client/<int:client_id>', methods=['DELETE'])
def delete_all_availability_client_for_client(client_id):
    availability_clients = Availability_client.query.filter_by(client_id=client_id).all()
    
    if not availability_clients:
        return jsonify({'message': 'No availabilities found for the given client_id'}), 404
    
    for availability_client in availability_clients:
        db.session.delete(availability_client)
    
    db.session.commit()
    
    return jsonify({'message': 'All availability client entries for the client deleted successfully'}), 200




# Availability_client PUT ENDPOINTS

@api.route('/availability_client/<int:id>', methods=['PUT'])
def update_availability_client_day(id):
    availability_client = Availability_client.query.get(id)
    if not availability_client:
        return jsonify({'message': 'Availability client entry not found'}), 404

    data = request.json
    if not data:
        return jsonify({'message': 'No input data provided'}), 400

    new_day = data.get('availability_day')
    if not new_day:
        return jsonify({'message': 'New availability day not provided'}), 400

    try:
        # Find the new availability_id by the provided day
        new_availability = Availability.query.filter_by(day=new_day).first()
        if not new_availability:
            return jsonify({'message': 'The specified availability day does not exist'}), 404

        # Check if the new availability_id is already occupied by the client
        existing_entry = Availability_client.query.filter_by(client_id=availability_client.client_id, availability_id=new_availability.id).first()
        if existing_entry:
            return jsonify({'message': 'The new availability is already occupied by the client'}), 400

        availability_client.availability_id = new_availability.id

        db.session.commit()
        return jsonify({'message': 'Availability client entry updated successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Error while updating the availability client entry', 'error': str(e)}), 500




