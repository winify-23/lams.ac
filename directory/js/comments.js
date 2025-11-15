var comments = {
	
	helpful:function(){
		data = phonebook.form_data();
		data.timer = phonebook.timer;
		data.helpful = 1;
		this.send_request(data);
	},
	
	not_helpful:function(){
		data = phonebook.form_data();
		data.timer = phonebook.timer;
		
		modal.url({
			'title_bar':'off',
			'url':'/wtsc_apps/uhs_directory/version2/comments/helpful.php',
			'data':data,
			'width':'300',
			'open':function(){
				modal.bind_click();
				$('#comment').keyup(function(e) {
					if (e.keyCode == 13) {
						comments.send_request(comments.collect_data());
					}
				});	
			},
			
			'buttons':{
				'Submit':function(){
					comments.send_request(comments.collect_data());
				},
			}
		});
		
		
	},
	feedback:function(){
		modal.url({
			url:'comments/feedback.php',
			title_bar:'off',
			'open':function(){
				modal.bind_click();
				$('#feedback_comment').keyup(function(e) {
					if (e.keyCode == 13) {
						comments.submit_feedback();
					}
				});	
			},
			'buttons':{
				'Submit':function(){
					comments.submit_feedback();
				},
				'Close':function(){
					modal.close();	
				}
			}
		});
		return false;
	},
	
	check_feedback_form:function(){
		var data = {
			"name":$('#name').val(),
			"email":$('#email').val(),
			"comment":$('#feedback_comment').val(),
			"mod":$('#mod').val()
		};
		
		//check to make sure there is something in the form.
		var errors = '';
		
		if (data.name.search(/[a-zA-Z]{3}/) == -1){
				errors += "<li>You must enter a name.</li>";
		}
		
		if (data.email.search(/^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$/) == -1){
			errors += "<li>You must enter valid email.</li>";
		}
		
		if (data.comment.search(/[a-zA-Z]{3}/) == -1){
			errors += "<li>You must enter a comment.</li>";
		}
		
		
		
		if(errors!=''){
			$('#feedback_error').html("<ul>"+errors+"</ul>");
			$('#feedback_error').addClass('feedback_error');
			
			return false;
		}else{
			return data;	
		}
	},
	
	submit_feedback:function(){
		
		
		var data = this.check_feedback_form();
		
		if (data == false){
			return;	
		}
		
				
		$.ajax({
			'url':'/wtsc_apps/uhs_directory/version2/comments/helpful_process.php',
			'type':'post',
			'data': data,
			'success':function(data){
				if (modal.is_open){
					modal.close();	
					
				}
				if (data == 'ok'){
					modal.open({
						title_bar:'off',
						content:'Thank you',
						'width':'300',
						open:function(){
							setTimeout("modal.close()",1000);	
						}
					});
				}
			}
		});
		
		return false;
	},
	

	collect_data:function(){
		//get the data from the form
		var data = {};
		
		var f = $('#helpful_comments :input').each(function(idx,obj){
			data[obj.name]=$(obj).val();
		});		
		return data;
	},
	
	send_request:function(data){
				
		$.ajax({
			'url':'/wtsc_apps/uhs_directory/version2/comments/helpful_process.php',
			'type':'post',
			'data': data,
			'success':function(data){
				if (modal.is_open){
					modal.close();	
					
				}
				if (data == 'ok'){
					comments.remove_links();
				}
			}
		});
		
	},
	
	add_links:function(){
		var div = "<div id='comment_area'><p class=\"helpful\"><h2>Was this search helpful?"
		+ "<button onclick=\"javascript:comments.helpful()\" class=\"btn btn-primary\">yes</button> <button onclick=\"javascript:comments.not_helpful()\" class=\"btn btn-primary\">no</button></h2></div>";
		
		$('#qualifiers').after(div);
	},
	remove_links:function(){
		$('#comment_area').remove();
		modal.open({
			title_bar:'off',
			content:'Thank you',
			'width':'300',
			open:function(){
				setTimeout("modal.close()",1000);	
			}
		});
		
	}
	
}

