
from app import app, db
from flask import render_template, json
from app.models import Patients, Doctors, Holidays
from datetime import datetime
@app.route('/', methods=['GET'])
def sheduler():
    doctors_data = Doctors.query.all()
    invisible_char = '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀'
    doctors_obj = []
    if doctors_data == '[]':
        doctors_obj = [{"id": '0', "name": 'Nėra pridėtų gydytojų', "color": 'white', "title": '',"img": "http://localhost:5000/static/img/doctor.jpg"}]
    else:
        colors = ['red', 'blue', 'orange', 'purple', 'green', 'grey', 'brown']*100
        for index, doc in enumerate(doctors_data):
            print(doc.id)
            doctors_obj.append({ "id":doc.id, "name":doc.name, "color": colors[index], "title":doc.profession, "img": "http://localhost:5000/static/img/doctor.jpg"})

        patients_data = Patients.query.all() ######## in future oldest data should be set manually by user in program settings, eg show oldest data week before etc #####################################################
        patients_obj = []


        for index, pat in enumerate(patients_data):


            st = str(pat.visit_time_start)[11:-9]
            en = str(pat.visit_time_end)[11:-9]
            st_js = (str(pat.visit_time_start)[:-9]).replace(' ', 'T')
            en_js = (str(pat.visit_time_end)[:-9]).replace(' ', 'T')
            title = pat.name+'➰'+pat.surname+'➰|➰'+ st + '➰-➰' + en + invisible_char +'➰'+ str(pat.number)+'➰'+str(pat.mail)+'➰'+str(pat.id_code)+\
            '➰'+str(pat.send_by_clinic)+'➰'+str(pat.send_remind_sms)+'➰'+str(pat.arrived)+'➰'+str(pat.notes).replace(' ','_')+'➰'+str(pat.id)

            patients_obj.append({ "start":st_js, "end":en_js, "title": title, "resource":pat.doctor_id, "slot": 1})

    return render_template('sheduler.html', doctors_data=doctors_obj, patients_data=patients_obj)



@app.route('/doctors', methods=['GET'])
def doctors():
    doctors_data = Doctors.query.all()


    id=[];name=[];profession=[];time_for_patient=[];number=[];mail=[];work_time=[]

    mon_start=[];mon_end=[];tue_start=[];tue_end=[];wed_start=[];wed_end=[];thu_start=[];thu_end=[];fri_start=[];fri_end=[];sat_start=[];sat_end=[];sun_start=[];sun_end=[]

    if doctors_data == '[]':

        return render_template('doctors.html',id=0, doctor_counter = 0)

    darbo_dienos = 'Pir','Ant','Tre','Ket','Pen','Šeš','Sek'

    doctor_counter = len(doctors_data)

    for index,doc in enumerate(doctors_data):
        id.append(doc.id)
        name.append(doc.name)
        profession.append(doc.profession)
        work_time.append(doc.work_time)
        time_for_patient.append(doc.time_for_patient)
        number.append(doc.number)
        mail.append(doc.mail)



        if doc.mon_start != None and doc.mon_start != '':
            mon_start.append(darbo_dienos[0] + '(' + str(doc.mon_start) + '-')
            mon_end.append(str(doc.mon_end) + ') ')
        else:
            mon_start.append('')
            mon_end.append('')

        if doc.tue_start != None and doc.tue_start != '':
            tue_start.append(darbo_dienos[1] + '(' + str(doc.tue_start) + '-')
            tue_end.append(str(doc.tue_end) + ') ')
        else:
            tue_start.append('')
            tue_end.append('')

        print("doc.wed_start")
        print(doc.wed_start)

        if doc.wed_start != None and doc.wed_start != '':
            wed_start.append(darbo_dienos[2] + '(' + str(doc.wed_start) + '-')
            wed_end.append(str(doc.wed_end) + ') ')
        else:
            wed_start.append('')
            wed_end.append('')

        if doc.thu_start != None and doc.thu_start != '':
            thu_start.append(darbo_dienos[3] + '(' + str(doc.thu_start) + '-')
            thu_end.append(str(doc.thu_end) + ') ')
        else:
            thu_start.append('')
            thu_end.append('')

        if doc.fri_start != None and doc.fri_start != '':
            fri_start.append(darbo_dienos[4] + '(' + str(doc.fri_start) + '-')
            fri_end.append(str(doc.fri_end) + ') ')
        else:
            fri_start.append('')
            fri_end.append('')

        if doc.sat_start != None and doc.sat_start != '':
            sat_start.append(darbo_dienos[5] + '(' + str(doc.sat_start) + '-')
            sat_end.append(str(doc.sat_end) + ') ')
        else:
            sat_start.append('')
            sat_end.append('')

        if doc.sun_start != None and doc.sun_start != '':
            sun_start.append(darbo_dienos[6] + '(' + str(doc.sun_start) + '-')
            sun_end.append(str(doc.sun_end) + ') ')
        else:
            sun_start.append('')
            sun_end.append('')


    return render_template('doctors.html',id=id,name=name,profession=profession,time_for_patient=time_for_patient,number=number,mail=mail,mon_start=mon_start,
                           tue_start=tue_start,wed_start=wed_start,thu_start=thu_start,fri_start=fri_start,sat_start=sat_start,sun_start=sun_start,
                           mon_end=mon_end,tue_end=tue_end,wed_end=wed_end,thu_end=thu_end,fri_end=fri_end,
                           sat_end=sat_end,sun_end=sun_end,doctor_counter=doctor_counter
                           )



@app.route('/patients', methods=['GET', 'POST'])
def patients():
    patients = Patients.query.all()
    doctors = Doctors.query.all()

    id = [];doctor_id = [];name = [];surname = []; number = []; mail = []; id_code = []; doctor_name = []
    docIds = []; docNames = []


    for i, el in enumerate(doctors):
        docIds.append(el.id)
        docNames.append(el.name)

    print(docIds)
    print(docNames)


    for pat in patients:
        id.append(pat.id)
        name.append(pat.name)
        surname.append(pat.surname)
        number.append(pat.number)
        id_code.append(pat.id_code)
        mail.append(pat.mail)
        doctor_id.append(pat.doctor_id)
        for doc in doctors:
            if pat.doctor_id == doc.id:
                doctor_name.append(doc.name)





    return render_template('patients.html', id=id, name=name,doctor_id=doctor_id,
                           number=number, mail=mail, id_code =id_code, surname=surname, doctor_name = doctor_name,
                           docNames=docNames, docIds=docIds
                           )

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