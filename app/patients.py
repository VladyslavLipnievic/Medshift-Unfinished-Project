
from app import app, db
from flask import render_template, json, request, redirect, url_for
from app.models import Patients, Doctors, Holidays
from datetime import datetime
from sqlalchemy import exc



@app.route('/edit/<int:id>', methods=['GET', 'POST'])
def edit_patient(id):
    patient = Patients.query.get_or_404(id)
    if request.method == 'POST':
        patient.assigned_doctor = request.form['assigned_doctor']
        patient.patient_name = request.form['patient_name']
        patient.visit_time_start = request.form['visit_time_start']
        patient.visit_time_end = request.form['visit_time_end']
        patient.number = request.form['number']
        patient.mail = request.form['mail']
        patient.send_by_clinic = bool(request.form.get('send_by_clinic'))
        patient.send_sms_remind = bool(request.form.get('send_sms_remind'))
        patient.arrived = bool(request.form.get('arrived'))
        patient.notes = request.form['notes']

        db.session.commit()
        return redirect(url_for('index'))
    return render_template('edit_patient.html', patient=patient)


@app.route('/patients_delete', methods=['POST'])
def patients_delete():
    data = request.json


    for id in data['id']:
        Patients.query.filter_by(id=id).delete()

    db.session.commit()
    return {'status':'success'},200
'''out = {
            name:new_patient_name,
            email:new_patient_email,
            id_code:new_patient_code,
            number:new_doctor_number,
            doctor_id : 1 // todo dynamically parse doctor id from drop down list
          }'''


'''    id = db.Column(db.Integer, primary_key=True)
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
    notes = db.Column(db.String(1000), nullable=True)'''

@app.route('/patient_new_add', methods=['POST'])
def patient_new_add():
    data = request.json
    try:
        new_patient = Patients(name=data['name'], mail=data['email'], id_code=data['id_code'],
                             number=data['number'], doctor_id=data['doctor_id'],surname=data['surname'])

        db.session.add(new_patient)
        db.session.commit()

    except exc.IntegrityError as e:
        print(e)
        db.session.rollback()
        out = {'exist': 'true'}
        return out, 200

    return {'patient_id': new_patient.id}, 200