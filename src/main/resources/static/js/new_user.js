/**
 * Created by bills on 2/26/15.
 */


$(document).ready(function(){

    $(document).on('click','#adduser', function(e) {

        var runConfirm = true;

        if(document.getElementById("firstnameinput").value == ""||document.getElementById("lastnameinput").value == ""||document.getElementById("emailinput").value == ""||
            document.getElementById("passwordinput").value == "") {
            console.log("getting ready to post banner")
            runConfirm = false;
            $("#editBanner").append("<div id=\"temporary\"><div class=\"col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 main alert alert-danger\">Please make sure that all the fields are filled out correctly</div></div>");
            setTimeout(function () {
                $("#temporary").remove();
            }, 5000);

        }
        //else if(document.getElementById("phoneinput").value < 10|| /^[0-9]+$/.test(document.getElementById("phoneinput").value)==false){
        //    runConfirm = false;
        //    $("#editBanner").append("<div id=\"temporary\"><div class=\"col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 main alert alert-danger\">There was a problem with the phone number you entered. Please make sure its 10 digits and only numbers.</div></div>");
        //    setTimeout(function () {
        //        $("#temporary").remove();
        //    }, 5000);
        //}
        //else if(document.getElementById("dayinput").value ==""|| document.getElementById("monthinput").value =="" || document.getElementById("yearinput").value ==""||
        //    /^[0-9]+$/.test(document.getElementById("dayinput").value)==false||/^[0-9]+$/.test(document.getElementById("monthinput").value)==false||/^[0-9]+$/.test(document.getElementById("yearinput").value)==false){
        //   runConfirm = false;
        //    $("#editBanner").append("<div id=\"temporary\"><div class=\"col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 main alert alert-danger\">Make sure the Date of Birth is filed out correctly</div></div>");
        //    setTimeout(function () {
        //        $("#temporary").remove();
        //    }, 5000);
        //}

        if(document.getElementById("stafferDN").value!=""){
            $.ajax({
                'url':"/checkStafferDisplayName",
                'type':"GET",
                'data':{'displayName':document.getElementById("stafferDN").value, 'userVariable': -1},
                error:function(){
                    runConfirm=false;
                    $("#editBanner").append("<div id=\"temporary\"><div class=\"col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 main alert alert-danger\">Error Checking to see if staffer name already exists</div></div>");
                    setTimeout(function() {$("#temporary").remove();}, 5000);
                    console.log("error saving information");
                },
                success:function(data){
                    if(data==true){
                        runConfirm=false;
                        $("#editBanner").append("<div id=\"temporary\"><div class=\"col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 main alert alert-danger\">Staffer name is already used</div></div>");
                        setTimeout(function() {$("#temporary").remove();}, 5000);
                    }
                }
            })
        }
        else if(document.getElementById("supervisorDN").value!=""){
            $.ajax({
                'url':"/checkSupervisorDisplayName",
                'type':"GET",
                'data':{'displayName':document.getElementById("supervisorDN").value, 'userVariable': -1},
                error:function(){
                    runConfirm=false;
                    $("#editBanner").append("<div id=\"temporary\"><div class=\"col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 main alert alert-danger\">Error checking if supervisor name already exists</div></div>");
                    setTimeout(function() {$("#temporary").remove();}, 5000);
                    console.log("error saving information");
                },
                success:function(data){
                    if(data==true){
                        runConfirm=false;
                        $("#editBanner").append("<div id=\"temporary\"><div class=\"col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 main alert alert-danger\">Supervisor name already used</div></div>");
                        setTimeout(function() {$("#temporary").remove();}, 5000);
                    }
                }
            })
        }

        if(runConfirm == true){
            $.ajax({
                'url': "confirmAdd",
                'type': "GET",
                'data': {'firstnameinput':document.getElementById("firstnameinput").value, 'yearinput':document.getElementById("yearinput").value,'dayinput':document.getElementById("dayinput").value,
                    'monthinput':document.getElementById("monthinput").value,
                    'lastnameinput':document.getElementById("lastnameinput").value,'emailinput':document.getElementById("emailinput").value,'serviceCheck':document.getElementById("serviceCheck").checked,
                    'userCheck':document.getElementById("userCheck").checked,'reportCheck':document.getElementById("reportCheck").checked,'referenceCheck':document.getElementById("referenceCheck").checked,
                    'phoneinput':document.getElementById("phoneinput").value,'addressoneinput':document.getElementById("addressoneinput").value,'addresstwoinput':document.getElementById("addresstwoinput").value,
                    'cityinput':document.getElementById("cityinput").value,'stateinput':document.getElementById("stateinput").value,'postalcodeinput':document.getElementById("postalcodeinput").value,
                    'passwordinput':document.getElementById("passwordinput").value, 'stafferDN':document.getElementById("stafferDN").value, 'supervisorDN':document.getElementById("supervisorDN").value},
                error:function(){
                    $("#editBanner").append("<div id=\"temporary\"><div class=\"col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 main alert alert-danger\">An error occured attempting to create user</div></div>");
                    setTimeout(function() {$("#temporary").remove();}, 5000);
                    console.log("error saving information");
                },
                success:function(data){
                    if(data == "success") {
                        $("head").append("<meta http-equiv=\"refresh\" content=\"0; url=/users?messageid=1\" />");
                    }
                    else{
                        $("#editBanner").append("<div id=\"temporary\"><div class=\"col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 main alert alert-danger\">Could not create new user</div></div>");
                        setTimeout(function() {$("#temporary").remove();}, 5000);
                    }
                }
            })
        }


    })



    //-------------------------------------------------------
    //-------------------------------------------------------
    //-------------------------------------------------------
    //below is the edit user methods
    //-------------------------------------------------------
    //-------------------------------------------------------
    //-------------------------------------------------------
    $(document).on('click','#edituser', function(e) {
        console.log("this is a test");
        console.log("checking checking: "+document.getElementById("serviceCheck").checked);
        var runConfirm = true;

        if(document.getElementById("firstnameinput").value == ""||document.getElementById("lastnameinput").value == ""||document.getElementById("emailinput").value == "") {
            console.log("getting ready to post banner")
            runConfirm = false;
            $("#editBanner").append("<div id=\"temporary\"><div class=\"col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 main alert alert-danger\">Please make sure that all the fields are filled out correctly</div></div>");
            setTimeout(function () {
                $("#temporary").remove();
            }, 5000);

        }
        //else if(document.getElementById("phoneinput").value < 10|| /^[0-9]+$/.test(document.getElementById("phoneinput").value)==false){
        //    runConfirm = false;
        //    $("#editBanner").append("<div id=\"temporary\"><div class=\"col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 main alert alert-danger\">There was a problem with the phone number you entered. Please make sure its 10 digits and only numbers.</div></div>");
        //    setTimeout(function () {
        //        $("#temporary").remove();
        //    }, 5000);
        //}

        if(document.getElementById("stafferDN").value!=""){
            $.ajax({
                'url':"/checkStafferDisplayName",
                'type':"GET",
                'data':{'displayName':document.getElementById("stafferDN").value,'userVariable':document.getElementById("userVariable").value},
                error:function(){
                    $("#editBanner").append("<div id=\"temporary\"><div class=\"col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 main alert alert-danger\">An error occured checking if staff name already exists</div></div>");
                    setTimeout(function() {$("#temporary").remove();}, 5000);
                    console.log("error saving information");
                },
                success:function(data){
                    console.log("inside success function");
                    if(data==true){
                        console.log("data: "+data);
                        console.log("data.data: "+data.data);
                        console.log("data returned true");
                        runConfirm=false;
                        $("#editBanner").append("<div id=\"temporary\"><div class=\"col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 main alert alert-danger\">Staffer name is already taken</div></div>");
                        setTimeout(function() {$("#temporary").remove();}, 5000);
                    }
                    else{
                        console.log("data: "+data);
                        console.log("data.data: "+data.data);
                    }
                    console.log("after if statement");
                    console.log("TEST TEST TEST");

                    if(document.getElementById("supervisorDN").value!=""){
                        $.ajax({
                            'url':"/checkSupervisorDisplayName",
                            'type':"GET",
                            'data':{'displayName':document.getElementById("supervisorDN").value,'userVariable':document.getElementById("userVariable").value},
                            error:function(){
                                $("#editBanner").append("<div id=\"temporary\"><div class=\"col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 main alert alert-danger\">An error occured checking if supervisor name exists</div></div>");
                                setTimeout(function() {$("#temporary").remove();}, 5000);
                                console.log("error saving information");
                            },
                            success:function(data){
                                console.log("inside success function");
                                console.log("data: "+data);
                                console.log("data.data: "+data.data);
                                if(data==true){
                                    console.log("data returned true");
                                    runConfirm=false;
                                    $("#editBanner").append("<div id=\"temporary\"><div class=\"col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 main alert alert-danger\">Supervisor name is already taken</div></div>");
                                    setTimeout(function() {$("#temporary").remove();}, 5000);
                                }
                                console.log("after if statement");
                                console.log("before executing, runConfirm="+runConfirm);
                                if(runConfirm == true){
                                    console.log("inside if statement");
                                    $.ajax({
                                        'url': "confirmEdit",
                                        'type': "GET",
                                        'data': {'userVariable':document.getElementById("userVariable").value,'firstnameinput':document.getElementById("firstnameinput").value,
                                            'lastnameinput':document.getElementById("lastnameinput").value,'emailinput':document.getElementById("emailinput").value,'serviceCheck':document.getElementById("serviceCheck").checked,
                                            'userCheck':document.getElementById("userCheck").checked,'reportCheck':document.getElementById("reportCheck").checked,'referenceCheck':document.getElementById("referenceCheck").checked,
                                            'phoneinput':document.getElementById("phoneinput").value,'addressoneinput':document.getElementById("addressoneinput").value,'addresstwoinput':document.getElementById("addresstwoinput").value,
                                            'cityinput':document.getElementById("cityinput").value,'stateinput':document.getElementById("stateinput").value,'postalcodeinput':document.getElementById("postalcodeinput").value,
                                            'stafferDN':document.getElementById("stafferDN").value, 'supervisorDN':document.getElementById("supervisorDN").value},
                                        error:function(){
                                            $("#editBanner").append("<div id=\"temporary\"><div class=\"col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 main alert alert-danger\">An error occured saving the edits</div></div>");
                                            setTimeout(function() {$("#temporary").remove();}, 3000);
                                            console.log("error saving information");
                                        },
                                        success:function(data){
                                            $("head").append("<meta http-equiv=\"refresh\" content=\"0; url=/users?messageid=3\" />");
                                        }
                                    })
                                }
                            }
                        })
                    }
                    if(document.getElementById("supervisorDN").value=="") {
                        //----------start confirmEdit-------------
                        console.log("before executing, runConfirm=" + runConfirm);
                        if (runConfirm == true) {
                            console.log("inside if statement");
                            $.ajax({
                                'url': "confirmEdit",
                                'type': "GET",
                                'data': {'userVariable':document.getElementById("userVariable").value,'firstnameinput':document.getElementById("firstnameinput").value,
                                    'lastnameinput':document.getElementById("lastnameinput").value,'emailinput':document.getElementById("emailinput").value,'serviceCheck':document.getElementById("serviceCheck").checked,
                                    'userCheck':document.getElementById("userCheck").checked,'reportCheck':document.getElementById("reportCheck").checked,'referenceCheck':document.getElementById("referenceCheck").checked,
                                    'phoneinput':document.getElementById("phoneinput").value,'addressoneinput':document.getElementById("addressoneinput").value,'addresstwoinput':document.getElementById("addresstwoinput").value,
                                    'cityinput':document.getElementById("cityinput").value,'stateinput':document.getElementById("stateinput").value,'postalcodeinput':document.getElementById("postalcodeinput").value,
                                    'stafferDN':document.getElementById("stafferDN").value, 'supervisorDN':document.getElementById("supervisorDN").value},
                                error: function () {
                                    $("#editBanner").append("<div id=\"temporary\"><div class=\"col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 main alert alert-danger\">An error occured saving the edits</div></div>");
                                    setTimeout(function () {
                                        $("#temporary").remove();
                                    }, 3000);
                                    console.log("error saving information");
                                },
                                success: function (data) {
                                   $("head").append("<meta http-equiv=\"refresh\" content=\"0; url=/users?messageid=3\" />");
                                }
                            })
                        }
                        else {
                            console.log("this should only run if runConfirm is false");
                        }
                    }

                    //----------end of confirm edit-----------
                }
            })
        }
        else if(document.getElementById("supervisorDN").value!=""){
            console.log("inside supervisor edit, when there is no staff name");
            $.ajax({
                'url':"/checkSupervisorDisplayName",
                'type':"GET",
                'data':{'displayName':document.getElementById("supervisorDN").value, 'userVariable':document.getElementById("userVariable").value},
                error:function(){
                    $("#editBanner").append("<div id=\"temporary\"><div class=\"col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 main alert alert-danger\">An error occured checking if supervisor name is taken</div></div>");
                    setTimeout(function() {$("#temporary").remove();}, 5000);
                    console.log("error saving information");
                },
                success:function(data){
                    console.log("inside success function");
                    if(data.data==true){
                        console.log("data returned true");
                        runConfirm=false;
                        $("#editBanner").append("<div id=\"temporary\"><div class=\"col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 main alert alert-danger\">Supervisor name is already taken</div></div>");
                        setTimeout(function() {$("#temporary").remove();}, 5000);
                    }
                    console.log("after if statement");
                    //----------start confirmEdit-------------
                    console.log("before executing, runConfirm=" + runConfirm);
                    if (runConfirm == true) {
                        console.log("inside if statement");
                        $.ajax({
                            'url': "confirmEdit",
                            'type': "GET",
                            'data': {'userVariable':document.getElementById("userVariable").value,'firstnameinput':document.getElementById("firstnameinput").value,
                                'lastnameinput':document.getElementById("lastnameinput").value,'emailinput':document.getElementById("emailinput").value,'serviceCheck':document.getElementById("serviceCheck").checked,
                                'userCheck':document.getElementById("userCheck").checked,'reportCheck':document.getElementById("reportCheck").checked,'referenceCheck':document.getElementById("referenceCheck").checked,
                                'phoneinput':document.getElementById("phoneinput").value,'addressoneinput':document.getElementById("addressoneinput").value,'addresstwoinput':document.getElementById("addresstwoinput").value,
                                'cityinput':document.getElementById("cityinput").value,'stateinput':document.getElementById("stateinput").value,'postalcodeinput':document.getElementById("postalcodeinput").value,
                                'stafferDN':document.getElementById("stafferDN").value, 'supervisorDN':document.getElementById("supervisorDN").value},
                            error: function () {
                                $("#editBanner").append("<div id=\"temporary\"><div class=\"col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 main alert alert-danger\">An error occured</div></div>");
                                setTimeout(function () {
                                    $("#temporary").remove();
                                }, 5000);
                                console.log("error saving information");
                            },
                            success: function (data) {
                                $("head").append("<meta http-equiv=\"refresh\" content=\"0; url=/users?messageid=3\" />");
                            }
                        })
                    }
                    else {
                        console.log("this should only run if runConfirm is false");
                    }


                }
            })
        }



    })








})


