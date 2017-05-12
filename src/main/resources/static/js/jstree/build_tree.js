$(document).ready(function() {
//------------------------------------------------------------------
//------------------------------------------------------------------
//Creates trees
//------------------------------------------------------------------
//------------------------------------------------------------------
    var numOfCategories = 0;
    $.ajax({
        'url': "categories",
        'type': "GET",
        error: function () {
            console.log("error getting information");
        },
        success: function (data) {
            numOfCategories = data;

            for (var i = 0; i <= numOfCategories; i++) {
                $('#withAjax'+i).jstree({
                    'core' : {
                        'data': {
                            'url': "getNode",
                            type: "GET",
                            'data': function (node) {
                                if(node.id === '#'){ //overrides because it trys to pass an id from the html to getNode
                                    var getClass = document.getElementById('withAjax'+i).className;
                                    console.log("This is inside the if statement after we create getclass");
                                        //getClass = getClass.substring(0, getClass.indexOf(' '));
                                    getClass = parseInt(getClass);
                                    console.log("converted getclass to an int "+getClass);
                                    return{'getClass': getClass};
                                }
                                return {'id': node.id}; //ignore this
                            }
                        }
                    }
                });

            }
        }
    })


//------------------------------------------------------------------
//------------------------------------------------------------------
//When User Selects a file based node
//------------------------------------------------------------------
//------------------------------------------------------------------

//---------------------------------
//Checks to see if editable is already open, then opens one for the clicked
//---------------------------------
    $(document).on('dblclick.jstree', '.jstree-leaf', function(e) {
        e.stopPropagation();
        var theNode = this;
        var theText = document.getElementById(this.id).innerText;
        if(document.getElementById('newname')) {
            console.log( document.getElementById('newname'));
            console.log(document.getElementById('newname').className);
            $.ajax({
                'url': "dontChangeName",
                'type': "GET",
                'data': {'theID': document.getElementById('newname').className},
                error: function () {
                    console.log("Couldn't get the name back when not saved");
                },
                success: function (data) {
                    document.getElementById(data.id).innerHTML = "<i class=\"jstree-icon jstree-ocl\" role=\"presentation\"></i><a class=\"jstree-anchor\" href=\"#\" tabindex=\"-1\" id=\"" + data.id + "anchor\"><i class=\"jstree-icon jstree-themeicon\" role=\"presentation\"></i>" + data.text + "</a>";
                    if (document.getElementById('textarea' + data.id)) {
                        console.log("We found an open change text");
                    }
                }
            });
        }
            $.ajax({
                'url': "getInline",
                'type': "GET",
                'data': {'theID': theNode.id},
                error: function () {
                    console.log("error getting information");
                },
                success: function (data) {
                    document.getElementById(theNode.id).innerHTML = "<input class=\"" + theNode.id + "\" id=\"newname\" value=\"" + theText + "\" class=\"form-control input-md\" required=\"\" type=\"text\"/>";
                    $(theNode).append("<div id=\"holdingtext\"><textarea rows=\"6\" cols=\"100\" id=\"textarea" + theNode.id + "\" class=\"textarea" + theNode.id + "\">" + data + "</textarea><br/><button class=\"textAreaButton textarea" + theNode.id + "\" id=\"" + theNode.id + "\" >Save Changes</button><button class=\"textAreaDelete\" id=\"" + theNode.id + "\" >Delete</button></div>");
                }
            })
    });

    //---------------------------------
    //Delete File type Node
    //---------------------------------

    $(document).on('click','.textAreaDelete',function () {
        var theID = this.id;
        var r = confirm("Are you sure that you want to delete this item?");
        if(r == true){
            $.ajax({
                'url': "deleteNode",
                'type': "GET",
                'data': {'theID':theID},
                error:function(){
                    console.log("error saving information");
                },
                success:function(data){
                    location.reload();
                    $("#editBanner").append("<div id=\"temporary\"><div class=\"col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 main alert alert-success\">Delete Successful</div></div>");
                    setTimeout(function() {$("#temporary").remove();}, 3000);
                }
            })
        }
    });

//---------------------------------
//Saves edited text
//---------------------------------

    $(document).on('click','.textAreaButton',function () {
        var theID = this.id;
        var newText = document.getElementById("textarea"+theID).value;
        document.getElementById("holdingtext").remove();
        $.ajax({
            'url': "saveText",
            'type': "GET",
            'data': {'theID':theID, 'newText':newText},
            error:function(){
                console.log("error saving information");
            },
            success:function(data){
                //$("#editBanner").append("<div id=\"temporary\" class=\"col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 main alert alert-success\">Save was successful!</div>");
                //setTimeout(function() {$("#temporary").remove();}, 3000);
            }
        })
        var newName = document.getElementById("newname").value;
        $.ajax({
            'url': "changeName",
            'type': "GET",
            'data': {'theID':theID, 'newName':newName},
            error:function(){
                $("#editBanner").append("<div id=\"temporary\"><div class=\"col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 main alert alert-danger\">An error occured</div></div>");
                setTimeout(function() {$("#temporary").remove();}, 3000);
                console.log("error saving information");
            },
            success:function(data){
                $("#editBanner").append("<div id=\"temporary\"><div class=\"col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 main alert alert-success\">Save was successful!</div></div>");
                document.getElementById(theID).innerHTML="<i class=\"jstree-icon jstree-ocl\" role=\"presentation\"></i><a class=\"jstree-anchor\" href=\"#\" tabindex=\"-1\" id=\""+theID+"anchor\"><i class=\"jstree-icon jstree-themeicon\" role=\"presentation\"></i>"+data.text+"</a>";
                setTimeout(function() {$("#temporary").remove();}, 3000);
                //setTimeout(function() {$("#temporaryP").remove();}, 3000);
            }
        })

    });
//------------------------------------------------------------------
//------------------------------------------------------------------
//When User Selects a CATEGORY
//------------------------------------------------------------------
//------------------------------------------------------------------

//---------------------------------
//Checks to see if another name change is open, then opens this one
//---------------------------------
    $(document).on('dblclick', '.panel-title', function(){
        var theText = document.getElementById(this.id).innerText;
        if(document.getElementById('newcategoryname')) {
            $.ajax({
                'url': "dontChangeCategoryName",
                'type': "GET",
                'data': {'theID': document.getElementById('newcategoryname').className},
                error: function () {
                    console.log("Couldn't get the name back when not saved");
                },
                success: function (data) {
                    console.log("FOUND ONE!");
                    console.log(data);
                    document.getElementById("panel"+document.getElementById("newCategoryNameButton").className).innerHTML = data.name;
                    if (document.getElementById('textarea' + data.id)) {
                        console.log("We found an open change text");
                    }
                }
            });
        }
        var idInt = parseInt(this.id.substring(5,this.id.length));
        var categoryID = document.getElementById('withAjax'+idInt).className
        categoryID = categoryID.substring(0, categoryID.indexOf(' '));
        console.log("after the parse:"+categoryID);
        document.getElementById(this.id).innerHTML="<input class=\""+categoryID+"\" id=\"newcategoryname\" value=\""+theText+"\" class=\"form-control input-md\" required=\"\" type=\"text\"/><button id=\"newCategoryNameButton\" class=\""+idInt.toString()+"\" >Save Name</button><button id=\""+categoryID+"\" class=\"deleteCategoryNode\">Delete</button>";

    })
    //---------------------------------
    //Delete Category
    //---------------------------------

    $(document).on('click','.deleteCategoryNode',function () {
        var theID = this.id;
        var r = confirm("Are you sure that you want to delete this item?");
        if(r == true) {
            $.ajax({
                'url': "deleteCategory",
                'type': "GET",
                'data': {'theID': theID},
                error: function () {
                    console.log("error saving information");
                },
                success: function (data) {
                    location.reload();
                    $("#editBanner").append("<div id=\"temporary\"><div class=\"col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 main alert alert-success\">Delete Successful</div></div>");
                    setTimeout(function () {
                        $("#temporary").remove();
                    }, 3000);
                }
            })
        }
    });


    //---------------------------------
//saves the name change
//---------------------------------
    $(document).on('click','#newCategoryNameButton',function(){
        console.log("THE SAVE BUTTON WAS PRESSED");
        var ID = document.getElementById("newcategoryname").className;
        var intID = document.getElementById("newCategoryNameButton").className;
        var newName = document.getElementById("newcategoryname").value;


        $.ajax({
            'url': "changeNameCategory",
            'type': "GET",
            'data': {'theID':ID, 'newName':newName},
            error:function(){
                $("#editBanner").append("<div id=\"temporary\"><div class=\"col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 main alert alert-danger\">An error occured</div></div>");
                setTimeout(function() {$("#temporary").remove();}, 3000);
                console.log("error saving information");
            },
            success:function(data){
                $("#editBanner").append("<div id=\"temporary\"><div class=\"col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 main alert alert-success\">Save was successful!</div></div>");
                document.getElementById('panel'+intID).innerHTML=data.name;
                setTimeout(function() {$("#temporary").remove();}, 3000);
            }
        })
    })

//------------------------------------------------------------------
//------------------------------------------------------------------
//When User Selects a folder based node
//------------------------------------------------------------------
//------------------------------------------------------------------

//---------------------------------
//for open folder
//Checks to see if another name change is open, then opens this one
//---------------------------------
    $(document).on('dblclick.jstree', '.jstree-open', function(e) {
        e.stopPropagation();
        var theText = document.getElementById(this.id).innerText;
        if(document.getElementById('newname')) {
            console.log( document.getElementById('newname'));
            console.log(document.getElementById('newname').className);
            $.ajax({
                'url': "dontChangeName",
                'type': "GET",
                'data': {'theID': document.getElementById('newname').className},
                error: function () {
                    console.log("Couldn't get the name back when not saved");
                },
                success: function (data) {
                    document.getElementById(data.id).innerHTML = "<i class=\"jstree-icon jstree-ocl\" role=\"presentation\"></i><a class=\"jstree-anchor\" href=\"#\" tabindex=\"-1\" id=\"" + data.id + "anchor\"><i class=\"jstree-icon jstree-themeicon\" role=\"presentation\"></i>" + data.text + "</a>";
                    if (document.getElementById('textarea' + data.id)) {
                        console.log("We found an open change text");
                    }
                }
            });
        }
        theText = theText.substring(0,theText.indexOf('\n'));
        document.getElementById(this.id).innerHTML="<input class=\""+this.id+"\" id=\"newname\" value=\""+theText+"\" class=\"form-control input-md\" required=\"\" type=\"text\"/><button class=\"newNameButton newName"+this.id+"\" id=\"newNameButton"+this.id+"\" >Save Name</button><button class=\"deleteFolderButton\" id=\""+this.id+"\">Delete</button>";
    });
//---------------------------------
//for closed folder
//Checks to see if another name change is open, then opens this one
//---------------------------------
    $(document).on('dblclick.jstree', '.jstree-closed', function(e) {
        e.stopPropagation();
        var theText = document.getElementById(this.id).innerText;
        if(document.getElementById('newname')) {
            console.log( document.getElementById('newname'));
            console.log(document.getElementById('newname').className);
            $.ajax({
                'url': "dontChangeName",
                'type': "GET",
                'data': {'theID': document.getElementById('newname').className},
                error: function () {
                    console.log("Couldn't get the name back when not saved");
                },
                success: function (data) {
                    document.getElementById(data.id).innerHTML = "<i class=\"jstree-icon jstree-ocl\" role=\"presentation\"></i><a class=\"jstree-anchor\" href=\"#\" tabindex=\"-1\" id=\"" + data.id + "anchor\"><i class=\"jstree-icon jstree-themeicon\" role=\"presentation\"></i>" + data.text + "</a>";
                    if (document.getElementById('textarea' + data.id)) {
                        console.log("We found an open change text");
                    }
                }
            });
        }
        theText = theText.substring(0,theText.indexOf('\n'));
        document.getElementById(this.id).innerHTML="<input class=\""+this.id+"\" id=\"newname\" value=\""+theText+"\" class=\"form-control input-md\" required=\"\" type=\"text\"/><button class=\"newNameButton newName"+this.id+"\" id=\"newNameButton"+this.id+"\" >Save Name</button><button id=\""+this.id+"\" class=\"deleteFolderButton\">Delete</button>";
    });
    //---------------------------------
    //Delete Folder type Node
    //---------------------------------

    $(document).on('click','.deleteFolderButton',function () {
        var theID = this.id;
        var r = confirm("Are you sure that you want to delete this item?");
        if(r == true) {
            $.ajax({
                'url': "deleteNode",
                'type': "GET",
                'data': {'theID': theID},
                error: function () {
                    console.log("error saving information");
                },
                success: function (data) {
                    location.reload();
                    $("#editBanner").append("<div id=\"temporary\"><div class=\"col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 main alert alert-success\">Delete Successful</div></div>");
                    setTimeout(function () {
                        $("#temporary").remove();
                    }, 3000);
                }
            })
        }
    });

//---------------------------------
//saves the name change
//---------------------------------
    $(document).on('click','.newNameButton',function(){
        var theID = document.getElementById("newname").className;
        var newName = document.getElementById("newname").value;
        $.ajax({
            'url': "changeName",
            'type': "GET",
            'data': {'theID':theID, 'newName':newName},
            error:function(){
                $("#editBanner").append("<div id=\"temporary\"><div class=\"col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 main alert alert-danger\">An error occured</div></div>");
                setTimeout(function() {$("#temporary").remove();}, 3000);
                console.log("error saving information");
            },
            success:function(data){
                $("#editBanner").append("<div id=\"temporary\"><div class=\"col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 main alert alert-success\">Save was successful!</div></div>");
                document.getElementById(theID).innerHTML="<i class=\"jstree-icon jstree-ocl\" role=\"presentation\"></i><a class=\"jstree-anchor\" href=\"#\" tabindex=\"-1\" id=\""+theID+"anchor\"><i class=\"jstree-icon jstree-themeicon\" role=\"presentation\"></i>"+data.text+"</a>";
                setTimeout(function() {$("#temporary").remove();}, 3000);
            }
        })
    })


//------------------------------------------------------------------
//------------------------------------------------------------------
//For Deleting
//------------------------------------------------------------------
//------------------------------------------------------------------

//---------------------------------
//Drag and drop for Nodes
//---------------------------------
    /*
$(function () {
    $(".withAjax").jstree({
        "core" : {
            "check_callback" : true
        },
        "plugins" : [ "dnd" ]
    })
        .bind("move_node.jstree",function(e,data){
            console.log("stuff got moved");
        });

});
*/


});//--------end of file---------


