
        mobiscroll.setOptions({
        locale: mobiscroll.locale['lt'],                                               // Specify language like: locale: mobiscroll.localePl or omit setting to use default
        theme: 'ios',                                                              // Specify theme like: theme: 'ios' or omit setting to use default
        themeVariant: 'light',
        dayNamesShort: ['Sekmadienis', 'Pirmadienis', 'Antradienis', 'Trečiadienis', 'Ketvirtadienis', 'Penktadienis', 'Šeštadienis'],
        actionableEvents : true

                                                          // More info about themeVariant: https://docs.mobiscroll.com/5-21-2/javascript/eventcalendar#opt-themeVariant
    });

    var slots = [{id: 1,name: "",}];


    var invalid = [{ // here add days off, holidays and other non work days
        start: '2023-02-01T00:00',
        end: '2023-02-01T23:59',
        resource: 4,
        slot: 1
    }, {
        start: '2023-01-30T00:00',
        end: '2023-01-30T23:59',
        resource: 2,
        slot: 1
    }];

        function convert_date(date_obj){
            date_converted = time_st =
              new Date((date_obj).getTime() - date_obj.getTimezoneOffset() * 60000)
              .toISOString()
              .replace(/(.*)T(.*)\..*/,'$1 $2')
                return date_converted
        }

    window_height = 600


    var calendar;
    var popup;
    var range;
    var oldShift;
    var tempShift;
    var deleteShift;
    var formatDate = mobiscroll.util.datetime.formatDate;
    var notes = document.getElementById('employee-shifts-notes');
    var form_name = document.getElementById('patient_name_form');
    var form_surname = document.getElementById('patient_surname_form');
    var form_phone_num = document.getElementById('patient_number_form');
    var form_email = document.getElementById('patient_email_form');
    var form_sms_remind = document.getElementById('sms_remind_form');
    var form_arrived = document.getElementById('arrived_form');
    var form_send_by_clinic = document.getElementById('send_by_clinic');
    var form_id_code = document.getElementById('patient_id_code_form');
    var invisible_char = '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀'
    var form_validator = false



    var deleteButton = document.getElementById('employee-shifts-delete');

    var doctors_img = 'http://localhost:5000/static/img/doctor.jpg'

    var doctors = []

    for (var i = 0;i<doctors_data.length;i++){ doctors.push(doctors_data[i])  }



    var shifts = []

    for (var i = 0;i<patients_data.length;i++){
        patients_data[i].start = new Date(patients_data[i].start)
        patients_data[i].end = new Date(patients_data[i].end)
        shifts.push(patients_data[i])

     }


    if (doctors.length >= 10 && doctors.length <= 12){  window_height = 777  }
    else if(doctors.length > 12){ window_height = 1100  }


    function createAddPopup(args) {

        deleteButton.style.display = 'none'; deleteShift = true; restoreShift = false;
        var slot = slots.find(function (s) { return s.id === tempShift.slot });


        setTimeout(() => {
             $('.mbsc-popup').css('max-height','800px')
        }, "200")


        popup.setOptions({
            headerText: '<div>Nauja rezervacija</div><div class="employee-shifts-day">' +  // More info about headerText: https://docs.mobiscroll.com/5-21-2/javascript/eventcalendar#opt-headerText
                formatDate('DDDD', new Date(tempShift.start)) + ' ' + slot.name + ',' + formatDate('DD MMMM YYYY', new Date(tempShift.start)) + '</div>',
            buttons: [                                                             // More info about buttons: https://docs.mobiscroll.com/5-21-2/javascript/eventcalendar#opt-buttons
                'cancel',
                {
                    text: 'Pridėti',
                    keyCode: 'enter',
                    handler: function () {

                    $('#form_submit_btn').click()

                    if(form_validator == true){
                        form_validator = false

                        doctor_id = tempShift.resource

                          time_st = convert_date(tempShift['start'])
                          time_en = convert_date(tempShift['end'])

                        out = {
                        name:form_name.value,
                        surname:form_surname.value,
                        number:form_phone_num.value,
                        email:form_email.value,
                        id_code: form_id_code.value,
                        sms_remind:form_sms_remind.value,
                        patient_arrived:form_arrived.value,
                        send_by_clinic:form_send_by_clinic.value,
                        notes: notes.value,
                        doc_id : doctor_id,
                        time_st : time_st,
                        time_en : time_en
                        }

                        $.ajax({
                            type: "POST",
                            url: "sheduler_add",
                            data: JSON.stringify(out),
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function(data, textStatus){


                            tempShift_title = tempShift.title.split(' ').join('➰')
                                console.log(tempShift_title)

                            tempShift.title = form_name.value+'➰'+ form_surname.value+'➰'+'|'+'➰'+tempShift_title+'➰'+invisible_char+'➰'+form_phone_num.value+'➰'+form_email.value+'➰'+
                        form_id_code.value+'➰'+'False'+'➰'+form_sms_remind.value+'➰'+form_arrived.value+'➰'+form_send_by_clinic.value+'➰'+notes.value.replaceAll(' ','_')+'➰'+data['patient_id']
                            console.log(notes.value)
                        calendar.updateEvent(tempShift);


                            console.log(data['patient_id'])


                              console.log(tempShift.title)


                                mobiscroll.snackbar({
                                    duration: 1000,
                                    message: 'Įrašas pridėtas'
                                });

                            },
                            error: function(data, textStatus) {
                                alert('Įvyko klaida!')
                            }
                        });


                        console.log('6')

                        deleteShift = false;


                        popup.close();

                        }

                    },
                    cssClass: 'mbsc-popup-button-primary'



                }
            ]
        });

        // fill popup with a new event data
        range.setOptions({ minTime: '08:00' , maxTime: '20:00' });
        range.setVal([tempShift.start, tempShift.end]);
        popup.open();
    }

 var data
 var curr_patient_id


    /////////// EDIT PATIENT DATA CLICK EVENT
    function createEditPopup(args) {
        var ev = args.event;
        var resource = doctors.find(function (r) { return r.id === ev.resource });
        var slot = slots.find(function (s) { return s.id === ev.slot });




        setTimeout(() => {
             $('.mbsc-popup').css('max-height','800px')
        }, "200")

        var patient_name = ev.title.split('➰').slice(0,2).join(' ');
        console.log(patient_name)


        data = ev.title.split('➰')

        console.log(data)

        if(data[6]==invisible_char){
            data.splice(6, 1);
        }

        form_name.value = data[0]
        form_surname.value = data[1]
        form_phone_num.value = data[6]
        form_email.value = data[7]
        form_id_code.value = data[8]
        notes.value = data[12]
        console.log(data)

        ////// notes

        if(data[13]=='None'){ notes.value='' }

        ////////// remind by sms checkbox set

        if(data[10]=='False'|| data[10]==0){
            form_sms_remind.value = 0
            if(sms_remind_form.checked){
                sms_remind_form.checked = false
            }
        }
        if(data[10]=='True'|| data[10]==1){
            form_sms_remind.value = 1
            if(!sms_remind_form.checked){
                sms_remind_form.checked = true
            }
        }
        ////////////  patient arrived chbox set

        if(data[11]=='False' || data[11]==0){
            form_arrived.value = 0
            if(form_arrived.checked){
                form_arrived.checked = false
            }
        }
        if(data[11]=='True' || data[11]==1){
            form_arrived.value = 1
            if(!form_arrived.checked){
                form_arrived.checked = true
            }
        }

        ////////////// send_by_clinic chbox set


        if(data[9]=='False' || data[9]==0){
            form_send_by_clinic.value = 0
            if(form_send_by_clinic.checked){
                form_send_by_clinic.checked = false
            }
        }
        if(data[9]=='True' || data[9]==1){
            form_send_by_clinic.value = 1
            if(!form_send_by_clinic.checked){
                form_send_by_clinic.checked = true
            }
        }




        curr_patient_id = data[13]


        /////////// redaguoti paciento duomenys

        var headerText = '<div>Redaguoti ' + patient_name + ' rezervacija</div><div class="employee-shifts-day">' +
        formatDate('DDDD', new Date(ev.start)) + ' ' + slot.name + ',' + formatDate('DD MMMM YYYY', new Date(ev.start)) + '</div>';

        deleteButton.style.display = 'block'; deleteShift = false; restoreShift = true;

         setTimeout(function () {
                var save_btn = document.querySelector('.save_btn_cl');
                    save_btn.setAttribute("type", "submit");
            }, 1000);






        // // set popup header text and buttons for editing
        popup.setOptions({
            headerText: headerText,                                                // More info about headerText: https://docs.mobiscroll.com/5-21-2/javascript/eventcalendar#opt-headerText
            buttons: [                                                             // More info about buttons: https://docs.mobiscroll.com/5-21-2/javascript/eventcalendar#opt-buttons
                'cancel',
                {
                    text: 'Išsaugoti',
                    keyCode: 'enter',
                    handler: function () {
                        console.log('5')

                        $('#form_submit_btn').click()



                    if(form_validator == true){
                        form_validator = false

                        out = {
                        name:form_name.value,
                        surname:form_surname.value,
                        id:curr_patient_id,
                        number:form_phone_num.value,
                        email:form_email.value,
                        id_code: form_id_code.value,
                        sms_remind:form_sms_remind.value,
                        patient_arrived:form_arrived.value,
                        send_by_clinic:form_send_by_clinic.value,
                        notes: notes.value,
                        time_st : convert_date(tempShift['start']),
                        time_en : convert_date(tempShift['end']) }

                        $.ajax({
                            type: "POST",
                            url: "sheduler_update",
                            data: JSON.stringify(out),
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function(data, textStatus){

                                var date = range.getVal();

                                 notes_val = notes.value
                                 notes_val = notes_val.replaceAll(' ','_')

                                calendar.updateEvent({



                                    id: ev.id,
                                    title: form_name.value+'➰'+
                                    form_surname.value+'➰'+'|'+'➰'+
                                    formatDate('HH:mm', date[0])+'➰-➰' + formatDate('HH:mm', date[1] ? date[1] : date[0])+'➰'+
                                    invisible_char+'➰'+
                                    form_phone_num.value+'➰'+
                                    form_email.value+'➰'+
                                    form_id_code.value+'➰'+
                                    form_send_by_clinic+'➰'+
                                    form_sms_remind.value+'➰'+
                                    form_arrived.value+'➰'+

                                    notes_val+'➰'+
                                    curr_patient_id,
                                    notes: notes_val,
                                    start: date[0],
                                    end: date[1] ? date[1] : date[0],
                                    resource: resource.id,
                                    color: resource.color,
                                    slot: slot.id,
                                });

                                for (var i = 0;i<shifts.length;i++){

                                if(shifts[i].id == ev.id ){
                                    var temp_shift_arr = shifts[i].title.split(' ')
                                    temp_shift_arr[10] = data[10]
                                    temp_shift_arr[11] = data[11]
                                    shifts[i].title = temp_shift_arr.join(" ");
                                }
                                }
                                restoreShift = false;

                                mobiscroll.snackbar({
                                    duration: 1000,
                                    message: 'Įrašas atnaujintas'

                                });

                                popup.close();

                            },
                            error: function(data, textStatus) {

                                alert('Įvyko klaida!')

                            }
                        });


                    }



                    },
                    cssClass: 'mbsc-popup-button-primary save_btn_cl'
                }
            ]
        });



                    console.log(data)
                  if (data[12].includes('_')){
                        mobiscroll.getInst(notes).value = data[12].replaceAll('_',' ');
                  }


        range.setOptions({ minTime: '08:00', maxTime: '20:00' });
        range.setVal([ev.start, ev.end]);

        popup.open();
        console.log('pop up open')
    }




    calendar = mobiscroll.eventcalendar('#demo-employee-shifts-calendar', {
        view: {                                                                    // More info about view: https://docs.mobiscroll.com/5-21-2/javascript/eventcalendar#opt-view
            timeline: {
                type: 'week',
                eventList: false,
                startDay: 1,
                endDay: 6
            }
        },
        height: window_height,                                                               // More info about height: https://docs.mobiscroll.com/5-21-2/javascript/eventcalendar#opt-height
        data: shifts,                                                              // More info about data: https://docs.mobiscroll.com/5-21-2/javascript/eventcalendar#opt-data
        dragToCreate: false,                                                       // More info about dragToCreate: https://docs.mobiscroll.com/5-21-2/javascript/eventcalendar#opt-dragToCreate
        dragToResize: false,                                                       // More info about dragToResize: https://docs.mobiscroll.com/5-21-2/javascript/eventcalendar#opt-dragToResize
        dragToMove: true,                                                          // More info about dragToMove: https://docs.mobiscroll.com/5-21-2/javascript/eventcalendar#opt-dragToMove
        clickToCreate: true,                                                       // More info about clickToCreate: https://docs.mobiscroll.com/5-21-2/javascript/eventcalendar#opt-clickToCreate
        resources: doctors,                                                          // More info about resources: https://docs.mobiscroll.com/5-21-2/javascript/eventcalendar#opt-resources
        invalid: invalid,                                                          // More info about invalid: https://docs.mobiscroll.com/5-21-2/javascript/eventcalendar#opt-invalid
        slots: slots,                                                              // More info about slots: https://docs.mobiscroll.com/5-21-2/javascript/eventcalendar#opt-slots
        extendDefaultEvent: function (ev) {


                                              // More info about extendDefaultEvent: https://docs.mobiscroll.com/5-21-2/javascript/eventcalendar#opt-extendDefaultEvent
            var d = ev.start;
            doctor_id = ev.resource
            var start = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 8, );
            var end = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 20);
            console.log('2')




            // clear values for new added patient
            form_name.value = ''
            form_surname.value = ''
            form_phone_num.value = ''
            form_email.value = ''
            form_sms_remind.value = 0
            form_sms_remind.checked = false
            arrived_form.checked = false
            arrived_form.value = 0
            send_by_clinic.checked = false
            send_by_clinic.value = 0
            form_id_code.value = ''
            notes.value = ''

            // priminti apie vizita pakeisti value

            return {
                title: formatDate('HH:mm', start) + ' - ' + formatDate('HH:mm', end),
                start: start,
                end: end,
                resource: ev.resource
            };
        },
        onEventCreate: function (args, inst) {                                     // More info about onEventCreate: https://docs.mobiscroll.com/5-21-2/javascript/eventcalendar#event-onEventCreate
            // store temporary event
            tempShift = args.event;
            setTimeout(function () {
                createAddPopup(args);
            }, 100);
        },
        onEventClick: function (args, inst) {                                      // More info about onEventClick: https://docs.mobiscroll.com/5-21-2/javascript/eventcalendar#event-onEventClick
            oldShift = Object.assign({}, args.event);
            tempShift = args.event;
            if (!popup.isVisible()) {
                createEditPopup(args);
            }
        },
        renderResource: function (resource) {                                      // More info about renderResource: https://docs.mobiscroll.com/5-21-2/javascript/eventcalendar#opt-renderResource
            return '<div class="employee-shifts-cont">' +
                '<div class="employee-shifts-name">' + resource.name + '</div>' +
                '<div class="employee-shifts-title">' + resource.title + '</div>' +
                '<img class="employee-shifts-avatar" src="' + resource.img + '"/>' +
                '</div>';
        },
    });

    popup = mobiscroll.popup('#demo-employee-shifts-popup', {
        display: 'bottom',                                                         // Specify display mode like: display: 'bottom' or omit setting to use default
        contentPadding: true,
        fullScreen: true,
        onClose: function () {                                                     // More info about onClose: https://docs.mobiscroll.com/5-21-2/javascript/eventcalendar#event-onClose
            if (deleteShift) {
                calendar.removeEvent(tempShift);
            } else if (restoreShift) {
                calendar.updateEvent(oldShift);
            }
        },
        responsive: {                                                              // More info about responsive: https://docs.mobiscroll.com/5-21-2/javascript/eventcalendar#opt-responsive
            medium: {

                display: 'center',                               // Specify display mode like: display: 'bottom' or omit setting to use default
                width: 600,                                           // More info about width: https://docs.mobiscroll.com/5-21-2/javascript/eventcalendar#opt-width
                fullScreen: true,
                touchUi: false,
                showOverlay: true
            }
        }
    });

    range = mobiscroll.datepicker('#demo-employee-shifts-date', {
        controls: ['time'],
        select: 'range',
        display: 'anchored',                                                       // Specify display mode like: display: 'bottom' or omit setting to use default
        showRangeLabels: false,
        touchUi: false,
        startInput: '#employee-shifts-start',
        endInput: '#employee-shifts-end',
        stepMinute: 15,
        timeWheels: '|h:mm A|',
        onChange: function (args) {
            var date = args.value;


            console.log('3')
            tempShift.start = date[0];
            tempShift.end = date[1] ? date[1] : date[0];
            tempShift.title = formatDate('HH:mm', date[0]) + ' - ' + formatDate('HH:mm', date[1] ? date[1] : date[0]);
        }
    });

    notes.addEventListener('change', function (ev) {
        tempShift.notes = ev.target.value;
    });


        $( "#confirm_delete" ).click(function() {

        // delete current event on button click
        calendar.removeEvent(tempShift);
        console.log('8')
        console.log(tempShift)

        patient_to_delete = (tempShift.title).split('➰')

        if(patient_to_delete[6]==invisible_char){
            patient_to_delete.splice(6, 1);
        }
        console.log(patient_to_delete)

        patient_id = patient_to_delete[13]

        // save a local reference to the deleted event
        var deletedShift = tempShift;


        out = {'id':patient_id}

            $.ajax({
            type: "POST",
            url: "sheduler_delete",
            data: JSON.stringify(out),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data, textStatus){

                mobiscroll.snackbar({
                    duration: 1000,
                    message: 'Įrašas ištrintas'

                });
            },
            error: function(data, textStatus) {
                 alert('Įvyko klaida!')
            }
        });

        $('#delete_modal').modal('hide');

        });


    deleteButton.addEventListener('click', function () {
        $("#delete_modal").modal();
        popup.close();
    });

