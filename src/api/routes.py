"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
import requests
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Availability, Goals, Diseases, Experience, Education, ActivityFrequency, Coach, Client, Availability_client,AvailabilityCoach, Likes, Match
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# Obtener la clave de API de Google desde las variables de entorno
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')

# Endpoint para geocodificación (dirección a coordenadas)
@api.route('/geocode', methods=['GET'])
def geocode_address():
    address = request.args.get('address')
    if not address:
        return jsonify({'error': 'Address parameter is required'}), 400

    url = f'https://maps.googleapis.com/maps/api/geocode/json?address={address}&key={GOOGLE_API_KEY}'
    response = requests.get(url)
    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({'error': 'Failed to get geocoding data'}), 500

# Endpoint para geocodificación inversa (coordenadas a dirección)
@api.route('/reverse-geocode', methods=['GET'])
def reverse_geocode():
    lat = request.args.get('lat')
    lng = request.args.get('lng')
    if not lat or not lng:
        return jsonify({'error': 'Latitude and longitude parameters are required'}), 400

    url = f'https://maps.googleapis.com/maps/api/geocode/json?latlng={lat},{lng}&key={GOOGLE_API_KEY}'
    response = requests.get(url)
    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({'error': 'Failed to get reverse geocoding data'}), 500

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

    return jsonify(availability_to_add.serialize()), 201

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
        return jsonify({"error": f"The ID '{availability_id}' was not found in Availability"}), 404

    for prop in data:
        setattr(availability, prop, data[prop])

    db.session.commit()

    return jsonify(availability.serialize()), 200

@api.route('/availability/<int:availability_id>', methods=['DELETE'])
def del_availability(availability_id):
    availability = Availability.query.get(availability_id)
    if not availability: return jsonify({"error": f"The ID '{availability_id}' was not found in Availability"}), 404
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
        return jsonify({"Error": f"The goal id was not found"}), 404
    
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
  
# DISEASES ENDPOINTS
@api.route('/diseases', methods=['GET'])
def get_diseases():
    all_diseases=Diseases.query.all()
    results = list(map(lambda diseases: diseases.serialize(), all_diseases))
    return jsonify(results), 200
  
@api.route('/diseases/<int:diseases_id>', methods=['GET'])
def get_diseaseid(diseases_id):
    disease = Diseases.query.filter_by(id=diseases_id).first()
    if disease is None:
        return jsonify({'message': 'Disease not found'}), 404
    return jsonify(disease.serialize()), 200
  
@api.route('/diseases', methods=['POST'])
def create_diseases():
    data = request.json
    if not 'kind' in data:
        return jsonify('error :missing fields'), 400
    
    if data['kind'] == "":
     return jsonify({'error': 'Kind cannot be empty', 'hint': 'Please enter a valid kind'}), 400

    diseases = Diseases(kind = data['kind'], sintoms = data['sintoms'])
    db.session.add(diseases)
    db.session.commit()
    response_body = {
        "msg": "Diseases created successfully"
    }
    return jsonify(response_body), 201
  
