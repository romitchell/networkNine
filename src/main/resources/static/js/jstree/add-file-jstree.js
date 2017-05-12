/**
 * Created by bills on 3/9/16.
 */

$(document).ready(function() {


    $(document).on('click', '#AddFile', function () {
        var go = false;
        var parent = document.getElementById("parentid").value;
        try {
            if (document.getElementById("nameinputfile").value != "") {
                go = true;
            }
            else {
                $("#editBanner").append("<div id=\"temporary\"><div class=\"col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 main alert alert-danger\">Make sure you have the name field filled out</div></div>");
                $("#editFileBanner").append("<div id=\"temporaryFile\"><div class=\"col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 main alert alert-danger\">Make sure you have the name field filled out</div></div>");
                setTimeout(function () {
                    $("#temporaryFile").remove();
                }, 5000);
                setTimeout(function () {
                    $("#temporary").remove();
                }, 5000);
            }
        } catch (NoParent) {
            $("#editBanner").append("<div id=\"temporary\"><div class=\"col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 main alert alert-danger\">Make sure you have a file highlighted above to be the parent folder</div></div>");
            $("#editFileBanner").append("<div id=\"temporaryFile\"><div class=\"col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 main alert alert-danger\">Make sure you have a file highlighted above to be the parent folder</div></div>");
            setTimeout(function () {
                $("#temporaryFile").remove();
            }, 5000);
            setTimeout(function () {
                $("#temporary").remove();
            }, 5000);
        }
        if (go == true) {

            var filename = document.getElementById("nameinputfile").value;
            var keywords = document.getElementById("keywordsinputfile").value;
            var fileinfo = document.getElementById("documentinput").value;
            var newOP = document.getElementById("ordinalfileinput").value;
            console.log(newOP);
            $.ajax({
                'url': "addFile",
                'type': "GET",
                'data': {
                    'filenameinput': filename,
                    'keywordsinputfile': keywords,
                    'documentinput': fileinfo,
                    'selectedJstreeFile': parent,
                    'newOP': newOP
                },
                error: function () {
                    $("#editBanner").append("<div id=\"temporary\"><div class=\"col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 main alert alert-danger\">An error occured</div></div>");
                    $("#editFileBanner").append("<div id=\"temporaryFile\"><div class=\"col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 main alert alert-danger\">An error occured</div></div>");
                    setTimeout(function () {
                        $("#temporaryFile").remove();
                    }, 5000);
                    setTimeout(function () {
                        $("#temporary").remove();
                    }, 5000);
                    console.log("error saving information");
                },
                success: function (data) {
                    console.log("SUCCESS!");
                    window.opener.location.reload(true);
                    window.close();
                }
            })
        }
    })


    $(document).on('click','#saveFile',function () {
        var theID = document.getElementById("theId").value;
        var newText = document.getElementById("newText").value;
        var newOP = document.getElementById("newOP").value;
        var newKeywords = document.getElementById("newKeywords").value;
        var newName = document.getElementById("newName").value;
        $.ajax({
            'url': "changeNameFile",
            'type': "GET",
            'data': {'theID':theID, 'newName':newName, 'newText':newText, 'newOP':newOP, 'newKeywords':newKeywords},
            error:function(){
                $("#editBanner").append("<div id=\"temporary\"><div class=\"col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 main alert alert-danger\">An error occured</div></div>");
                setTimeout(function() {$("#temporary").remove();}, 3000);
                console.log("error saving information");
            },
            success:function(data){
                //$("#editBanner").append("<div id=\"temporary\"><div class=\"col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 main alert alert-success\">Save was successful!</div></div>");
                //document.getElementById(theID).innerHTML="<i class=\"jstree-icon jstree-ocl\" role=\"presentation\"></i><a class=\"jstree-anchor\" href=\"#\" tabindex=\"-1\" id=\""+theID+"anchor\"><i class=\"jstree-icon jstree-themeicon\" role=\"presentation\"></i>"+newName+"</a>";
                //setTimeout(function() {$("#temporary").remove();}, 3000);
                //$('#tree').jstree("refresh");
                //setTimeout(function() {$("#temporaryP").remove();}, 3000);
                console.log("SUCCESS!");
                window.opener.location.reload(true);
                window.close();
            }
        })

    });





    $(document).on('click', '#textAreaCancel', function () {
        window.close();
    });

});