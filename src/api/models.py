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
    day = db.Column(db.String(120), unique=True, nullable=False)
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
    kind = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.String(180), unique=False, nullable=True)

    def __repr__(self):
        return f'<Goals {self.kind}>'
    def serialize(self):
        return {
            "id": self.id,
            "kind": self.kind,
            "description": self.description
          }
      
class Diseases(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    kind = db.Column(db.String(120), unique=True, nullable=False)
    sintoms = db.Column(db.String(80), unique=False, nullable=False)
    
    def __repr__(self):
        return f'<Diseases {self.kind}>'
    def serialize(self):
        return {
            "id": self.id,
            "kind": self.kind,
            "sintoms": self.sintoms
        }    
    
class Experience(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    time = db.Column(db.String(120), unique=True, nullable=False)
    
    def __repr__(self):
        return f'<Experience {self.time}>'
    def serialize(self):
        return {
            "id": self.id,
            "time": self.time,
        }  


#MODELO DE CLIENT PARA PRUEBAS(MODIFICAR LUEGO DANI) 
class Client(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    first_name = db.Column(db.String(120), unique=False, nullable=True)
    last_name = db.Column(db.String(120), unique=False, nullable=True)
    age = db.Column(db.Integer, unique=False, nullable=True)
    height = db.Column(db.Integer, unique=False, nullable=True)
    weight = db.Column(db.Integer, unique=False, nullable=True)
    gender = db.Column(db.String(120), unique=False, nullable=True)
    # Cambiar a valor unique = True de momento dejarlo así
    physical_habits = db.Column(db.String(120), unique=False, nullable=True)
    # Cambiar a valor unique true como el anterior
    activity_frequency_id = db.Column(db.Integer, db.ForeignKey('activity_frequency.id'))
    activity_frequency = db.relationship('ActivityFrequency') 
    
    def __repr__(self):
        return f'<Client {self.email}>'  
    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "age": self.age,
            "height": self.height,
            "weight": self.weight,
            "gender": self.gender,
            "physical_habits": self.physical_habits,
            "activity_frequency_id": self.activity_frequency_id,
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

class Education(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rank = db.Column(db.String(120), unique=False, nullable=False)

    def __repr__(self):
        return f'<Education {self.rank}>'
    def serialize(self):
        return {
            "id": self.id,
            "rank": self.rank,
        } 

class ActivityFrequency(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    mode = db.Column(db.String(120), unique=True)

    def __repr__(self):
        return f'<ActivityFrequency {self.mode}>'  
    def serialize(self):
        return {
            "id": self.id,
            "mode": self.mode,
          }
    
class Coach(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    first_name = db.Column(db.String(120), unique=False, nullable=True)
    last_name = db.Column(db.String(120), unique=False, nullable=True)
    education_id = db.Column(db.Integer, db.ForeignKey('education.id'), nullable=True)
    experience_id = db.Column(db.Integer, db.ForeignKey('experience.id'), nullable=True)
    education = db.relationship(Education)
    experience = db.relationship(Experience)
    
    def __repr__(self):
        return f"<Coach {self.id}>"
    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "education_id": self.education_id,
            "experience_id": self.experience_id
            # do not serialize the password, its a security breach
        }
      
class Likes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    source = db.Column(db.String(120), unique=False, nullable=True)
    client_id = db.Column(db.Integer, db.ForeignKey('client.id'))
    coach_id = db.Column(db.Integer, db.ForeignKey('coach.id'))
    client = db.relationship(Client)
    coach = db.relationship(Coach)
    
    def __repr__(self):
        return f"<Likes {self.id}>"
    def serialize(self):
        return {
            "id": self.id,
            "source": self.source,
            "client_id": self.client_id,
            "coach_id": self.coach_id
        }
    
class Match(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    coach_id = db.Column(db.Integer, db.ForeignKey('coach.id'))
    client_id = db.Column(db.Integer, db.ForeignKey('client.id'))
    coach = db.relationship(Coach)
    client = db.relationship(Client)
    
    def __repr__(self):
        return f"<Match {self.id}>"
    def serialize(self):
        return {
            "id": self.id,
            "coach_id": self.coach_id,
            "client_id": self.client_id
        }