@api.route('/diseases/<int:diseases_id>', methods=['PUT'])
def update_diseases(diseases_id):
    diseases = Diseases.query.get(diseases_id)
    if not diseases:
        return jsonify({'message': 'The disease does not exist'}), 404

    data = request.json
    if not data:
        return jsonify({'message': 'No input data provided'}), 400

    try:
        if 'kind' in data:
            diseases.kind = data['kind']
        if 'sintoms' in data:
            diseases.sintoms = data['sintoms']
        
        db.session.commit()
        return jsonify({'message': 'The Diseases was successfully updated.'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Error while updating the diseases', 'error': str(e)}), 500
      
@api.route('/diseases/<int:diseases_id>', methods=['DELETE'])
def delete_diseases(diseases_id):
     diseases = Diseases.query.get(diseases_id)
     if not diseases:
      return jsonify({'message': 'La enfermedad no existe'}), 404
     
     try:
        db.session.delete(diseases)
        db.session.commit()
        return jsonify({'message': 'The Diseases was successfully eliminated.'}), 200
     except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Error while deleting the diseases', 'error': str(e)}), 500
      
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

    return jsonify(experience_to_add.serialize()), 201

@api.route('/experience/<int:experience_id>', methods=['PUT'])
def update_experience(experience_id):
    experience_data = request.json
    new_time = experience_data.get('time')

    if "time" not in experience_data: return jsonify({"error": f"The property 'time' was not properly written"}), 400 
    
    if experience_data["time"] == "": return jsonify({"error": f"The 'time' must not be empty"}), 400 

    experience = Experience.query.get(experience_id)

    if experience is None:
        return jsonify({"error": f"The ID '{experience_id}' was not found in experience"}), 404

    experience.time = new_time
    db.session.commit()

    return jsonify(experience.serialize()), 200

@api.route('/experience/<int:experience_id>', methods=['DELETE'])
def del_experience(experience_id):
    experience = Experience.query.get(experience_id)
    if not experience: return jsonify({"error": f"The ID '{experience_id}' was not found in experience"}), 404
    db.session.delete(experience)
    db.session.commit()

    return jsonify({"deleted": f"Experience '{experience.time}' was deleted successfully"}), 200  

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

    return jsonify(education_to_add.serialize()), 201

@api.route('/education/<int:education_id>', methods=['PUT'])
def update_education(education_id):
    education_data = request.json
    new_rank = education_data.get('rank')

    if "rank" not in education_data: return jsonify({"error": f"The property 'rank' was not properly written"}), 400 
    
    if education_data["rank"] == "": return jsonify({"error": f"The 'rank' must not be empty"}), 400 

    education = Education.query.get(education_id)

    if education is None:
        return jsonify({"error": f"The ID '{education_id}' was not found in education"}), 404

    education.rank = new_rank
    db.session.commit()

    return jsonify(education.serialize()), 200

@api.route('/education/<int:education_id>', methods=['DELETE'])
def del_education(education_id):
    education = Education.query.get(education_id)
    if not education: return jsonify({"error": f"The ID '{education_id}' was not found in education"}), 404
    db.session.delete(education)
    db.session.commit()

    return jsonify({"deleted": f"Education '{education.rank}' was deleted successfully"}), 200 
  
# ACTIVITY FREQUENCY ENDPOINTS  
@api.route('/activities', methods=['GET'])
def get_activity_frequency():
    all_activities = ActivityFrequency.query.all()
    results = map(lambda activities: activities.serialize(),all_activities)

    return jsonify (list(results)), 200

@api.route('/activities/<int:activity_id>', methods=['GET'])
def get_singleActivity_frequency(activity_id):
    activity = ActivityFrequency.query.filter_by(id=activity_id).first()
    return jsonify(activity.serialize()), 200

@api.route('/activities', methods=['POST'])
def create_activity_frequency():
    activities_data = request.json
    activity_to_create = ActivityFrequency(**activities_data)

    db.session.add(activity_to_create)
    db.session.commit()

    return jsonify(activity_to_create.serialize()), 200
  
@api.route('/activities/<int:activity_id>', methods=['PUT'])
def updateActivityFrequency(activity_id):
    activity_data = request.json
    activity = ActivityFrequency.query.get(activity_id)
    if not activity:
        return jsonify({"Error": f"The activity id was not found"}), 404
    
    activity.mode = activity_data["mode"]
    db.session.commit()

    return jsonify(activity.serialize()), 200

@api.route('/activities/<int:activity_id>', methods=['DELETE'])
def deleteActivityFrequency(activity_id):
    activity = ActivityFrequency.query.filter_by(id=activity_id).first()

    db.session.delete(activity)
    db.session.commit()

    return jsonify({"Deleted": f"The activity was deleted"}), 200

# CLIENT ENDPOINTS
@api.route('/client', methods=['GET'])
def get_clients():
    clients = Client.query.all()
    clients_list = list(map(lambda prop: prop.serialize(),clients))

    return jsonify(clients_list), 200

@api.route('/client/<int:client_id>', methods=['GET'])
def get_client(client_id):
    client = Client.query.filter_by(id=client_id).first()
    if not client: return jsonify({"error": f"The ID '{client_id}' was not found in Clients"}), 404
    return jsonify(client.serialize()), 200
  
@api.route('/client/signup', methods=['POST'])
def signup_client():
    client_data = request.json
    required_properties = ["username", "email", "password"]

    for prop in required_properties:
        if prop not in client_data: return jsonify({"error": f"The property '{prop}' was not properly written"}), 400 
    
    for key in required_properties:
        if client_data[key] == "": return jsonify({"error": f"The '{key}' must not be empty"}), 400 

    existing_username = Client.query.filter_by(username=client_data["username"]).first()
    if existing_username:
        return jsonify({"error": f"The username '{client_data['username']}' already exists in the database"}), 400
      
    existing_email = Client.query.filter_by(email=client_data["email"]).first()
    if existing_email:
        return jsonify({"error": f"The email '{client_data['email']}' already exists in the database"}), 400
      
    client_to_add = Client(**client_data)
    db.session.add(client_to_add)
    db.session.commit()

    return jsonify(client_to_add.serialize()), 201

# @api.route('/client/<int:client_id>', methods=['PUT'])
# def update_client(client_id):
#     client_data = request.json
#     required_properties = ["username", "email", "password"]

#     for prop in required_properties:
#         if prop not in client_data: return jsonify({"error": f"The property '{prop}' was not properly written"}), 400 
    
#     for key in required_properties:
#         if client_data[key] == "": return jsonify({"error": f"The '{key}' must not be empty"}), 400 
    
#     existing_username = Client.query.filter(Client.username == client_data["username"], Client.id != client_id).first()
#     if existing_username:
#         return jsonify({"error": f"The username '{client_data['username']}' already exists in the database"}), 400

#     existing_email = Client.query.filter(Client.email == client_data["email"], Client.id != client_id).first()
#     if existing_email:
#         return jsonify({"error": f"The email '{client_data['email']}' already exists in the database"}), 400
      
#     client = Client.query.get(client_id)
#     if client is None:
#         return jsonify({"error": f"The ID '{client_id}' was not found in Clients"}), 404

#     for prop in client_data:
#         setattr(client, prop, client_data[prop])

#     db.session.commit()
#     return jsonify(client.serialize()), 200

@api.route('/client/<int:client_id>', methods=['PUT'])
@jwt_required()
def update_client(client_id):
    try:
        # Obtener la identidad del JWT y extraer el client_id
        identity = get_jwt_identity()
        
        # Extraer el client_id del diccionario de identidad
        token_client_id = identity.get('id')

        if token_client_id is None or token_client_id != client_id:
            return jsonify({"error": "Unauthorized access"}), 403

        # Buscar el cliente en la base de datos usando el client_id
        client = Client.query.get(client_id)
        if client is None:
            return jsonify({"error": "Client not found"}), 404

        body = request.get_json()
        if body is None:
            raise APIException("Request body is missing", status_code=400)

        # Comprobar que los campos obligatorios no estén vacíos
        required_properties = ["username", "email", "password"]
        for key in required_properties:
            if not body.get(key):
                return jsonify({"error": f"The '{key}' must not be empty"}), 400 

        # Comprobar si el username ya existe en otro cliente
        existing_username = Client.query.filter(Client.username == body["username"], Client.id != client_id).first()
        if existing_username:
            return jsonify({"error": f"The username '{body['username']}' already exists in the database"}), 400

        # Comprobar si el email ya existe en otro cliente, excluyendo el actual
        existing_email = Client.query.filter(Client.email == body["email"], Client.id != client_id).first()
        if existing_email:
            return jsonify({"error": f"The email '{body['email']}' already exists in the database"}), 400

        # Actualizar campos del cliente
        client.username = body.get("username", client.username)
        client.email = body.get("email", client.email)
        client.password = body.get("password", client.password)
        client.first_name = body.get("first_name", client.first_name)
        client.last_name = body.get("last_name", client.last_name)
        client.age = body.get("age", client.age)
        client.height = body.get("height", client.height)
        client.weight = body.get("weight", client.weight)
        client.gender = body.get("gender", client.gender)
        client.physical_habits = body.get("physical_habits", client.physical_habits)
        client.client_photo_url = body.get("client_photo_url", client.client_photo_url)
        client.latitude = body.get("latitude", client.latitude)
        client.longitude = body.get("longitude", client.longitude)
        client.city = body.get("city", client.city)
        client.activity_frequency_id = body.get("activity_frequency_id", client.activity_frequency_id)

        db.session.commit()

        return jsonify({"msg": "Perfil de usuario actualizado con éxito"}), 200
    except Exception as e:
        print(f"Error actualizando el perfil: {e}")
        return jsonify({"error": str(e)}), 500
  
@api.route('/client/<int:client_id>', methods=['DELETE'])
def del_client(client_id):
    client = Client.query.get(client_id)
    if not client: return jsonify({"error": f"The ID '{client_id}' was not found in Clients"}), 404
    db.session.delete(client)
    db.session.commit()

    return jsonify({"deleted": f"Client '{client.username}' was deleted successfully"}), 200

# COACH ENDPOINTS
@api.route('/coach', methods=['GET'])
def get_coaches():
    coaches = Coach.query.all()
    coaches_list = list(map(lambda coach: coach.serialize(),coaches))

    return jsonify(coaches_list), 200

@api.route('/coach/<int:coach_id>', methods=['GET'])
def get_coach(coach_id):
    coach = Coach.query.filter_by(id=coach_id).first()
    if not coach: return jsonify({"error": f"The ID '{coach_id}' was not found in Coaches"}), 404
    return jsonify(coach.serialize()), 200

@api.route('/coach/signup', methods=['POST'])
def add_coach():
    coach_data = request.json
    required_properties = ["username", "email", "password"]

    for prop in required_properties:
        if prop not in coach_data: return jsonify({"error": f"The property '{prop}' was not properly written"}), 400 
    
    for key in required_properties:
        if coach_data[key] == "": return jsonify({"error": f"The '{key}' must not be empty"}), 400 

    existing_username = Coach.query.filter_by(username=coach_data["username"]).first()
    if existing_username:
        return jsonify({"error": f"The username '{coach_data['username']}' already exists in the database"}), 400

    existing_email = Coach.query.filter_by(email=coach_data["email"]).first()
    if existing_email:
        return jsonify({"error": f"The email '{coach_data['email']}' already exists in the database"}), 400

    coach_to_add = Coach(**coach_data)
    db.session.add(coach_to_add)
    db.session.commit()

    return jsonify(coach_to_add.serialize()), 201

@api.route('/coach/<int:coach_id>', methods=['PUT'])
@jwt_required()
def update_coach(coach_id):
    try:
        # Obtener la identidad del JWT
        identity = get_jwt_identity()
        
        # Extraer el coach_id del diccionario de identidad
        token_coach_id = identity.get('id')

        if token_coach_id is None:
            return jsonify({"error": "Coach ID not found in token"}), 400

        if token_coach_id != coach_id:
            return jsonify({"error": "Unauthorized access to this coach"}), 403

        # Buscar el coach en la base de datos usando el coach_id de la URL
        coach = Coach.query.get(coach_id)
        if coach is None:
            return jsonify({"error": "Coach not found"}), 404

        body = request.get_json()
        if body is None:
            raise APIException("Request body is missing", status_code=400)

        # Comprobar que los campos obligatorios no estén vacíos
        required_properties = ["username", "email", "password"]
        for key in required_properties:
            if not body.get(key):
                return jsonify({"error": f"The '{key}' must not be empty"}), 400 

        # Comprobar si el username ya existe en otro coach
        existing_username = Coach.query.filter(Coach.username == body["username"], Coach.id != coach_id).first()
        if existing_username:
            return jsonify({"error": f"The username '{body['username']}' already exists in the database"}), 400

        # Comprobar si el email ya existe en otro coach, excluyendo el actual
        existing_email = Coach.query.filter(Coach.email == body["email"], Coach.id != coach_id).first()
        if existing_email:
            return jsonify({"error": f"The email '{body['email']}' already exists in the database"}), 400

        # Actualizar campos del coach
        coach.username = body.get("username", coach.username)
        coach.email = body.get("email", coach.email)
        coach.password = body.get("password", coach.password)
        coach.first_name = body.get("first_name", coach.first_name)
        coach.last_name = body.get("last_name", coach.last_name)
        coach.coach_photo_url = body.get("coach_photo_url", coach.coach_photo_url)
        coach.latitude = body.get("latitude", coach.latitude)
        coach.longitude = body.get("longitude", coach.longitude)
        coach.city = body.get("city", coach.city)
        coach.education_id = body.get("education_id", coach.education_id)
        coach.experience_id = body.get("experience_id", coach.experience_id)

        db.session.commit()

        return jsonify({"msg": "Perfil de usuario actualizado con éxito"}), 200
    except Exception as e:
        print(f"Error actualizando el perfil: {e}")
        return jsonify({"error": str(e)}), 500

  
@api.route('/coach/<int:coach_id>', methods=['DELETE'])
def del_coach(coach_id):
    coach = Coach.query.get(coach_id)
    if not coach: return jsonify({"error": f"The ID '{coach_id}' was not found in Coaches"}), 404
    db.session.delete(coach)
    db.session.commit()
    
    return jsonify({"deleted": f"Coach '{coach.username}' with email '{coach.email}' was deleted successfully"}), 200

@api.route("/login", methods=["POST"])
def login():
    data = request.json
    required_properties = ["email", "password"]

    for prop in required_properties:
        if prop not in data: return jsonify({"error": f"The '{prop}' property of the user is not or is not properly written"}), 400

    coach = Coach.query.filter_by(email=data["email"]).first()
    if coach and coach.password == data["password"]:
        access_coach_token = create_access_token(identity={"id": coach.id,"email": coach.email, "role": "coach"})#añadir coach id like client
        return jsonify(access_coach_token=access_coach_token), 201

    client = Client.query.filter_by(email=data["email"]).first()
    if client and client.password == data["password"]:
        access_client_token = create_access_token(identity={"id": client.id,"email": client.email, "role": "client"})
        return jsonify(access_client_token=access_client_token), 201

    return jsonify({"error": "Bad username or password"}), 401
  
  # LIKES ENDPOINTS
@api.route('/like', methods=['GET'])
def get_likes():
    likes = Likes.query.all()
    likes_list = list(map(lambda likes: likes.serialize(),likes))

    return jsonify(likes_list), 200

@api.route('/like/<int:like_id>', methods=['GET'])
def get_like(like_id):
    like = Likes.query.filter_by(id=like_id).first()
    if not like: return jsonify({"error": f"The ID '{like_id}' was not found in Clients"}), 404
    return jsonify(like.serialize()), 200

@api.route('/client_likes/<int:client_id>', methods=['GET'])
def get_client_likes(client_id):
    given_likes = Likes.query.filter_by(client_id=client_id, source="client").all()
    received_likes = Likes.query.filter_by(client_id=client_id, source="coach").all()
    matches = Match.query.filter_by(client_id=client_id).all()

    given_like_coach_ids = [like.coach_id for like in given_likes]
    received_like_coach_ids = [like.coach_id for like in received_likes]
    match_coach_ids = [match.coach_id for match in matches]

    all_coach_ids = set(given_like_coach_ids + received_like_coach_ids + match_coach_ids)
    coaches = Coach.query.filter(Coach.id.in_(all_coach_ids)).all()
    coaches_dict = {coach.id: coach.serialize() for coach in coaches}

    given_likes_coaches_list = [coaches_dict.get(coach_id) for coach_id in given_like_coach_ids]
    received_likes_coaches_list = [coaches_dict.get(coach_id) for coach_id in received_like_coach_ids]
    matches_coaches_list = [coaches_dict.get(coach_id) for coach_id in match_coach_ids]

    no_given_likes = Coach.query.filter(Coach.id.notin_(given_like_coach_ids)).all()
    no_given_likes_list = list(map(lambda coach: coach.serialize(), no_given_likes))

    response = jsonify({
        "given_likes": given_likes_coaches_list,
        "received_likes": received_likes_coaches_list,
        "no_given_likes": no_given_likes_list,
        "matches": matches_coaches_list
    })
    return response, 200

@api.route('/coach_likes/<int:coach_id>', methods=['GET'])
def get_coach_likes(coach_id):
    given_likes = Likes.query.filter_by(coach_id=coach_id, source="coach").all()
    received_likes = Likes.query.filter_by(coach_id=coach_id, source="client").all()
    matches = Match.query.filter_by(coach_id=coach_id).all()

    given_like_client_ids = [like.client_id for like in given_likes]
    received_like_client_ids = [like.client_id for like in received_likes]
    match_client_ids = [match.client_id for match in matches]

    all_client_ids = set(given_like_client_ids + received_like_client_ids + match_client_ids)
    clients = Client.query.filter(Client.id.in_(all_client_ids)).all()
    clients_dict = {client.id: client.serialize() for client in clients}

    given_likes_clients_list = [clients_dict.get(client_id) for client_id in given_like_client_ids]
    received_likes_clients_list = [clients_dict.get(client_id) for client_id in received_like_client_ids]
    matches_clients_list = [clients_dict.get(client_id) for client_id in match_client_ids]

    no_given_likes = Client.query.filter(Client.id.notin_(given_like_client_ids)).all()
    no_given_likes_list = list(map(lambda client: client.serialize(), no_given_likes))

    response = jsonify({
        "given_likes": given_likes_clients_list,
        "received_likes": received_likes_clients_list,
        "no_given_likes": no_given_likes_list,
        "matches": matches_clients_list
    })
    return response, 200


    # GET AVAILABILITYCOACH 
@api.route('/availability_coach', methods=['GET'])
def get_availability_coach():
    all_availability_coach = AvailabilityCoach.query.all()
    results = [availability_coach.serialize() for availability_coach in all_availability_coach]
    return jsonify(results), 200

    # GET ID AVAILABILITYCOACH 
@api.route('/availability_coach/<int:coach_id>', methods=['GET'])
def get_coach_availabilities(coach_id):
    
    coach = Coach.query.get(coach_id)
    if not coach:
        return jsonify({'message': 'Coach not found'}), 404

    # Consultar las disponibilidades asociadas
    availability_coaches = AvailabilityCoach.query.filter_by(coach_id=coach_id).all()

    # Serializar las disponibilidades si existen
    availabilities = [availability_coach.serialize() for availability_coach in availability_coaches]

    # Crear la respuesta incluyendo los datos básicos del coach
    result = {
        "coach_id": coach.id,
        "coach_email": coach.email,
        "availabilities": availabilities
    }

    return jsonify(result), 200




   


    # POST AVAILABILITYCOACH 

@api.route('/availability_coach', methods=['POST'])
def create_availability_coach():
    data = request.json
    if not data:
        return jsonify({'message': 'No input data provided'}), 400

    coach_email = data.get('coach_email')
    availability_day = data.get('availability_day')
    if not coach_email or not availability_day:
        return jsonify({'message': 'Coach email and availability day must be provided'}), 400

    try:
        # Buscar el coach por correo electrónico
        coach = Coach.query.filter_by(email=coach_email).first()
        if not coach:
            return jsonify({'message': 'Coach not found'}), 404

        # Buscar la disponibilidad por día
        availability = Availability.query.filter_by(day=availability_day).first()
        if not availability:
            return jsonify({'message': 'The specified availability day does not exist'}), 404

        # Verificar si la disponibilidad ya está ocupada por el coach
        existing_entry = AvailabilityCoach.query.filter_by(coach_id=coach.id, availability_id=availability.id).first()
        if existing_entry:
            return jsonify({'message': 'The availability is already occupied by the coach'}), 400

        # Crear una nueva entrada de disponibilidad para el coach
        new_availability_coach = AvailabilityCoach(coach_id=coach.id, availability_id=availability.id)
        db.session.add(new_availability_coach)
        db.session.commit()

        return jsonify({'message': 'Availability coach entry created successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Error while creating the availability coach entry', 'error': str(e)}), 500

        #DELETE AVAILABILITYCOACH
@api.route('/availability_coach/day/<int:id>', methods=['DELETE'])
def delete_availability_coach(id):
    availability_coach = AvailabilityCoach.query.get(id)
    
    if availability_coach is None:
        return jsonify({'message': 'Availability coach entry not found'}), 404
    
    db.session.delete(availability_coach)
    db.session.commit()
    
    return jsonify({'message': 'Availability coach entry deleted successfully'}), 200



# PUT AVAILABILITYCOACH

@api.route('/availability_coach/<int:coach_id>/availability/<int:availability_coach_id>', methods=['PUT'])
def update_availability_coach_day(coach_id, availability_coach_id):
    data = request.json
    if not data:
        return jsonify({'message': 'No input data provided'}), 400

    new_day = data.get('availability_day')
    if not new_day:
        return jsonify({'message': 'New availability day not provided'}), 400

    try:
        # Verificar que la entrada de disponibilidad del coach especificada existe y pertenece al coach
        availability_coach = AvailabilityCoach.query.filter_by(id=availability_coach_id, coach_id=coach_id).first()
        if not availability_coach:
            return jsonify({'message': 'Availability coach entry not found for the given coach_id and availability_coach_id'}), 404

        # Encuentra la nueva disponibilidad por día
        new_availability = Availability.query.filter_by(day=new_day).first()
        if not new_availability:
            return jsonify({'message': f'The specified availability day {new_day} does not exist'}), 404

        # Verificar si el coach ya tiene asignada esta nueva disponibilidad (día específico)
        existing_entry = AvailabilityCoach.query.filter_by(coach_id=coach_id, availability_id=new_availability.id).first()
        if existing_entry:
            return jsonify({'message': f'The new availability {new_day} is already occupied by the coach'}), 400

        # Actualizar el availability_id de la entrada específica del coach
        availability_coach.availability_id = new_availability.id
        db.session.commit()

        return jsonify({'message': 'Availability coach entry updated successfully'}), 200

    except Exception as e:
        db.session.rollback()

        return jsonify({'message': 'Error while updating the availability coach entry', 'error': str(e)}), 500




@api.route('/like', methods=['POST'])
def add_like():
    like_data = request.json
    required_properties = ["client_id", "coach_id", "source"]

    for prop in required_properties:
        if prop not in like_data:
            return jsonify({"error": f"The '{prop}' property of the user is not or is not properly written"}), 400
        if like_data[prop] == "" or like_data[prop] == 0:
            return jsonify({"error": f"The '{prop}' must not be empty or zero"}), 400

    client = Client.query.get(like_data["client_id"])
    if client is None:
        return jsonify({"error": f"The client with id '{like_data['client_id']}' does not exist"}), 404

    coach = Coach.query.get(like_data["coach_id"])
    if coach is None:
        return jsonify({"error": f"The coach with id '{like_data['coach_id']}' does not exist"}), 404

    if like_data["source"] not in ["client", "coach"]:
        return jsonify({"error": f"The 'source' property can ONLY be 'client' or 'coach'."}), 400

    existing_like = Likes.query.filter_by(coach_id=like_data["coach_id"], client_id=like_data["client_id"], source=like_data["source"]).first()
    if existing_like:
        return jsonify({"error": f"The like with the source '{like_data['source']}' between coach '{coach.username}' and client '{client.username}' already exists in the database"}), 400
    
    like_to_add = Likes(**like_data)
    db.session.add(like_to_add)
    db.session.commit()
    
    if (like_data["source"] == "client"): 
       oposite_source =  "coach"
    else: 
        oposite_source =  "client"
    
    match_to_create = Likes.query.filter_by(coach_id=like_data["coach_id"], client_id=like_data["client_id"], source=oposite_source).first()
    if match_to_create:
        match_to_add = Match(coach_id=like_data["coach_id"], client_id=like_data["client_id"])
        db.session.add(match_to_add)
        db.session.commit()

    return jsonify(like_to_add.serialize()), 201

@api.route('/like/<int:like_id>', methods=['DELETE'])
def del_like(like_id):
    like = Likes.query.get(like_id)
    if not like: return jsonify({"error": f"The ID '{like_id}' was not found in the Likes database"}), 404

    coach = Coach.query.get(like.coach_id)
    client = Client.query.get(like.client_id)

    db.session.delete(like)
    db.session.commit()
    
    match_to_delete = Match.query.filter_by(coach_id=like.coach_id, client_id=like.client_id).first()
    if match_to_delete:
        db.session.delete(match_to_delete)
        db.session.commit()   

    if like.source == "client":
        source_entity = "client"
        source_name = client.username
        target_entity = "coach"
        target_name = coach.username
    else:
        source_entity = "coach"
        source_name = coach.username
        target_entity = "client"
        target_name = client.username

    return jsonify({"deleted": f"The like of {source_entity} '{source_name}' to {target_entity} '{target_name}' was deleted successfully"}), 200


# MATCH ENDPOINTS
@api.route('/match', methods=['GET'])
def get_matches():
    matches = Match.query.all()
    matches_list = list(map(lambda match: match.serialize(),matches))

    return jsonify(matches_list), 200
  
  
  
# Availability_client  GET ENDPOINTS
@api.route('/availability_client', methods=['GET'])
def get_availability_client():
    all_availability_client = Availability_client.query.all()
    results = list(map(lambda availability_client: availability_client.serialize(), all_availability_client))
    return jsonify(results), 200 

# Availability_client GET_ID ENDPOINTS
@api.route('/availability_client/client/<int:client_id>', methods=['GET'])
def get_client_availabilities(client_id):
    # Consultar los datos del cliente
    client = Client.query.get(client_id)
    if not client:
        return jsonify({'message': 'Client not found'}), 404

    # Consultar las disponibilidades asociadas
    availability_clients = Availability_client.query.filter_by(client_id=client_id).all()

    # Serializar las disponibilidades si existen
    availabilities = [availability_client.serialize() for availability_client in availability_clients]

    # Crear la respuesta incluyendo los datos básicos del cliente
    result = {
        "client_id": client.id,
        "client_email": client.email,
        "availabilities": availabilities
    }

    return jsonify(result), 200

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

@api.route('/availability_client/day/<int:id>', methods=['DELETE'])
def delete_availability_client(id):
    availability_client = Availability_client.query.get(id)
    
    if availability_client is None:
        return jsonify({'message': 'Availability client entry not found'}), 404
    
    db.session.delete(availability_client)
    db.session.commit()
    
    return jsonify({'message': 'Availability client entry deleted successfully'}), 200



# Availability_client PUT ENDPOINTS

@api.route('/availability_client/<int:client_id>/availability/<int:availability_client_id>', methods=['PUT'])
def update_availability_client_day(client_id, availability_client_id):
    data = request.json
    if not data:
        return jsonify({'message': 'No input data provided'}), 400

    new_day = data.get('availability_day')
    if not new_day:
        return jsonify({'message': 'New availability day not provided'}), 400

    try:
        # Verificar que la entrada de disponibilidad cliente especificada existe y pertenece al cliente
        availability_client = Availability_client.query.filter_by(id=availability_client_id, client_id=client_id).first()
        if not availability_client:
            return jsonify({'message': 'Availability client entry not found for the given client_id and availability_client_id'}), 404

        # Encuentra la nueva disponibilidad por día
        new_availability = Availability.query.filter_by(day=new_day).first()
        if not new_availability:
            return jsonify({'message': f'The specified availability day {new_day} does not exist'}), 404

        # Verificar si el cliente ya tiene asignada esta nueva disponibilidad (día específico)
        existing_entry = Availability_client.query.filter_by(client_id=client_id, availability_id=new_availability.id).first()
        if existing_entry:
            return jsonify({'message': f'The new availability {new_day} is already occupied by the client'}), 400

        # Actualizar el availability_id de la entrada específica
        availability_client.availability_id = new_availability.id
        db.session.commit()

        return jsonify({'message': 'Availability client entry updated successfully'}), 200

    except Exception as e:
        db.session.rollback()

        return jsonify({'message': 'Error while updating the availability client entry', 'error': str(e)}), 500

