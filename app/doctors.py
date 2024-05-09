
from app import app, db
from flask import render_template, json, request
from app.models import Doctors
from datetime import datetime
from sqlalchemy import exc



@app.route('/doctors_update', methods=['POST'])
def doctors_update():
    data = request.json

    Doctors.query.filter_by(id=data['id']).update({
        'name': data['name'],'mail': data['email'],'profession': data['profession'],'number': data['number'],'time_for_patient':data['time_for_patient'],
        'mon_start' : data['time_start'][0], 'mon_end' : data['time_end'][0],'tue_start' : data['time_start'][1], 'tue_end' : data['time_end'][1],
        'wed_start': data['time_start'][2], 'wed_end': data['time_end'][2], 'thu_start': data['time_start'][3],'thu_end': data['time_end'][3],
        'fri_start': data['time_start'][4], 'fri_end': data['time_end'][4], 'sat_start': data['time_start'][5],'sat_end': data['time_end'][5],
        'sun_start': data['time_start'][6],'sun_end': data['time_end'][6]
    })
    db.session.commit()

    return {'status':'success'},200


@app.route('/doctors_delete', methods=['POST'])
def doctors_delete():
    data = request.json
    print(data)


    for id in data['id']:
        Doctors.query.filter_by(id=id).delete()
    # else:
    #     Doctors.query.filter_by(id=data['id']).delete()

    db.session.commit()
    return {'status':'success'},200


@app.route('/doctors_new_add', methods=['POST'])
def doctors_new_add():
    data = request.json
    try:

        start_date_updated = []
        end_date_updated = []
        for index, dat in enumerate(data['time_start']):
            if dat == '':
                start_date_updated.append(None)
                end_date_updated.append(None)
            else:
                start_date_updated.append(dat)
                end_date_updated.append(data['time_end'][index])

        new_doctor = Doctors(name=data['name'], mail=data['email'], profession=data['profession'],
                             number=data['number'],time_for_patient=data['time_for_patient'],
                                         mon_start=start_date_updated[0], mon_end=end_date_updated[0],
                                         tue_start=start_date_updated[1], tue_end=end_date_updated[1],
                                         wed_start=start_date_updated[2], wed_end=end_date_updated[2],
                                         thu_start=start_date_updated[3], thu_end=end_date_updated[3],
                                         fri_start=start_date_updated[4], fri_end=end_date_updated[4],
                                         sat_start=start_date_updated[5], sat_end=end_date_updated[5],
                                         sun_start=start_date_updated[6], sun_end=end_date_updated[6])

        db.session.add(new_doctor)
        db.session.commit()

    except exc.IntegrityError as e:
        print(e)
        db.session.rollback()
        out = {'exist':'true'}
        return out,200

    return {'doctor_id':new_doctor.id},200