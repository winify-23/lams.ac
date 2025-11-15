var jqueryui_config = {
	"css":{
		"blizard":"/cdn/jquery-ui/jquery-ui.min.css",
		"modal":"/cdn/modal/modal.min.css",
		"fonts":"/css/fonts.css"
	},
	"js":{
		"jquery":"/cdn/jquery/jquery.min.js",
		"ui":    "/cdn/jquery-ui/jquery-ui.min.js",
		"bootstrap": "/js/bootstrap-3.1.1-dist/js/bootstrap.min.js",
		"modal":"/cdn/modal/modal.min.js"
	}

};

//check hostname
var _host = document.location.hostname;  
var _a = '';
if (_host.search(/^(www\.)?uh\.edu/) < 1){
	_a = 'https://uh.edu';
}

//load css
for (i in jqueryui_config.css){	document.write('<link id="auto-'+i+'" href="'+_a+jqueryui_config.css[i]+'" rel="stylesheet" type="text/css"/>'+"\n");}
//load js
for (i in jqueryui_config.js){if (i == 'jquery' && window.jQuery){continue;}document.write('<script id="auto-'+i+'" src="'+_a+jqueryui_config.js[i]+'" ></script>'+"\n");}

//ad some style to fix z-index issue with datepicker
document.write('<sty'+'le>'+'.ui-datepicker{z-index: 101 !important;}'+'</st'+'yle>');

//there are issues with jquery modals when bootstrap is on the page.  This fixes it
//fix issues with bootstrap buttons.
try {	
	setTimeout(function(){
	var btn = $.fn.button.noConflict(); // reverts $.fn.button to jqueryui btn
	$.fn.btn = btn; // assigns bootstrap button functionality to $.fn.btn
	},2000);
}catch(e){console.log(e);}
