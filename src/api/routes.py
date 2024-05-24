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

# ENDPOINT GET DISEASES
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