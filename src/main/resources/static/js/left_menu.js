$(document).ready(function() {

$('.sidebar > ul > li > a').click(function() {
  //$('.sidebar li').removeClass('active');
  $(this).closest('li').addClass('active');	
  var selected = $(this).next();
  if((selected.is('ul')) && (selected.is(':visible'))) {
    $(this).closest('li').removeClass('active');
    selected.slideUp('normal');
  }
  if((selected.is('ul')) && (!selected.is(':visible'))) {
    //$('.sidebar ul ul:visible').slideUp('normal');
    selected.slideDown('normal');
  }	
});

});