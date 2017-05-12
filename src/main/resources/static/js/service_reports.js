/**
 * Created by bills on 2/23/15.
 */

$(document).ready(function(){

    $.ajax({
        type:"GET",
        url:"/load_services",
        error: function(){
            console.log('error');
        },
        success: function(data){
            if(data == "open"){
                console.log("Is the data open?");
                $('#service_button').removeClass("btn-danger");
                $('#service_button').addClass("btn-success");
                $('#service_button').html("<span class=\"glyphicon glyphicon-comment\"></span> &nbsp;Service is Open");
            }
            else{
                $('#service_button').removeClass("btn-success");
                $('#service_button').addClass("btn-danger");
                $('#service_button').html("<span class=\"glyphicon glyphicon-comment\"></span> &nbsp;Service is Closed");
            }
        }
    })

    $('#service_button').click(function(){
        $.ajax({
            type:"GET",
            url:"/change_service",
            error: function(){
                console.log('error');
                $('#display_area').append("<p>error</p>");
            },
            success: function(data){
                if(data == "open"){
                    $('#service_button').removeClass("btn-danger");
                    $('#service_button').addClass("btn-success");
                    $('#service_button').html("<span class=\"glyphicon glyphicon-comment\"></span> &nbsp;Service is Open");
                }
                else{
                    $('#service_button').removeClass("btn-success");
                    $('#service_button').addClass("btn-danger");
                    $('#service_button').html("<span class=\"glyphicon glyphicon-comment\"></span> &nbsp;Service is Closed");
                }
            }
        })
    })

})