"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Availability, Goals, Diseases, Experience, Education
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

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
