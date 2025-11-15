$(document).ready(function(){
    // add class to sticky section
    $("#sp-sticky").addClass("tab-expanded");
    // changes arrows on click
    $("#sp-sticky .tab-arrows").click(function(){
      $("#sp-sticky .tab-arrows span.glyphicon").toggleClass("glyphicon-menu-right glyphicon-menu-left");
      $("#sp-sticky").toggleClass("tab-expanded tab-collapsed");
    });
  });
  