
$(document).ready(function(){

mon_start = trim_days_starts(mon_start)
mon_end = trim_days_ends(mon_end)

tue_start = trim_days_starts(tue_start)
tue_end = trim_days_ends(tue_end)

wed_start = trim_days_starts(wed_start)
wed_end = trim_days_ends(wed_end)

thu_start = trim_days_starts(thu_start)
thu_end = trim_days_ends(thu_end)

fri_start = trim_days_starts(fri_start)
fri_end = trim_days_ends(fri_end)

sat_start = trim_days_starts(sat_start)
sat_end = trim_days_ends(sat_end)

sun_start = trim_days_starts(sun_start)
sun_end = trim_days_ends(sun_end)




var string_for_doc_graph = ''

	// Activate tooltip
	$('[data-toggle="tooltip"]').tooltip();



	// Select/Deselect checkboxes
	var checkbox = $('table tbody input[type="checkbox"]');


	$("#selectAll").click(function(){
		if(this.checked){
			checkbox.each(function(){
				this.checked = true;
			});
		} else{
			checkbox.each(function(){
				this.checked = false;
			});
		}
	});


	checkbox.click(function(){
		if(!this.checked){
			$("#selectAll").prop("checked", false);
		}
	});


function trim_days_starts(day_start) {
    if (day_start.length>0){
    for(var i=0;i<day_start.length;i++)
        day_start[i] = day_start[i].slice(4,-1);
    }else{
        day_start = ''
    }
    return day_start
}

function trim_days_ends(day_end) {
    if (day_end.length>0){
        for(var i=0;i<day_end.length;i++)
            day_end[i] = day_end[i].slice(0,-2);
        }else{
            day_end = ''
        }
        return day_end
}




var edit_buttons = document.querySelectorAll('a.crud_edit')
var delete_buttons = document.querySelectorAll('a.crud_delete')
var loop_index

function edit_modal_update() {
for (var i = 0; i < edit_buttons.length; i++) {
    edit_buttons[i].addEventListener('click', function(event) {
        id = this.name.replace('edit_','')

        $("#name_surname").val ( $("#n"+id)[0].innerText )
        $("#email").val ( $("#e"+id)[0].innerText )
        $("#profession").val ( $("#p"+id)[0].innerText )
        $("#number").val ( $("#nm"+id)[0].innerText )
        $("#time_for_patient_edit").val ( $("#l"+id)[0].innerText )

        loop_index = $("#g"+id).attr('name')

        $(".mon_start_edit ").val (mon_start[loop_index])
        $(".mon_end_edit ").val (mon_end[loop_index])

        $(".tue_start_edit ").val (tue_start[loop_index])
        $(".tue_end_edit ").val (tue_end[loop_index])

        $(".wed_start_edit ").val (wed_start[loop_index])
        $(".wed_end_edit ").val (wed_end[loop_index])

        $(".thu_start_edit ").val (thu_start[loop_index])
        $(".thu_end_edit ").val (thu_end[loop_index])

        $(".fri_start_edit ").val (fri_start[loop_index])
        $(".fri_end_edit ").val (fri_end[loop_index])

        $(".sat_start_edit ").val (sat_start[loop_index])
        $(".sat_end_edit ").val (sat_end[loop_index])

        $(".sun_start_edit ").val (sun_start[loop_index])
        $(".sun_end_edit ").val (sun_end[loop_index])


        $("#save_btn_modal").attr("name",id);
        $("#save_btn_modal").attr("counter",loop_index);

    });
}

}

function delete_modal_update() {

for (var i = 0; i < delete_buttons.length; i++) {
    delete_buttons[i].addEventListener('click', function(event) {
        id = this.name.replace('delete_','')
        $("#delete_btn_modal").attr("name",id)
    });
}

}

edit_modal_update()
delete_modal_update()


 $("#form_delete").on('submit', function(e){
    e.preventDefault();

        var id = document.getElementById('delete_btn_modal').name

        out = { id:id }

        $.ajax({
                    type: "GET",
                    url: "doctors_delete",
                    data: JSON.stringify(out),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(data, textStatus){

//                    console.log(mon_start); console.log(mon_end); console.log(tue_start); console.log(tue_end); console.log(wed_start); console.log(wed_end); console.log(thu_start);
//                    console.log(thu_end); console.log(fri_start); console.log(fri_end); console.log(sat_start); console.log(sat_end); console.log(sun_start); console.log(sun_end);

                    index_to_delete = $("#g"+id).attr('name')

                    delete_from_local_arr(index_to_delete)

//                    console.log(mon_start); console.log(mon_end); console.log(tue_start); console.log(tue_end); console.log(wed_start); console.log(wed_end); console.log(thu_start);
//                    console.log(thu_end); console.log(fri_start); console.log(fri_end); console.log(sat_start); console.log(sat_end); console.log(sun_start); console.log(sun_end);

                        var obj_to_delete = document.getElementById('tr'+id)
                        obj_to_delete.remove()

                    },
                    error: function(data, textStatus) {
                        alert('Įvyko klaida!')
                    }
                });

                $('#deleteEmployeeModal').modal('hide');

 })




function delete_from_local_arr(index_to_delete) {
    mon_start.splice(index_to_delete,1)
    mon_end.splice(index_to_delete,1)

    tue_start.splice(index_to_delete,1)
    tue_end.splice(index_to_delete,1)

    wed_start.splice(index_to_delete,1)
    wed_end.splice(index_to_delete,1)

    thu_start.splice(index_to_delete,1)
    thu_end.splice(index_to_delete,1)

    fri_start.splice(index_to_delete,1)
    fri_end.splice(index_to_delete,1)

    sat_start.splice(index_to_delete,1)
    sat_end.splice(index_to_delete,1)

    sun_start.splice(index_to_delete,1)
    sun_end.splice(index_to_delete,1)

}





var checkbox_doctors_ids = []

$("#delete_checked").click(function(){

        checkbox_doctors_ids = []

       var all_checkboxes = document.querySelectorAll('input[type="checkbox"]')
             for(var i=0;i<all_checkboxes.length;i++){
                 if(all_checkboxes[i].checked){

                    checkbox_doctors_ids.push(all_checkboxes[i].id.replace('checkbox',''))
                 }
        }

        if(checkbox_doctors_ids.length>0){
            $('#deleteEmployeeModal_checkbox').modal('show');
        }else{
            alert('Pažymėkite bent vieną lauką')
        }



});





 $("#form_delete_checked").on('submit', function(e){


            e.preventDefault();

            out = { id:checkbox_doctors_ids }

            $.ajax({
                    type: "POST",
                    url: "doctors_delete",
                    data: JSON.stringify(out),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(data, textStatus){

                     var indexes_to_delete = []
                     if(checkbox_doctors_ids.length>1){
                        for(var i=0;i<checkbox_doctors_ids.length;i++){
                            var el = $("#g"+checkbox_doctors_ids[i]).attr('name')
                            indexes_to_delete.push(el)
                        }

                        indexes_to_delete.sort(function(a, b){return b-a});

                     }

                        if(checkbox_doctors_ids.length>0){
                            for(var i=0;i<checkbox_doctors_ids.length;i++){

//                    console.log(mon_start); console.log(mon_end); console.log(tue_start); console.log(tue_end); console.log(wed_start); console.log(wed_end); console.log(thu_start);
//                    console.log(thu_end); console.log(fri_start); console.log(fri_end); console.log(sat_start); console.log(sat_end); console.log(sun_start); console.log(sun_end);
                        delete_from_local_arr(indexes_to_delete[i])
//                    console.log(mon_start); console.log(mon_end); console.log(tue_start); console.log(tue_end); console.log(wed_start); console.log(wed_end); console.log(thu_start);
//                    console.log(thu_end); console.log(fri_start); console.log(fri_end); console.log(sat_start); console.log(sat_end); console.log(sun_start); console.log(sun_end);

                                var obj_to_delete = document.getElementById('tr'+checkbox_doctors_ids[i])
                                obj_to_delete.remove()
                            }
                            for(var i=0;i<checkbox_doctors_ids.length;i++){
                                checkbox_doctors_ids.splice(i,1);
                            }
                        }

                    },
                    error: function(data, textStatus) {
                        alert('Įvyko klaida!')
                    }
                });

                 $('#deleteEmployeeModal_checkbox').modal('hide');
        });




function update_short_work_graph(i,timepicker_time_start_value,timepicker_time_end_value){
      if(i == 0){
            string_for_doc_graph += 'Pir('+timepicker_time_start_value+'-'+timepicker_time_end_value+') '
      }
      if(i == 1){
            string_for_doc_graph += 'Ant('+timepicker_time_start_value+'-'+timepicker_time_end_value+') '
      }
      if(i == 2){
            string_for_doc_graph += 'Tre('+timepicker_time_start_value+'-'+timepicker_time_end_value+') '
      }
      if(i == 3){
            string_for_doc_graph += 'Ket('+timepicker_time_start_value+'-'+timepicker_time_end_value+') '
      }
      if(i == 4){
            string_for_doc_graph += 'Pen('+timepicker_time_start_value+'-'+timepicker_time_end_value+') '
      }
      if(i == 5){
            string_for_doc_graph += 'Šeš('+timepicker_time_start_value+'-'+timepicker_time_end_value+') '
      }
      if(i == 6){
            string_for_doc_graph += 'Sek('+timepicker_time_start_value+'-'+timepicker_time_end_value+') '
      }
}

 $("#form_save").on('submit', function(e){
            e.preventDefault();

            var form = $(this);

            form.parsley().validate();

            if (!form.parsley().isValid()){
                console.log('not valid')
                return}






           var name_val = document.getElementById('name_surname').value
           var email_val = document.getElementById('email').value
           var profession_val = document.getElementById('profession').value
           var number_val = document.getElementById('number').value
           var time_for_patient = document.getElementById('time_for_patient_edit').value

           var timepicker_time_start_elements = document.querySelectorAll('input.new_doc_start_time_edit')
           var timepicker_time_end_elements = document.querySelectorAll('input.new_doc_end_time_edit')


           var time_start = []
           var time_end = []
           string_for_doc_graph = '' //DARBO GRAFIKO ATVAIZDAVIMUI ATNAUIJINANT ĮRAŠĄ





           for (var i = 0; i < 7; i++) {

             time_start.push(timepicker_time_start_elements[i].value)
             time_end.push(timepicker_time_end_elements[i].value)


             if (timepicker_time_start_elements[i].value != '' && timepicker_time_end_elements[i].value == '' || timepicker_time_start_elements[i].value == '' && timepicker_time_end_elements[i].value != ''){
                alert('Nenurodyta kažkurios darbo grafiko dienos pradžia arba pabaiga!')
                return
             }

             if (timepicker_time_start_elements[i].value == timepicker_time_end_elements[i].value && timepicker_time_start_elements[i].value != '' && timepicker_time_end_elements[i].value != ''){
                alert('Darbo grafiko dienos laiko pradžia ir pabaiga negali būti tokia pati!')
                return
             }

             var splited_start_time = timepicker_time_start_elements[i].value.split(':')
             var splited_end_time = timepicker_time_end_elements[i].value.split(':')

             if (splited_start_time[0] > splited_end_time[0] || splited_start_time[1] > splited_end_time[1]){
                alert('Darbo grafiko dienos pradžios laikas negali būti veliasnis už pabaigą!')
                return
             }

             if (timepicker_time_start_elements[i].value != '' && timepicker_time_end_elements[i].value != ''){
                  update_short_work_graph(i,timepicker_time_start_elements[i].value,timepicker_time_end_elements[i].value)
             }

             if (check_if_work_graph_empty(time_start,time_end) == false){
                    return
             }

           }


           var id = document.getElementById('save_btn_modal').name
           var counter = document.getElementById('save_btn_modal').counter

            out = {
                    id:id,
                    name:name_val,
                    email:email_val,
                    profession:profession_val,
                    number:number_val,
                    time_for_patient:time_for_patient,
                    time_start:time_start,
                    time_end:time_end
                  }

            $.ajax({
                    type: "POST",
                    url: "doctors_update",
                    data: JSON.stringify(out),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(data, textStatus){

                        $("#n"+id)[0].innerText = name_val
                        $("#e"+id)[0].innerText = email_val
                        $("#p"+id)[0].innerText = profession_val
                        $("#nm"+id)[0].innerText = number_val
                        $("#l"+id)[0].innerText = time_for_patient
                        $("#g"+id)[0].innerText = string_for_doc_graph
                        $("#g"+id)[0].innerText = string_for_doc_graph

                        loop_index = $("#g"+id).attr('name')

                        mon_start[loop_index] = timepicker_time_start_elements[0].value
                        mon_end[loop_index] = timepicker_time_end_elements[0].value

                        tue_start[loop_index] = timepicker_time_start_elements[1].value
                        tue_end[loop_index] = timepicker_time_end_elements[1].value

                        wed_start[loop_index] = timepicker_time_start_elements[2].value
                        wed_end[loop_index] = timepicker_time_end_elements[2].value

                        thu_start[loop_index] = timepicker_time_start_elements[3].value
                        thu_end[loop_index] = timepicker_time_end_elements[3].value

                        fri_start[loop_index] = timepicker_time_start_elements[4].value
                        fri_end[loop_index] = timepicker_time_end_elements[4].value

                        sat_start[loop_index] = timepicker_time_start_elements[5].value
                        sat_end[loop_index] = timepicker_time_end_elements[5].value

                        sun_start[loop_index] = timepicker_time_start_elements[6].value
                        sun_end[loop_index] = timepicker_time_end_elements[6].value



                    },
                    error: function(data, textStatus) {
                        alert('Įvyko klaida!')
                    }
                });

                $('#editEmployeeModal').modal('hide');

        });



function check_if_work_graph_empty(time_start,time_end) {
    var empty_counter = 0

        for (var i = 0; i < 7; i++) {
            if (time_start[i] == '' && time_end[i] != '' || time_start[i] != '' && time_end[i] == ''){
                alert('Nenurodyta gydytojo darbo laiko pradžia arba pabaiga')
                return false;
            }

            if(time_start[i] == '' && time_end[i] == ''){
                empty_counter += 1
            }

        }

        if(empty_counter == 7){
                alert('Nurodykite gydytojo bent vienos dienos darbo laiką')
                return false;
            }
}


 $("#form_add_new").on('submit', function(e){

        e.preventDefault();

        var form = $(this);

        form.parsley().validate();

        if (!form.parsley().isValid()){
            return
        }


	    var name_val = document.getElementById('new_doctor_name').value
        var email_val = document.getElementById('new_doctor_email').value
        var profession_val = document.getElementById('new_doctor_profession').value
        var number_val = document.getElementById('new_doctor_number').value
        var time_for_patient_val = document.getElementById('time_for_patient').value

        var timepicker_time_start_elements = document.querySelectorAll('input.new_doc_start_time')
        var timepicker_time_end_elements = document.querySelectorAll('input.new_doc_end_time')

        var time_start = []
        var time_end = []

        for (var i = 0; i < 7; i++) {
            time_start.push(timepicker_time_start_elements[i].value)
            time_end.push(timepicker_time_end_elements[i].value)
        }

        if (check_if_work_graph_empty(time_start,time_end) == false){
            return
        }


       out = {
            name:name_val,
            email:email_val,
            profession:profession_val,
            number:number_val,
            time_for_patient:time_for_patient_val,
            time_start:time_start,
            time_end:time_end
          }


         $.ajax({
            type: "POST",
            url: "doctors_new_add",
            data: JSON.stringify(out),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data, textStatus){







            if(data['exist']=='true'){
                alert('Daktaro įrašas su tokiu vardu jau egzistuoja')
            }else{


                    var tr_elem = document.createElement('tr');
                    tr_elem.id = "tr"+data['doctor_id']

                         var td_elem_first = document.createElement('td');

                                var span_elem_first_td = document.createElement('span');
                                span_elem_first_td.setAttribute('class', 'custom-checkbox')



                                    var input_elem_first_td = document.createElement('input');
                                    input_elem_first_td.type = 'checkbox'
                                    input_elem_first_td.id = 'checkbox'+data['doctor_id']
                                    input_elem_first_td.name = "options[]"
                                    input_elem_first_td.value = data['doctor_id']

                                    var label_elem_first_td = document.createElement('label');
                                    label_elem_first_td.setAttribute('for', 'checkbox'+data['doctor_id'])



                    span_elem_first_td.appendChild(input_elem_first_td)
                    span_elem_first_td.appendChild(label_elem_first_td)
                    td_elem_first.appendChild(span_elem_first_td)


                    var td_second = document.createElement('td');
                    var td_third = document.createElement('td');
                    var td_fourth = document.createElement('td');
                    var td_fifth = document.createElement('td');
                    var td_sixt = document.createElement('td');
                    var td_seventh = document.createElement('td');

                    td_second.id = 'n'+data['doctor_id']
                    td_third.id = 'e'+data['doctor_id']
                    td_fourth.id = 'p'+data['doctor_id']
                    td_fifth.id = 'nm'+data['doctor_id']
                    td_sixt.id = 'l'+data['doctor_id']
                    td_seventh.id = 'g'+data['doctor_id']

                    var main_data_div_length = document.getElementById('main_data_div');
                    main_data_div_length = main_data_div_length.children.length

                    td_seventh.setAttribute('name', main_data_div_length)

                  string_for_doc_graph = ''

                  for(var i=0;i<7;i++){

                  if (time_start[i] != '' && time_end[i] != ''){
                          update_short_work_graph(i,time_start[i],time_end[i])
                      }
                    }

                    td_second.innerText = name_val
                    td_third.innerText = email_val
                    td_fourth.innerText = profession_val
                    td_fifth.innerText = number_val
                    td_sixt.innerText = time_for_patient_val
                    td_seventh.innerText = string_for_doc_graph

                    var td_last = document.createElement('td');

                    var a_first = document.createElement('a');
                    a_first.id = 'edit_modal'
                    a_first.href = '#editEmployeeModal'
                    a_first.name = 'edit_'+data['doctor_id']
                    a_first.setAttribute('class', 'crud_edit')
                    a_first.setAttribute('data-toggle', 'modal')

                    var a_second = document.createElement('a');
                    a_second.id = 'delete_modal'
                    a_second.href = "#deleteEmployeeModal"
                    a_second.name = 'delete_'+data['doctor_id']
                    a_second.setAttribute('class', 'crud_delete')
                    a_second.setAttribute('data-toggle', 'modal')

                    var i_first = document.createElement('i');
                    i_first.setAttribute('class', 'material-icons')
                    i_first.setAttribute('data-toggle', 'tooltips')
                    i_first.setAttribute('title', '')
                    i_first.setAttribute('data-original-title', 'Redaguoti')
                    i_first.innerText = 'edit'


                    var i_second = document.createElement('i');

                    i_second.setAttribute('class', 'material-icons')
                    i_second.setAttribute('data-toggle', 'tooltips')
                    i_second.setAttribute('title', '')
                    i_second.setAttribute('data-original-title', 'Ištrinti')
                    i_second.innerText = 'delete'

                    a_first.appendChild(i_first)
                    a_second.appendChild(i_second)
                    td_last.appendChild(a_first)
                    td_last.appendChild(a_second)

                    tr_elem.appendChild(td_elem_first)
                    tr_elem.appendChild(td_second)
                    tr_elem.appendChild(td_third)
                    tr_elem.appendChild(td_fourth)
                    tr_elem.appendChild(td_fifth)
                    tr_elem.appendChild(td_sixt)
                    tr_elem.appendChild(td_seventh)
                    tr_elem.appendChild(td_last)

                    var main_data_div = document.getElementById('main_data_div');
                    main_data_div.appendChild(tr_elem)

                    var edt_buttons = document.querySelector("[name=edit_"+data['doctor_id']+"]");
                    var dlt_buttons = document.querySelector("[name=delete_"+data['doctor_id']+"]");

                    edt_buttons.addEventListener('click', function(event) {
                        id = this.name.replace('edit_','')


                        $("#name_surname").val ( $("#n"+id)[0].innerText )
                        $("#email").val ( $("#e"+id)[0].innerText )
                        $("#profession").val ( $("#p"+id)[0].innerText )
                        $("#number").val ( $("#nm"+id)[0].innerText )
                        $("#time_for_patient_edit").val ( $("#l"+id)[0].innerText )

                        $("#save_btn_modal").attr("name",id);

                    });

                    dlt_buttons.addEventListener('click', function(event) {
                        id = this.name.replace('delete_','')
                        $("#delete_btn_modal").attr("name",id)
                    });

                    $("#new_doctor_name").val ('')
                    $("#new_doctor_email").val ('')
                    $("#new_doctor_profession").val ('')
                    $("#new_doctor_number").val ('')
                    $("#time_for_patient_edit").val ('')


                    $("#time_for_patient").val ('')

                    for (var i=0;i<timepicker_time_start_elements.length;i++){
                        timepicker_time_start_elements[i].value = ''
                        timepicker_time_end_elements[i].value = ''
                    }

//                   console.log(mon_start); console.log(mon_end); console.log(tue_start); console.log(tue_end); console.log(wed_start); console.log(wed_end); console.log(thu_start);
//                   console.log(thu_end); console.log(fri_start); console.log(fri_end); console.log(sat_start); console.log(sat_end); console.log(sun_start); console.log(sun_end);

                    mon_start.push(time_start[0])
                    mon_end.push(time_end[0])

                    tue_start.push(time_start[1])
                    tue_end.push(time_end[1])

                    wed_start.push(time_start[2])
                    wed_end.push(time_end[2])

                    thu_start.push(time_start[3])
                    thu_end.push(time_end[3])

                    fri_start.push(time_start[4])
                    fri_end.push(time_end[4])

                    sat_start.push(time_start[5])
                    sat_end.push(time_end[5])

                    sun_start.push(time_start[6])
                    sun_end.push(time_end[6])


//                    console.log(mon_start); console.log(mon_end); console.log(tue_start); console.log(tue_end); console.log(wed_start); console.log(wed_end); console.log(thu_start);
//                    console.log(thu_end); console.log(fri_start); console.log(fri_end); console.log(sat_start); console.log(sat_end); console.log(sun_start); console.log(sun_end);


    a_first.addEventListener('click', function(event) {

    id = this.name.replace('edit_','')

        var loop_index = $("#g"+id).attr('name')

        $("#save_btn_modal").attr("name",data['doctor_id']);

        $(".mon_start_edit ").val (mon_start[loop_index])
        $(".mon_end_edit ").val (mon_end[loop_index])

        $(".tue_start_edit ").val (tue_start[loop_index])
        $(".tue_end_edit ").val (tue_end[loop_index])

        $(".wed_start_edit ").val (wed_start[loop_index])
        $(".wed_end_edit ").val (wed_end[loop_index])

        $(".thu_start_edit ").val (thu_start[loop_index])
        $(".thu_end_edit ").val (thu_end[loop_index])

        $(".fri_start_edit ").val (fri_start[loop_index])
        $(".fri_end_edit ").val (fri_end[loop_index])

        $(".sat_start_edit ").val (sat_start[loop_index])
        $(".sat_end_edit ").val (sat_end[loop_index])

        $(".sun_start_edit ").val (sun_start[loop_index])
        $(".sun_end_edit ").val (sun_end[loop_index])

    });

            //in delete remove deleted

                    $('#addEmployeeModal').modal('hide');

            }

            },
            error: function(data, textStatus) {
                    alert('Įvyko klaida!')
                    $('#addEmployeeModal').modal('hide');
            }

     });

	});

///////// coding with timepicker

    $(".simpleExample").timepicker();

    $(".stepExample1").timepicker({
        minTime: "08:00",
        maxTime: "20:00",
        hourStep: 1,
        minStep: 15
    });


var timepicker_doc_time_start = document.querySelectorAll('input.new_doc_start_time')
var timepicker_doc_time_end = document.querySelectorAll('input.new_doc_end_time')

var timepicker_doc_time_start_edit = document.querySelectorAll('input.new_doc_start_time_edit')
var timepicker_doc_time_end_edit = document.querySelectorAll('input.new_doc_end_time_edit')


$('#time_for_patient').on('keydown', function(){
        for (var i = 0; i < 7; i++) {
        timepicker_doc_time_start[i].setAttribute('disabled','')
        timepicker_doc_time_end[i].setAttribute('disabled','')
    }
});


function set_time_for_patient_visit_duration(operation){
    if(!isNaN($("#time_for_patient").val())){

        if(operation == 'add'){
            var min_step = parseInt($("#time_for_patient").val())
        }
        else if(operation == 'update'){
            var min_step = parseInt($("#time_for_patient_edit").val())
        }


        if (min_step<1){
            min_step = 1
        }

        for (var i = 0; i < 7; i++) {
            timepicker_doc_time_start[i].removeAttribute('disabled')
            timepicker_doc_time_end[i].removeAttribute('disabled')
        }

        $(".stepExample1").timepicker({
          minTime: "8:00",
          maxTime: "20:00",
          hourStep: 1,
          minStep: min_step
        });

    }
    else{
        alert('Įveskite pacientui skirta laiką minutėmis')
    }
}



$("#time_for_patient_set_btn").click(function(){
    set_time_for_patient_visit_duration('add')
});

$("#time_for_patient_set_btn_edit").click(function(){
    set_time_for_patient_visit_duration('update')
});


//        $("#textAndSizeExample").timepicker({
//          hourHeaderText: "時",
//          minHeaderText: "分",
//          okButtonText: "決定",
//          cancelButtonText: "閉じる",
//          selectSize: 5
//        });
//
//        $("#timeFormatExample").timepicker({
//          timeFormat: "%g:%i %A"
//        });
//
//        $("#minmaxTimeExample1").timepicker({
//          minTime: "11:00",
//          maxTime: "10:00 pm"
//        });
//
//        $("#minmaxTimeExample2").timepicker({
//          minTime: "10:45",
//          maxTime: "10:15"
//        })
//
//        $("#disableTimeRangeExample").timepicker({
//          disableTimeRanges: [["10:00", "14:30"], ["14:45", "23:15"]]
//        });


//
//        $("#stepExample2").timepicker({
//          minTime: "10:45",
//          maxTime: "19:15",
//          timeStep: 7
//        });
//
//        $("#scrollDefaultExample").timepicker({
//          scrollDefault: "13:15"
//        });
//
//        $("#12HourClockExample").timepicker({
//          use12HourClock: true,
//          timeFormat: "%g:%i %A"
//        });
//
//        $("#ampmTextExample").timepicker({
//          use12HourClock: true,
//          timeFormat: "%a %g時%i分",
//          ampmText: { am:"午前", pm:"午後" }
//        });
//
//        $("#12HourPlusMinMaxTimeExample").timepicker({
//          use12HourClock: true,
//          timeFormat: "%h:%i %a",
//          minTime: "13:15",
//          maxTime: "6:15"
//        });
//
//        $("#12HourPlusTimeStepExample").timepicker({
//          use12HourClock: true,
//          timeFormat: "%h:%i %a",
//          minTime: "13:15",
//          maxTime: "6:15",
//          timeStep: 7
//        });
//
//        $("#eventExample")
//          .timepicker()
//          .on("change", function(){
//            $("#output").html($("#eventExample").val());
//        });
//



// $("#form_save").on('submit', function(e){
//
//
//
//            e.preventDefault();
//
//            var form = $(this);
//
//            form.parsley().validate();
//
//            if (form.parsley().isValid()){
//            console.log('update')
//                form_validator = true
//            }
//
//
})