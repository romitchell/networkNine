/**
 * Created by bills on 2/23/15.
 */

$(document).ready(function() {


    $.ajax({
        type:"GET",
        url:"getTable",
        error:function(){
            console.log("error getting table info");
        },
        success:function(data){
            console.log(data[0]);
            $.each(data[0],function(index,x){
                $("#users_tables").append("<tr><td>"+ x.name+"</td></tr>")
            })
        }
    })

   /* //-----------------------------------------
    //Ajax call to get preferences
    //-----------------------------------------
    $.ajax({
        type:"GET",
        //url:
        error: function(){
            console.log('error');
        },
        success: function(data){
            $.each(data,function(index, x) {
                //Add code for service on/off permission
                if(x.permission_service == true){permission_code += "<span title=\"Service On/Off\" class=\"glyphicon glyphicon-ok-circle gliphy-enable\">&nbsp;</span>"}
                else{permission_code += "<span title=\"Service On/Off\" class=\"glyphicon glyphicon-ok-circle gliphy-disable\">&nbsp;</span>"}
                //Add code for adding users
                if(x.permission_add_users == true){permission_code += "<span title=\"Add Users\" class=\"glyphicon glyphicon-user gliphy-enable\">&nbsp;</span>"}
                else{permission_code += "<span title=\"Add Users\" class=\"glyphicon glyphicon-user gliphy-disable\">&nbsp;</span>"}
                //Add code for run reports permission
                if(x.permission_run_reports == true){permission_code += "<span title=\"Run Reports\" class=\"glyphicon glyphicon-stats gliphy-enable\">&nbsp;</span>"}
                else{permission_code += "<span title=\"Run Reports\" class=\"glyphicon glyphicon-stats gliphy-disable\">&nbsp;</span>"}
                //Add code for modify references permission
                if(x.permission_references == true){permission_code += "<span title=\"Modify References\" class=\"glyphicon glyphicon-book gliphy-enable\">&nbsp;</span>"}
                else{permission_code += "<span title=\"Modify References\" class=\"glyphicon glyphicon-book gliphy-disable\">&nbsp;</span>"}

                permissions.push(permission_code);
                permission_code="";
            })

        }
    })

    //-----------------------------------------
    //Ajax call to get status buttons
    //-----------------------------------------
    $.ajax({
        type: "GET",
        //url: "load_services",
        error: function(){
            console.log('error');
        },
        success: function(data){
            $.each(data,function(index, x) {
                if(x == true){status_button_code+="<button type=\"button\" class=\"btn btn-primary btn-xs\">Active</button>"}
                else{status_button_code+="<button type=\"button\" class=\"btn btn-default btn-xs\" >Disabled</button>"}
                status_buttons.push(status_button_code);
                status_button_code = "";
            })

        }
    })

    //-----------------------------------------
    //Ajax call to print table onto page
    //-----------------------------------------
    $.ajax({
        type: "GET",
        //url: "load_services",
        error: function(){
            console.log('error');
        },
        success: function(data){
            $.each(data,function(index, x) {
                $('users_table').append("<tr><td>"+ x.name+"</td><td>"+ x.email+"</td><td>"+ permissions[x]+"</td><td>"+ x.statusButton+"</td><td>"+ x.last_login+
                "</td><td><a href=\"edit_user.html\"><button type=\"button\" class=\"btn btn-default\">Edit</button></a></td></tr>");
            })

        }
    })*/


})