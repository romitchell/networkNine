/**
 * Created by bills on 4/9/15.
 */
$(function () {
    /*
    // 6 create an instance when the DOM is ready
    $('#jstree').jstree();
    // 7 bind to events triggered on the tree
    $('#jstree').on("changed.jstree", function (e, data) {
        console.log(data.selected);
    });
    // 8 interact with the tree - either way is OK
    $('button').on('click', function () {
        $('#jstree').jstree(true).select_node('child_node_1');
        $('#jstree').jstree('select_node', 'child_node_1');
        $.jstree.reference('#jstree').select_node('child_node_1');
    });
*/

    // 6 create an instance when the DOM is ready
    $('.jstree').jstree();
    // 7 bind to events triggered on the tree
    // 8 interact with the tree - either way is OK
    $('.leaf-click').on('click', function () {
        if($(this).is_open(function(){
                $(this).children().eq(1).children().eq(1).removeClass('glyphicon-folder-close').addClass('glyphicon-folder-open');
            }));
        if($(this).is_closed(function(){
                $(this).children().eq(1).children().eq(1).removeClass('glyphicon-folder-open').addClass('glyphicon-folder-close');
            }));
        $('.jstree').jstree(true).select_node('.child_node_1');
        $('.jstree').jstree('select_node', 'child_node_1');
        $.jstree.reference('.jstree').select_node('child_node_1');
    });

    $('.leaf-click').on('after_open.jstree', function () {
        console.log($(this).children());
        $(this).children().first().removeClass('glyphicon-folder-close').addClass('glyphicon-folder-open');
    });




});

