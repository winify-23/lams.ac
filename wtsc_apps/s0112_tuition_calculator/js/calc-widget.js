//widget css file
var css = $('<link />').attr({
    href:"/wtsc_apps/s0112_tuition_calculator/css/calc-widget.css",
    rel:"stylesheet",
    type:"text/css"
});
$('head').append(css);

//Add widget div
$('#tuition-calculator-widget').after('<div id="tuition-calc-widget"></div>');
$.ajax({
    "url":"/wtsc_apps/s0112_tuition_calculator/calc-widget.php",
    "success":function(data){
        $('#tuition-calc-widget').html(data);
    }
});
