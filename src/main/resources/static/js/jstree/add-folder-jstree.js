/**
 * Created by bills on 3/8/16.
 */


$(document).ready(function() {

    $(document).on('click','#AddFolder',function(){
        var go = false;
        var parent = null;
        var foldername = document.getElementById("foldernameinput").value;
        var newOP = document.getElementById("ordinalinput").value;
        console.log(newOP);
        console.log(foldername);
            try {
                parent = document.getElementById("parentid").value;
                if (foldername != "") {
                    go = true;
                }
                else{
                    $("#editBanner").append("<div id=\"temporary\"><div class=\"col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 main alert alert-danger\">Make sure you have the name field filled out</div></div>");
                    $("#editFolderBanner").append("<div id=\"temporaryFolder\"><div class=\"col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 main alert alert-danger\">Make sure you have the name field filled out</div></div>");
                    setTimeout(function () {
                        $("#temporaryFolder").remove();
                    }, 5000);
                    setTimeout(function () {
                        $("#temporary").remove();
                    }, 5000);
                }
            }catch(NoParent){
                $("#editBanner").append("<div id=\"temporary\"><div class=\"col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 main alert alert-danger\">Make sure you have a file highlighted above to be the parent folder</div></div>");
                $("#editFolderBanner").append("<div id=\"temporaryFolder\"><div class=\"col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 main alert alert-danger\">Make sure you have a file highlighted above to be the parent folder</div></div>");
                setTimeout(function () {
                    $("#temporaryFolder").remove();
                }, 5000);
                setTimeout(function () {
                    $("#temporary").remove();
                }, 5000);
            }

        if(go==true) {
            $.ajax({
                'url': "addFolder",
                'type': "GET",
                'data': {
                    'foldernameinput': foldername,
                    'selectedJstreeFolder': parent,
                    'newOP': newOP
                },
                error: function () {
                    $("#editBanner").append("<div id=\"temporary\"><div class=\"col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 main alert alert-danger\">An error occured</div></div>");
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


    $(document).on('click','#saveFolder',function(){
        var theID = document.getElementById("theId").value;
        var newName = document.getElementById("newName").value;
        var newOP = document.getElementById("newOP").value;
        $.ajax({
            'url': "changeNameFolder",
            'type': "GET",
            'data': {'theID':theID, 'newName':newName, 'newOP':newOP},
            error:function(){
                $("#editBanner").append("<div id=\"temporary\"><div class=\"col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 main alert alert-danger\">An error occured</div></div>");
                setTimeout(function() {$("#temporary").remove();}, 3000);
                console.log("error saving information");
                $('#tree').jstree("refresh");
            },
            success:function(data){
                console.log("SUCCESS!");
                window.opener.location.reload(true);
                window.close();
            }
        })
    })


    $(document).on('click','#cancelFolderChange',function() {
        window.close();
    });
});

