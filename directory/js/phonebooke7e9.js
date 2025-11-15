
var phonebook = {
url: 'proxy.php',
param:{},
'timer':0,

init:function(proxy){
	if (document.getElementById('instructions')){
		document.getElementById('instructions').style.display='none';
	}
	if (proxy){
		this.url = proxy;
	}

	this.set_default_result_area();
	this.get_params();
	this.reset_search();
	this.check_audience();


},

default_results_area:'',
set_default_result_area:function(){
	this.default_results_area = $('#uhspn_search_results').html();
},

history:{current:'',stack:[], menu:[]},

get_params:function(){
		var url = window.location.href;
		url = url.replace(/#/,'');
		var parts = url.split("?");
		if (!parts[1]){
			return;
		}

		var p = parts[1].split(/&/);
		for(i=0; i < p.length; i++){
			var t = p[i].split(/=/);
			this.param[t[0]] = t[1];
			//set default to parameter so dropdowns show correctly
			/*
			if (this.defaults[t[0]]){
				this.defaults[t[0]].form_value = t[1];
			}else{
				this.param[t[0]] = t[1];
			}
			*/
		}
},
set_dd_from_param:0,
set_dropdowns_from_param:function(){
	//set drop downs to values in the form to one in the form
	//check to see if there is a value set
	this.set_dd_from_param=1;
	for (var i in this.defaults){

		if (this.param[i] && this.defaults[i].form_element && this.defaults[i].select_element !=''){
			$('#'+this.defaults[i].form_element).val(this.param[i]);
			this.load_dropdown(document.getElementById(this.defaults[i].select_element),i);
		}
	}
	this.set_dd_from_param=0;
},

ajax_lock: 0,
ajax_request:null,


click_area:'body',
/* default query values */
defaults:{
	loc:		{form_value:'',text_value:'All Campuses', text_element:'adv_m_loc',  form_element:'loc',  select_element:'dropdown_campus', select_default:'Within all Universities'},
	dpt:		{form_value:'',text_value:'', text_element:'',  form_element:'dpt', select_element:'dropdown_dept', select_default:'Within all Departments' },
	div_coll:	{form_value:'',text_value:'', text_element:'',  form_element:'div_coll',  select_element:'dropdown_div_coll', select_default:'Within all Divisions/Colleges'},
	letter:		{form_value:'',text_value:'', text_element:'',  form_element:'letter'},
	mod:		{form_value:'',text_value:'', text_element:'',  form_element:'mod'},
	org:		{form_value:'',text_value:'Within all types of student groups', text_element:'adv_m_org',  form_element:'org',  select_element:'dropdown_org', select_default:'Within all types of student groups'},
	q:			{form_value:'Search for UH People',text_value:'', text_element:'', form_element:'uh_phonebook_q'}
},

current_menu:'',

set_default:function(x){
		//try{
		if (document.getElementById(this.defaults[x].form_element)){
			document.getElementById(this.defaults[x].form_element).value = this.defaults[x].form_value;
		}
		if (document.getElementById(this.defaults[x].text_element)){
			document.getElementById(this.defaults[x].text_element).innerHTML = this.defaults[x].text_value;
		}

		//if it is a drop down
		//console.log(x);
		//console.log(this.defaults[x].select_element);
		if (typeof(this.defaults[x].select_element) != 'undefined' ){
			//reset the menu
			document.getElementById(this.defaults[x].select_element).options.length = 0;
			document.getElementById(this.defaults[x].select_element).options[0] = new Option (this.defaults[x].select_default, '', false, false);

			if (this.defaults[x].form_value !=''){
				this.load_dropdown(document.getElementById(this.defaults[x].select_element),x);
			}

			//set dropdown actions
			//$('#'+this.defaults[x].select_element).on('click',function (){phonebook.load_dropdown(this,x);});
			//console.log('#'+this.defaults[x].select_element);
			$('#'+this.defaults[x].select_element).on('mousedown',function (){phonebook.load_dropdown(this,x);});
			//$('#'+this.defaults[x].select_element).focus(function (){phonebook.load_dropdown(this,x);});

		}
		//}catch(e){alert("Setting default error ("+e+'): '+x);}
},

set_defaults:function(){
	for (i in phonebook.defaults){
		this.set_default(i);
	}
},

abort_ajax:function(){
	if (this.ajax_request){
	 this.ajax_request.abort();
	}
},

load: function(c){
	//check to see if uh_phonebook_q is the default text
	if (document.getElementById(this.defaults['q'].form_element)){

		if (this.defaults['q'].form_value == document.getElementById(this.defaults['q'].form_element).value){
			//clear the q value
			document.getElementById(this.defaults['q'].form_element).value = '';
		}
	}

	if (this.ajax_lock){
		return false;
	}else{
		this.ajax_lock = 0;
		//show loading graphic
		$('#uhspn_search_results').html('<h2 align="center">Loading your search....</h2>');

		//this function will preform the command to get the search content
		  if (c){
			  //you passed in a already created query string
			  if (c.direct_link){
				 //if there is a direct link to the search
				 this.abort_ajax();
				 this.ajax_request = $.ajax({
					   url: this.url+'?'+c.direct_link,
					   success: function(responseText, textStatus, XMLHttpRequest){
						document.getElementById('uhspn_search_results').innerHTML = responseText;
						if (document.getElementById('related_links')){
								document.getElementById('related_links').style.display='';
						}

						phonebook.ajax_lock = 0;
						phonebook.extra_code();
					   },
					   beforeSend: function(){
							document.getElementById('uhspn_search_results').innerHTML = '<h2>Loading Data...</h2>';

					   },
					   error:function(){
						   document.getElementById('uhspn_search_results').innerHTML = '<h3>Request took longer than 30 seconds. Try modifying your search</h3>';
							phonebook.ajax_lock = 0;
					   },
					   timeout: 30000, /* 100 second */
					   cache: true
					   });

				 return false;
			  }

			  //get the form data just in case we need it.
			  var data = this.form_data();
			  //now merge the data together.
			  for ( cq in c.query ){
					data[cq] = c.query[cq];
			  }
			 this.do_load(data, 30);


		  }else{

			  //gather all of the variables for the search
			  var q = '';
			  //get all of the input values in the form uhsphonebook
			  var f_elements = document.uhsphonebook.getElementsByTagName('input');
			  var f_length = f_elements.length;
			  var data = this.form_data();

			 this.do_load(data, 30);



		  }
		  return false;
	}
},

extra_code:function(){
	if (document.getElementById('extra_js')){
		eval(document.getElementById('extra_js').innerHTML);
	}
},

do_load:function(data, timeout){
		var d = new Date();
		this.timer = d.getTime();
		//this function does the same load function c is the data
		this.abort_ajax();
		this.ajax_request = this.ajax_request =	$.ajax({
				   url: this.url,
				   data: data,
				   success: function(responseText, textStatus, XMLHttpRequest){
					document.getElementById('uhspn_search_results').innerHTML = responseText;
					if (document.getElementById('related_links')){
						document.getElementById('related_links').style.display='';
					}
					phonebook.ajax_lock = 0;

					//check for extra scripts
					phonebook.extra_code();

					//record the time taken in milliseconds
					d = new Date();
					phonebook.timer = (d.getTime() - phonebook.timer)/1000;

					try{
					if(comments){
						comments.add_links();
					}
					}catch(e){}

				   },
				   beforeSend: function(){
						document.getElementById('uhspn_search_results').innerHTML = '<h2>Loading Data...</h2>';

				   },
				   error:function(){
					   document.getElementById('uhspn_search_results').innerHTML = '<h3>Request took longer than '+timeout+' seconds. Try modifying your search</h3>';
						phonebook.ajax_lock = 0;
				   },
				   timeout: timeout*1000,
				   cache: true
		 });



},

set_type:function(t, letter, no_load){
	this.clear_content();

	if (letter){
		document.getElementById('letter').value =letter;
	}else{
		document.getElementById('letter').value ='';
	}

	switch (t){
		case 'abvr':
			document.getElementById('mod').value ='uhs_abvr';
			this.set_//('Summary of Abbreviations', 'show');
		break;
		case 'org_info':
			//load org info
			document.getElementById('mod').value ='org_info';
			//this.set_mode('University Organizations', 'show');
		break;
		case 'org':
			//load org info
			document.getElementById('mod').value ='content_office_groups';
			//this.set_mode('University Organizations', 'show');
		break;
		case 'int_mail':
			document.getElementById('mod').value ='internal_mail';
			//this.set_mode('University Mailing Addresses and Mail Codes', 'hide');
		break;
		case 'quick':
			document.getElementById('mod').value ='quick_contacts';
			//this.set_mode('Quick Contacts');

		break;
		default:
			//this.set_mode('People', 'show');
			document.getElementById('mod').value ='';
			document.getElementById('letter').value ='';
			return;
		break;
	}
	if (!no_load){
		this.load();
	}

},


clear_content:function(){
	$('#uhspn_search_results').html(this.default_results_area);
	$('#related_links').hide();
},

form_data:function(){

	 //get all of the input values in the form uhsphonebook
	 var f_elements = document.uhsphonebook.getElementsByTagName('input');
	 var f_length = f_elements.length;
	 var container = {};
	 for (i=0; i < f_length; i++){
		 //don't put in the string if empty
		 if (f_elements[i].value){
			 //remove special characters
			 // ( , , ",)
			var temp = f_elements[i].value;
			temp = temp.replace(/,|"/,' ');
			container[f_elements[i].name]=(temp);
		 }
	 }
	 return container;

},
//check to see if the url already has a query on it.
//this is so that you can directly link to the search
check_url_for_link: function(){
	var query = document.location.href.split(/\?/)[1];
	if (query){
		this.load({direct_link: query});
	}

},


set_adv_mod:function(mod, mod_value){
	this.mods[mod]=mod_value;
},


set_adv_value: function(x){
	//x is an object
	/*
		x.text_value = description
		x.text_area = id for the search
		x.form_value =  value for the searc
		x.form_area = area to put the value
	*/
	if ((x.text_area) || (x.form_area)){
		if (x.text_area){

			if (document.getElementById(x.text_area).tagName == 'INPUT'){
				document.getElementById(x.text_area).value = x.text_value;
			}else{
				document.getElementById(x.text_area).innerHTML = x.text_value;
			}
		}
		document.getElementById(x.form_area).value = x.form_value;
		return true;

	}else{
		return false;
	}

},
check_audience:function(x){
	if ( !document.getElementById('audience_check_boxes') ){
		return;
	}
	var acb = document.getElementById('audience_check_boxes').getElementsByTagName('input');

	var acb_length = acb.length;
	var value = '';
	var lp=0;
	//do this first to make sure they have at least one selected
	for (i=0; i<acb_length; i++){
		if (acb[i].checked){
			lp++;
		}
	}

	if (lp > 0){
		for (i=0; i<acb_length; i++){
			if (acb[i].checked){
				value += acb[i].value+'|';
			}
		}
		value=value.replace(/\|$/,'');
		//set the advanced menu
		this.set_adv_value({text_value:'',text_area:'',form_area:'pos',form_value:value});
	}else{
		if (x){
			x.checked = 'checked';
		}
	}
},
reset_audience:function(){
	if ( !document.getElementById('audience_check_boxes') ){
		return;
	}

	var acb = document.getElementById('audience_check_boxes').getElementsByTagName('input');
	var acb_length = acb.length;
	var value = '';
	for (i=0; i<acb_length; i++){
		acb[i].checked='checked';

	}
},
/* add these global varables*/
dropdown_menu:'',
dropdown_obj:'',
dropdown_data:'',
clear_dropdown:function(obj){
	try{
		var menu_obj = document.getElementById(this.defaults[obj].select_element);
		var form_value = document.getElementById(this.defaults[obj].form_element).value = '' ;
		menu_obj.options.length=0;
		menu_obj.options[0]=new Option (this.defaults[obj].select_default,'', false, false);
	}catch(e){
		alert("Clear dropdown error: "+obj);
	}
},

load_dropdown: function(t, menu){
		this.ajax_lock = 0;
		 //get the form data
		var container = this.form_data();
		switch (menu){
			case 'loc': /* campus */
				container.mod = 'dropdown_campus';
				this.clear_dropdown('dpt');
				this.clear_dropdown('div_coll');
			break;

			case 'div_coll': /* division / college */
				container.mod = 'dropdown_div_coll';
				this.clear_dropdown('dpt');
			break;

			case 'dpt': /* department */
				container.mod = 'dropdown_dept';
			break;

			case 'org': /* org menu */
				this.clear_dropdown('dpt');
				this.clear_dropdown('div_coll');
				container.mod = 'dropdown_org';
			break;

			default:
				//this.reset_search();

		}
		//before we try to load set the data in the class
		this.dropdown_menu=menu;
		this.dropdown_obj=t;

		//if the dropdown has more than one thing in it keep it
		if (t.options.length < 2 || this.set_dd_from_param){
		t.options.length=0;

		$.ajax({
			   url: this.url,
			   data: container,
			   async:false,
			   dataType:'jsonp',
			   success: function(d){

				  var api_data = d;
				  phonebook.dropdown_data=api_data;
				  phonebook.create_dropdown();
			   },
			   beforeSend: function(){


			   },
			   error:function(XMLHttpRequest, textStatus, errorThrown){
				   alert("Loading dropdown error: (" +container.mod + ") "+textStatus);
			   },
			   timeout: 10000, /* 10 second */
			   cache:true
		 });
		}



},
create_dropdown:function(){
				 var t= this.dropdown_obj;
				 var menu=this.dropdown_menu;
				 var api_data=this.dropdown_data;
				 var data_loc ={
					'dropdown_campus':'loc',
					'dropdown_div_coll':'div_coll'
				 };

				 var value = '';
				 if (document.getElementById(data_loc[t.id])){
					 value = document.getElementById(data_loc[t.id]).value;
				 }else{
					 value = null;
				 }
				 //console.log(value);
				 t.options[0]=new Option (this.defaults[menu].select_default,'', false, false);
				 for (i=0; i < api_data.data.length; i++){
				 	if (api_data.data[i].id == value){
						t.options[i+1]=new Option (api_data.data[i].name, api_data.data[i].id, false, true);
					}else{
						t.options[i+1]=new Option (api_data.data[i].name, api_data.data[i].id, false, false);
					}
				 }
},

reset_search: function(){
			this.set_defaults();
			this.reset_audience();
			this.clear_content();
},




browse_by_letter:function(x){
	//set the letter in the nav and load page
	this.set_adv_value({form_value: x, form_area:'letter'});
	this.load();

}
};
//end phonbook class

$(document).ready(function(){
	//this is load the phonebook up with the correct pieces
	phonebook.check_url_for_link();
	$('#uh_phonebook_q').bind('keypress', function(e) {
        if(e.keyCode==13){
               phonebook.load();
        }
	})	;


});
