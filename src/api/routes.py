"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import Diseases, db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# ENDPOINT GET DISEASES
@api.route('/diseases', methods=['GET'])
def get_diseases():
    all_diseases=Diseases.query.all()
    results = list(map(lambda diseases: diseases.serialize(), all_diseases))
    return jsonify(results), 200

# ENDPOINT POST DISEASES
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


        #ENDPOINT DE PUT  DISEASES  

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
    

      #ENDPOINT DE BUSQUEDA POR ID  
@api.route('/diseases/<int:diseases_id>', methods=['GET'])
def get_diseaseid(diseases_id):
    disease = Diseases.query.filter_by(id=diseases_id).first()
    if disease is None:
        return jsonify({'message': 'Disease not found'}), 404
    return jsonify(disease.serialize()), 200
    