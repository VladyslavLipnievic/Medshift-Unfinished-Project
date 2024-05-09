
from app import app, db
from flask import render_template, json, request
from app.models import Patients, Doctors, Holidays
from datetime import datetime

invisible_char = '⠀'

@app.route('/sheduler_add', methods=['POST'])
def sheduler_add():
    data = request.json

    time_st = data['time_st']
    time_en = data['time_en']

    if data['sms_remind'] == '1': data['sms_remind'] = True
    else: data['sms_remind'] = False

    if data['patient_arrived'] == '1': data['patient_arrived'] = True
    else : data['patient_arrived'] = False

    if data['send_by_clinic'] == '1': data['send_by_clinic'] = True
    else : data['send_by_clinic'] = False

    new_patient = Patients(name=data['name'],surname=data['surname'], visit_time_start=time_st,
                           visit_time_end=time_en, number=data['number'], mail=data['email'],
                           id_code=data['id_code'],doctor_id=data['doc_id'], send_by_clinic=data['send_by_clinic'],
                           send_remind_sms=data['sms_remind'], arrived=data['patient_arrived'], notes=data['notes'])
    db.session.add(new_patient)
    db.session.commit()

    return {'patient_id':new_patient.id},200

@app.route('/sheduler_update', methods=['POST'])
def sheduler_update():
    data = request.json

    time_st = data['time_st']
    time_en = data['time_en']

    if data['sms_remind'] == '1':
        data['sms_remind'] = True
    else:
        data['sms_remind'] = False

    if data['patient_arrived'] == '1':
        data['patient_arrived'] = True
    else:
        data['patient_arrived'] = False

    if data['send_by_clinic'] == '1':
        data['send_by_clinic'] = True
    else:
        data['send_by_clinic'] = False

    Patients.query.filter_by(id=data['id']).update({
        'name' : data['name'],'surname':data['surname'], 'visit_time_start' : time_st,
        'visit_time_end' : time_en, 'number' : data['number'], 'mail' : data['email'],
        'id_code' : data['id_code'], 'send_by_clinic' : data['send_by_clinic'],
        'send_remind_sms' : data['sms_remind'], 'arrived' : data['patient_arrived'], 'notes': data['notes']
    })
    db.session.commit()
    out = {'x':'x'}
    return out,200

@app.route('/sheduler_delete', methods=['POST'])
def sheduler_delete():
    data = request.json
    Patients.query.filter_by(id=data['id']).delete()
    db.session.commit()
    return {'x':'deleted'},200
