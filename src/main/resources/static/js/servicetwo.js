/**
 * Created by bills on 6/17/15.
 */
/**
 * Created by bills on 6/17/15.
 */
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
            if(data == true){
                console.log("Is the data open?");
                $('#service_button').removeClass("btn-danger");
                $('#service_button').addClass("btn-success");
                $('#service_button').html("<span class=\"glyphicon glyphicon-comment\"></span> &nbsp;Chat is Open");
            }
            else{
                $('#service_button').removeClass("btn-success");
                $('#service_button').addClass("btn-danger");
                $('#service_button').html("<span class=\"glyphicon glyphicon-comment\"></span> &nbsp;Chat is Closed");
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

                if(data == true){
                    $('#service_button').removeClass("btn-danger");
                    $('#service_button').addClass("btn-success");
                    $('#service_button').html("<span class=\"glyphicon glyphicon-comment\"></span> &nbsp;Chat is Open");
                }
                else{
                    $('#service_button').removeClass("btn-success");
                    $('#service_button').addClass("btn-danger");
                    $('#service_button').html("<span class=\"glyphicon glyphicon-comment\"></span> &nbsp;Chat is Closed");
                }
            }
        })
    })




    $.ajax({
        type:"GET",
        url:"/load_text_services",
        error: function(){
            console.log('error');
        },
        success: function(data){
            console.log(data);
            if(data == true){
                console.log("Is the data open?");
                $('#text_button').removeClass("btn-danger");
                $('#text_button').addClass("btn-success");
                $('#text_button').html("<span class=\"glyphicon glyphicon-comment\"></span> &nbsp;Text is Open");
            }
            else{
                $('#text_button').removeClass("btn-success");
                $('#text_button').addClass("btn-danger");
                $('#text_button').html("<span class=\"glyphicon glyphicon-comment\"></span> &nbsp;Text is Closed");
            }
        }
    })

    $('#text_button').click(function(){
        $.ajax({
            type:"GET",
            url:"/change_text_service",
            error: function(){
                console.log('error');
                $('#display_area').append("<p>error</p>");
            },
            success: function(data){
                console.log(data);
                if(data == true){
                    $('#text_button').removeClass("btn-danger");
                    $('#text_button').addClass("btn-success");
                    $('#text_button').html("<span class=\"glyphicon glyphicon-comment\"></span> &nbsp;Text is Open");
                }
                else{
                    $('#text_button').removeClass("btn-success");
                    $('#text_button').addClass("btn-danger");
                    $('#text_button').html("<span class=\"glyphicon glyphicon-comment\"></span> &nbsp;Text is Closed");
                }
            }
        })
    })

})