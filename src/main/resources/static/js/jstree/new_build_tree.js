$(document).ready(function() {


//------------------------------------------------------------------
//------------------------------------------------------------------
//Creates trees
//------------------------------------------------------------------
//------------------------------------------------------------------
    $('#tree').jstree({
        'core' : {
            'data' : {
                'url' : 'getTree',
                'data' : function (node) {
                    return {'id' : node.id,
                    'li_attr':{'class':'jstree-node jstree-closed'}};
                },
                success:function(data){
                    //console.log(data);

                }
            }
        },
        "types" : {
            "#" : {
                "valid_children" : ["root"]
            },
            "root" : {
                "icon" : "/static/3.1.1/assets/images/tree_icon.png",
                "valid_children" : ["default"]
            },
            "default" : {
                "valid_children" : ["default","file"]
            },
            "file" : {
                "icon" : "glyphicon glyphicon-file",
                "valid_children" : []
            }
        },
        "plugins" : [
             "dnd", "search", "state", "types", "wholerow", "sort", "themes", "html_data", "ui", "crrm", "contextmenu"
        ],
        "contextmenu": {
            "items": function ($node) {
                return {
                    "View Info": {
                        "label": "View Info",
                        "action": function (obj) {
                            theId = $("li[aria-selected=true]")[0].id;
                            window.open("view-edit?type=view&theId="+theId, 'window', 'width=650,height=400');
                        }
                    },
                    "New Folder": {
                        "label": "New Folder",
                        "action": function (obj) {
                            parentId = $("li[aria-selected=true]")[0].id;
                            if(parentId.charAt(0)=='c') {
                                window.open("add-folder?parentId=" + parentId, 'window', 'width=650,height=400');
                            }
                            else if(parentId.charAt(0)=='r'){
                                $("#editBanner").append("<div id=\"temporary\"><div class=\"col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 main alert alert-danger\">Cannot add a folder under file</div></div>");
                                setTimeout(function() {$("#temporary").remove();}, 5000);
                            }
                        }
                    },
                    "New File": {
                        "label": "New File",
                        "action": function (obj) {
                            parentId = $("li[aria-selected=true]")[0].id;
                            if(parentId.charAt(0)=='c') {
                                window.open("add-file?parentId=" + parentId, 'window', 'width=650,height=800');
                            }
                            else if(parentId.charAt(0)=='r'){
                                $("#editBanner").append("<div id=\"temporary\"><div class=\"col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 main alert alert-danger\">Cannot add a file under another file</div></div>");
                                setTimeout(function() {$("#temporary").remove();}, 5000);
                            }
                        }
                    },
                    "Edit": {
                        "label": "Edit",
                        "action": function (obj) {
                            theId = $("li[aria-selected=true]")[0].id;
                            window.open("view-edit?type=edit&theId="+theId, 'window', 'width=650,height=400');
                        }
                    },
                    "Delete": {
                        "label": "Delete",
                        "action": function (obj) {
                            theId = $("li[aria-selected=true]")[0].id;
                            var r = confirm("Are you sure that you want to delete this item?");
                            if(r == true) {
                                if(theId.charAt(0)=='c') {
                                    $.ajax({
                                        'url': "deleteFolder",
                                        'type': "GET",
                                        'data': {'theID': theId},
                                        error: function () {
                                            console.log("error saving information");
                                        },
                                        success: function (data) {
                                            $('#tree').jstree("refresh");
                                            $("#editBanner").append("<div id=\"temporary\"><div class=\"col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 main alert alert-success\">Delete Successful</div></div>");
                                            setTimeout(function () {
                                                $("#temporary").remove();
                                            }, 3000);
                                        }
                                    })
                                }
                                else if(theId.charAt(0)=='r') {
                                    $.ajax({
                                        'url': "deleteFile",
                                        'type': "GET",
                                        'data': {'theID':theId},
                                        error:function(){
                                            console.log("error saving information");
                                        },
                                        success:function(data){
                                            $('#tree').jstree("refresh");
                                            $("#editBanner").append("<div id=\"temporary\"><div class=\"col-sm-12 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 main alert alert-success\">Delete Successful</div></div>");
                                            setTimeout(function() {$("#temporary").remove();}, 3000);
                                        }
                                    })
                                }
                            }
                        }
                    }
                };
            }
        }

    })



})