$( document ).ready(function() {




var prev_btn = $("button[aria-label='Previous page']")
var next_btn = $("button[aria-label='Next page']")

next_btn.click(function(){  $("div[class='mbsc-hidden-content'] + div").css("visibility", "hidden")  })
prev_btn.click(function(){  $("div[class='mbsc-hidden-content'] + div").css("visibility", "hidden")  })


for(var q=0;q<300;q++){
    setTimeout(() => {
      $("div[class='mbsc-hidden-content'] + div").css("visibility", "hidden")
    }, "10")
}


var sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

async function trim_tral() {
     var drop_menu = document.getElementsByClassName('mbsc-font mbsc-popup-wrapper mbsc-popup-wrapper-anchored mbsc-ios mbsc-ltr mbsc-picker  mbsc-popup-pointer mbsc-popup-round');
        for (var i = 1; i < 10000; i++)
        {
                if(drop_menu.length>0){
                    var elements = $("div[class='mbsc-scrollview-scroll mbsc-ltr']")[0].children
                    for (let j = 0; j < elements.length; j++)
                    {  if(elements[j].children[0].children[0] !== undefined) {  elements[j].children[0].children[0].innerHTML = "" } }
                    drop_menu = document.getElementsByClassName('mbsc-font mbsc-popup-wrapper mbsc-popup-wrapper-anchored mbsc-ios mbsc-ltr mbsc-picker  mbsc-popup-pointer mbsc-popup-round')
                }
                else{ return }
                await sleep(200)
           }
       }


$(".demo-employee-shifts").dblclick(async function(){   $("div[class='mbsc-hidden-content'] + div").css("visibility", "hidden")  });


$('#employee-shifts-start').click(function(){
    $("div[class='mbsc-hidden-content'] + div").css("visibility", "hidden")
    trim_tral()
})


$('#employee-shifts-end').click(function(){
    $("div[class='mbsc-hidden-content'] + div").css("visibility", "hidden")
    trim_tral()
})


$('#sms_remind_form').click(function(){
    if(form_sms_remind.value == 0){ form_sms_remind.value = 1 }
    else{ form_sms_remind.value = 0  }
})

$('#arrived_form').click(function(){
    if(form_arrived.value == 0){ form_arrived.value = 1 }
    else{ form_arrived.value = 0  }
})

$('#send_by_clinic').click(function(){
    if(form_send_by_clinic.value == 0){ form_send_by_clinic.value = 1 }
    else{ form_send_by_clinic.value = 0  }
})


 $("#form").on('submit', function(e){
            e.preventDefault();

            var form = $(this);

            console.log('validating')

            form.parsley().validate();

            if (form.parsley().isValid()){
                form_validator = true
            }
        });






});
