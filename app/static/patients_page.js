
$(document).ready(function(){
	// Activate tooltip


	var edit_buttons = document.querySelectorAll('a.crud_edit')
    var delete_buttons = document.querySelectorAll('a.crud_delete')


var selectOptions = document.querySelectorAll('option.getOptVal')



console.log(edit_buttons)




function edit_modal_update() {
for (var i = 0; i < edit_buttons.length; i++) {
    edit_buttons[i].addEventListener('click', function(event) {
        id = this.name.replace('edit_','')

        console.log(id)

        var nameSurname = $("#n"+id)[0].innerText
        nameSurname = nameSurname.split(' ');

        $("#edit_name").val ( nameSurname[0] )
        $("#edit_surname").val ( nameSurname[1] )
        $("#edit_email").val ( $("#e"+id)[0].innerText )
        $("#edit_id_code").val ( $("#p"+id)[0].innerText )
        $("#edit_number").val ( $("#nm"+id)[0].innerText )
        $("#edit_doctor").val ( $("#l"+id)[0].innerText )

//        loop_index = $("#g"+id).attr('name')
//
//        $(".mon_start_edit ").val (mon_start[loop_index])
//        $(".mon_end_edit ").val (mon_end[loop_index])
//
//        $(".tue_start_edit ").val (tue_start[loop_index])
//        $(".tue_end_edit ").val (tue_end[loop_index])
//
//        $(".wed_start_edit ").val (wed_start[loop_index])
//        $(".wed_end_edit ").val (wed_end[loop_index])
//
//        $(".thu_start_edit ").val (thu_start[loop_index])
//        $(".thu_end_edit ").val (thu_end[loop_index])
//
//        $(".fri_start_edit ").val (fri_start[loop_index])
//        $(".fri_end_edit ").val (fri_end[loop_index])
//
//        $(".sat_start_edit ").val (sat_start[loop_index])
//        $(".sat_end_edit ").val (sat_end[loop_index])
//
//        $(".sun_start_edit ").val (sun_start[loop_index])
//        $(".sun_end_edit ").val (sun_end[loop_index])

//
//        $("#save_btn_modal").attr("name",id);
//        $("#save_btn_modal").attr("counter",loop_index);

    });
}

}

edit_modal_update()


























function setDeleteBtnOnclickEvents() {
for (var i = 0; i < delete_buttons.length; i++) {
    delete_buttons[i].addEventListener('click', function(event) {
        id = this.name.replace('delete_','')
        $("#delete_btn_modal").attr("name",id)
    });
    }
}

setDeleteBtnOnclickEvents()


$("#add_doctor_btn").click(function(){

var all_checkboxes = document.querySelectorAll('input[type="checkbox"]')


})



 $("#form_delete_checked").on('submit', function(e){


            e.preventDefault();

            out = { id:checkbox_patients_id }

            $.ajax({
                    type: "POST",
                    url: "patients_delete",
                    data: JSON.stringify(out),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(data, textStatus){

                     var indexes_to_delete = []
                     if(checkbox_patients_id.length>1){
                        for(var i=0;i<checkbox_patients_id.length;i++){
                            var el = $("#g"+checkbox_patients_id[i]).attr('name')
                            indexes_to_delete.push(el)
                        }

                        indexes_to_delete.sort(function(a, b){return b-a});

                     }

                        if(checkbox_patients_id.length>0){
                            for(var i=0;i<checkbox_patients_id.length;i++){

                       // delete_from_local_arr(indexes_to_delete[i])

                                var obj_to_delete = document.getElementById('tr'+checkbox_patients_id[i])
                                obj_to_delete.remove()
                            }
                            for(var i=0;i<checkbox_patients_id.length;i++){
                                checkbox_patients_id.splice(i,1);
                            }
                        }

                    },
                    error: function(data, textStatus) {
                        alert('Įvyko klaida!')
                    }
                });

                 $('#deleteEmployeeModal_checkbox').modal('hide');
        });









var checkbox_patients_id = []

$("#delete_checked").click(function(){

        checkbox_patients_id = []

       var all_checkboxes = document.querySelectorAll('input[type="checkbox"]')
             for(var i=0;i<all_checkboxes.length;i++){
                 if(all_checkboxes[i].checked){

                    checkbox_patients_id.push(all_checkboxes[i].id.replace('checkbox',''))
                 }
        }

        if(checkbox_patients_id.length>0){
            $('#deleteEmployeeModal_checkbox').modal('show');
        }else{
            alert('Pažymėkite bent vieną lauką')
        }

})






var selectedOption



$("#form_add_new").on('submit', function(e){


        e.preventDefault();
        console.log(selectedOption)

//        var form = $(this);
//
//        form.parsley().validate();
//
//        if (!form.parsley().isValid()){
//            return
//        }


	    var new_patient_name = document.getElementById('new_patient_name').value
	    var new_patient_surname = document.getElementById('new_patient_surname').value
        var new_patient_email = document.getElementById('new_patient_email').value
        var new_patient_code = document.getElementById('new_patient_code').value
        var new_patient_number = document.getElementById('new_patient_number').value



        // selectedOption


//        var timepicker_time_start_elements = document.querySelectorAll('input.new_doc_start_time')
//        var timepicker_time_end_elements = document.querySelectorAll('input.new_doc_end_time')
//
//        var time_start = []
//        var time_end = []
//
//        for (var i = 0; i < 7; i++) {
//            time_start.push(timepicker_time_start_elements[i].value)
//            time_end.push(timepicker_time_end_elements[i].value)
//        }

//        if (check_if_work_graph_empty(time_start,time_end) == false){
//            return
//        }


       out = {
            name:new_patient_name,
            surname:new_patient_surname,
            email:new_patient_email,
            id_code:new_patient_code,
            number:new_patient_number,
            doctor_id : 1 // todo dynamically parse doctor id from drop down list
          }



         $.ajax({
            type: "POST",
            url: "patient_new_add",
            data: JSON.stringify(out),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data, textStatus){


            if(data['exist']=='true'){
                alert('Paciento įrašas su tokiu vardu jau egzistuoja')
            }else{


                    var tr_elem = document.createElement('tr');
                    tr_elem.id = "tr"+data['patient_id']

                         var td_elem_first = document.createElement('td');

                                var span_elem_first_td = document.createElement('span');
                                span_elem_first_td.setAttribute('class', 'custom-checkbox')



                                    var input_elem_first_td = document.createElement('input');
                                    input_elem_first_td.type = 'checkbox'
                                    input_elem_first_td.id = 'checkbox'+data['patient_id']
                                    input_elem_first_td.name = "options[]"
                                    input_elem_first_td.value = data['patient_id']

                                    var label_elem_first_td = document.createElement('label');
                                    label_elem_first_td.setAttribute('for', 'checkbox'+data['patient_id'])



                    span_elem_first_td.appendChild(input_elem_first_td)
                    span_elem_first_td.appendChild(label_elem_first_td)
                    td_elem_first.appendChild(span_elem_first_td)


                    var td_second = document.createElement('td');
                    var td_third = document.createElement('td');
                    var td_fourth = document.createElement('td');
                    var td_fifth = document.createElement('td');
                    var td_sixt = document.createElement('td');

                    td_second.id = 'n'+data['patient_id']
                    td_third.id = 'e'+data['patient_id']
                    td_fourth.id = 'p'+data['patient_id']
                    td_fifth.id = 'nm'+data['patient_id']
                    td_sixt.id = 'l'+data['patient_id']

                    var main_data_div_length = document.getElementById('main_data_div');
                    main_data_div_length = main_data_div_length.children.length


                  string_for_doc_graph = ''


//            doctor_id : 1 // todo dynamically parse doctor id from drop down list


                    td_second.innerText = new_patient_name
                    td_third.innerText = new_patient_email
                    td_fifth.innerText = new_patient_number
                    td_fourth.innerText = new_patient_code
                    td_sixt.innerText = 1






                    var td_last = document.createElement('td');

                    var a_first = document.createElement('a');
                    a_first.id = 'edit_modal'
                    a_first.href = '#editEmployeeModal'
                    a_first.name = 'edit_'+data['patient_id']
                    a_first.setAttribute('class', 'crud_edit')
                    a_first.setAttribute('data-toggle', 'modal')

                    var a_second = document.createElement('a');
                    a_second.id = 'delete_modal'
                    a_second.href = "#deleteEmployeeModal"
                    a_second.name = 'delete_'+data['patient_id']
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
                    tr_elem.appendChild(td_last)

                    var main_data_div = document.getElementById('main_data_div');
                    main_data_div.appendChild(tr_elem)

//                    var edt_buttons = document.querySelector("[name=edit_"+data['patient_id']+"]");
//                    var dlt_buttons = document.querySelector("[name=delete_"+data['patient_id']+"]");

//                    edt_buttons.addEventListener('click', function(event) {
//                        id = this.name.replace('edit_','')
//
//
//                        $("#name_surname").val ( $("#n"+id)[0].innerText )
//                        $("#email").val ( $("#e"+id)[0].innerText )
//                        $("#profession").val ( $("#p"+id)[0].innerText )
//                        $("#number").val ( $("#nm"+id)[0].innerText )
//                        $("#time_for_patient_edit").val ( $("#l"+id)[0].innerText )
//
//                        $("#save_btn_modal").attr("name",id);
//
//                    });

//                    dlt_buttons.addEventListener('click', function(event) {
//                        id = this.name.replace('delete_','')
//                        $("#delete_btn_modal").attr("name",id)
//                    });




                    $("#new_patient_name").val ('')
                    $("#new_patient_email").val ('')
                    $("#new_patient_code").val ('')
                    $("#new_patient_number").val ('')






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


















})
