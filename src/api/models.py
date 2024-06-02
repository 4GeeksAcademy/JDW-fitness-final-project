from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    
class Availability(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    day = db.Column(db.String(120), unique=False, nullable=False)
    hour = db.Column(db.String(80), unique=False, nullable=False)

    def __repr__(self):
        return f'<Availability {self.day}>'
          
    def serialize(self):
        return {
            "id": self.id,            
            "day": self.day,
            "hour": self.hour, 
        }
      
class Goals(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    kind = db.Column(db.String(120), unique=False, nullable=False)
    description = db.Column(db.String(180), unique=False, nullable=True)

    def __repr__(self):
        return f'<Goals {self.kind}>'
      
    def serialize(self):
        return {
            "id": self.id,
            "kind": self.kind,
            "description": self.description
          }

#MODELO DE CLIENT PARA PRUEBAS(MODIFICAR LUEGO DANI) 
class Client(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=False, nullable=False)
    password = db.Column(db.String(180), unique=False, nullable=True)
   
   
    def __repr__(self):
        return f'<Client {self.email}>'
          
    def serialize(self):
        return {
            "email": self.email,            
            "password": self.password,
            
        }

class Availability_client(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    availability_id = db.Column(db.Integer, db.ForeignKey('availability.id'), nullable=False)
    client_id = db.Column(db.Integer, db.ForeignKey('client.id'), nullable=False)

    availability = db.relationship('Availability', backref=db.backref('availability_clients', lazy=True))
    client = db.relationship('Client', backref=db.backref('availability_clients', lazy=True))

    def repr(self):
        return f'<AvailabilityClient {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "client_email": self.client.email if self.client else None,
            "availability_day": self.availability.day if self.availability else None
        }




       