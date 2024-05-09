#from flask import Flask
#from marshmallow import Schema, fields, pre_load, validate, ValidationError
#from flask_marshmallow import Marshmallow
#from flask_sqlalchemy import SQLAlchemy
#ma = Marshmallow()
#db = SQLAlchemy()
from app import db

class Settings(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    Patients_data_age = db.Column(db.Integer,  nullable=True)
    rows_per_page = db.Column(db.Integer,  nullable=True)

class Patients(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    doctor_id = db.Column(db.Integer,  nullable=True)
    name = db.Column(db.String(50), nullable=True)
    surname = db.Column(db.String(50), nullable=True)
    visit_time_start = db.Column(db.DateTime(timezone=True), nullable=True)
    visit_time_end = db.Column(db.DateTime(timezone=True), nullable=True)
    number = db.Column(db.String(20), nullable=True)
    mail = db.Column(db.String(50), nullable=True)
    id_code = db.Column(db.String(20), nullable=True) # asm kodas
    send_remind_sms = db.Column(db.Boolean, nullable=True)
    arrived = db.Column(db.Boolean, nullable=True)
    send_by_clinic = db.Column(db.Boolean, nullable=True)
    notes = db.Column(db.String(1000), nullable=True)

class Doctors(db.Model):
   id = db.Column(db.Integer, primary_key=True)
   name = db.Column(db.String(40), nullable=True, unique=True)
   profession = db.Column(db.String(40), nullable=True)
   time_for_patient = db.Column(db.String(4), nullable=True)
   work_time = db.Column(db.Integer, nullable=True)
   number = db.Column(db.String(15), nullable=True)
   mail = db.Column(db.String(50), nullable=True)
   mon_start = db.Column(db.String(6), nullable=True)
   mon_end = db.Column(db.String(6), nullable=True)
   tue_start = db.Column(db.String(6), nullable=True)
   tue_end = db.Column(db.String(6), nullable=True)
   wed_start = db.Column(db.String(6), nullable=True)
   wed_end = db.Column(db.String(6), nullable=True)
   thu_start = db.Column(db.String(6), nullable=True)
   thu_end = db.Column(db.String(6), nullable=True)
   fri_start = db.Column(db.String(6), nullable=True)
   fri_end = db.Column(db.String(6), nullable=True)
   sat_start = db.Column(db.String(6), nullable=True)
   sat_end = db.Column(db.String(6), nullable=True)
   sun_start = db.Column(db.String(6), nullable=True)
   sun_end = db.Column(db.String(6), nullable=True)


class Holidays(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    doctor_id = db.Column(db.Integer,  nullable=False)
    start = db.Column(db.DateTime(timezone=True), nullable=True)
    end = db.Column(db.DateTime(timezone=True), nullable=True)

