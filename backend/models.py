from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

class Board(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ssid = db.Column(db.String(100), nullable=False)
    url = db.Column(db.String(100), nullable=False)

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nationalityId = db.Column(db.String(100), nullable=False)
    firstName = db.Column(db.String(100), nullable=False)
    lastName = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)

class UsersBoards(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    boardId = db.Column(db.Integer, nullable=False)
    userId = db.Column(db.Integer, nullable=False)
    clearenceLevel = db.Column(db.Integer, nullable=False)  # 0-admin/developer, 1-manager, 2-userAdmin, 3-user, 4-visitor


