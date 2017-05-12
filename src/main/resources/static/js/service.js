/**
 * Created by bills on 2/23/15.
 */

$(document).ready(function(){
    var doorNames = ['VC', 'DC', 'DC'],
        csrfHeaders = {};

    // get a csrf token to use
    $.ajax({
        type: 'GET',
        url: '/api/csrf',
        success: function(csrf) {
            csrfHeaders[csrf.headerName] = csrf.token;
        }
    });

    $.ajax({
        type: 'GET',
        url: '/api/chat/door',
        error: function(err){
            console.error(err);
        },
        success: function(data) {
            $.each(data, function(index, door) {
                var el = $('.chat-door-button[data-id="' + door.id + '"]');
                if (door.open) {
                    el.removeClass('btn-danger');
                    el.addClass('btn-success');
                    el.find('.status').html(doorNames[door.id-1] + ' Chat is Open');
                } else {
                    el.removeClass('btn-success');
                    el.addClass('btn-danger');
                    el.find('.status').html(doorNames[door.id-1] +' Chat is Closed');
                }
            });
        }
    });

    $.ajax({
        type: 'GET',
        url: '/api/texting/door',
        error: function(err){
            console.error(err);
        },
        success: function(data) {
            $.each(data, function(index, door) {
                var el = $('.texting-door-button[data-id="' + door.id + '"]');
                if (door.open) {
                    el.removeClass('btn-danger');
                    el.addClass('btn-success');
                    el.find('.status').html(doorNames[door.id-1] + ' Text is Open');
                } else {
                    el.removeClass('btn-success');
                    el.addClass('btn-danger');
                    el.find('.status').html(doorNames[door.id-1] + ' Text is Closed');
                }
            });
        }
    });

    $.ajax({
        type: 'GET',
        url: '/api/softphone/door',
        error: function(err){
            console.error(err);
        },
        success: function(data) {
            $.each(data, function(index, door) {
                var el = $('.softphone-door-button[data-id="' + door.id + '"]');
                if (door.doorOpen) {
                    el.removeClass('btn-danger');
                    el.addClass('btn-success');
                    el.find('.status').html(doorNames[door.id-1] + ' Softphone is Open');
                } else {
                    el.removeClass('btn-success');
                    el.addClass('btn-danger');
                    el.find('.status').html(doorNames[door.id-1] + ' Softphone is Closed');
                }
            });
        }
    });

    $('.chat-door-button').click(function() {
        var $self = $(this),
            id = $self.attr('data-id');

        $.ajax({
            type: 'PUT',
            url: '/api/chat/door/' + id,
            headers: csrfHeaders,
            error: function(err) {
                console.error(err);
                $('#display_area').append("<p>error</p>");
            },
            success: function(data) {
                if (data) {
                    $self.removeClass("btn-danger");
                    $self.addClass("btn-success");
                    $self.find('.status').html(doorNames[id - 1] + ' Chat is Open');
                } else {
                    $self.removeClass("btn-success");
                    $self.addClass("btn-danger");
                    $self.find('.status').html(doorNames[id-1] + ' Chat is Closed');
                }
            }
        })
    });

    $('.texting-door-button').click(function() {
        var $self = $(this),
            id = $self.attr('data-id');

        $.ajax({
            type: 'PUT',
            url: '/api/texting/door/' + id,
            headers: csrfHeaders,
            error: function(err) {
                console.error(err);
                $('#display_area').append("<p>error</p>");
            },
            success: function(data) {
                if (data) {
                    $self.removeClass("btn-danger");
                    $self.addClass("btn-success");
                    $self.find('.status').html(doorNames[id-1] + ' Text is Open');
                } else {
                    $self.removeClass("btn-success");
                    $self.addClass("btn-danger");
                    $self.find('.status').html(doorNames[id-1] + ' Text is Closed');
                }
            }
        });
    });

    $('.softphone-door-button').click(function() {
        var $self = $(this),
            id = $self.attr('data-id');

        $.ajax({
            type: 'PUT',
            url: '/api/softphone/door/' + id,
            headers: csrfHeaders,
            error: function(err) {
                console.error(err);
                $('#display_area').append("<p>error</p>");
            },
            success: function(door) {
                if (door.doorOpen) {
                    $self.removeClass("btn-danger");
                    $self.addClass("btn-success");
                    $self.find('.status').html(doorNames[door.id-1] + ' Softphone is Open');
                } else {
                    $self.removeClass("btn-success");
                    $self.addClass("btn-danger");
                    $self.find('.status').html(doorNames[door.id-1] + ' Softphone is Closed');
                }
            }
        });
    });

});
