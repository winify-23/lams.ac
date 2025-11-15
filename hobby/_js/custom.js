$(document).ready(function() {
    runAccordionList();
});

function runAccordionList(){
    $('.accordion-list > li:first-child > .collapse').addClass('in');
    $('.accordion-list > li:first-child > button').addClass('list-button-hide');
    $('.accordion-list .list-button').click(function(e){
        e.preventDefault();
		$(this).toggleClass('list-button-hide').promise().done(function(){ $(this).siblings('.collapse').collapse('toggle'); });
    });

    $('.btn-expand-all').click(function(e){
        $(this).parent().parent().find('.accordion-list .list-button').each(function(){
            $(this).addClass('list-button-hide');
            $(this).siblings('.collapse').collapse('show');
        });
    });

    $('.btn-collapse-all').click(function(e){
        $(this).parent().parent().find('.list-button').each(function(){
            $(this).removeClass('list-button-hide');
            $(this).siblings('.collapse').collapse('hide');
        });
    });    

}