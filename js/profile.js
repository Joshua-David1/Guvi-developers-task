$(document).ready(function(){

	localStorage.removeItem("username");
	var sessionId = localStorage.getItem("sessionId");

	if(sessionId != null){
		$.post("http://localhost:5000/php/get-session-id.php",{
			sessionId:sessionId
		},function(data, status){
			if(data == "[-]Session Expired"){
				localStorage.removeItem("sessionId");
				window.location.href = "http://localhost:5000/login.html";
			}
		});
	}else{
		window.location.href = "http://localhost:5000/login.html";
	}


	var username = null;
	$.post("http://localhost:5000/php/get-session-id.php",{sessionId:sessionId},function(data, status){
		username = JSON.parse(data)['username'];
		localStorage.setItem('username', username);
		getUsername(username);
		getEmail(username);
		getFullName(username);
		getPhone(username);
		getDob(username);
		getAge(username);
		getFullname_update(username);
		getPhone_update(username);
		getEmail_update(username);
	});


	function getFullname_update(username){
		$.post("http://localhost:5000/php/profile-info/getfullname.php",{
			username:username
		},function(data,status){
			$(".fullnameu").val(data);
		});		
	}


	function getPhone_update(username){
		$.post("http://localhost:5000/php/profile-info/getphone.php",{
			username:username
		},function(data,status){
			$(".phoneu").val(data);
		});
	}

	function getEmail_update(username){
		$.post("http://localhost:5000/php/profile-info/getemail.php",{
			username:username
		},function(data,status){
			$(".emailu").val(data);
		});
	}

	function getUsername(username){
		$.post("http://localhost:5000/php/profile-info/getusername.php",{
			username:username
		},function(data,status){
			// console.log(data);
			$(".username").html(data);
		});
		
	}

	function getEmail(username){
		$.post("http://localhost:5000/php/profile-info/getemail.php",{
			username:username
		},function(data,status){
			// console.log(data);
			$(".email").html(data);
		});
	}

	function getPhone(username){
		$.post("http://localhost:5000/php/profile-info/getphone.php",{
			username:username
		},function(data,status){
			$(".phone").html(data);
		});
	}

	function getDob(username){
		$.post("http://localhost:5000/php/profile-info/getdob.php",{
			username:username
		},function(data,status){
			$(".dob").html(data);
		});
	}

	function getAge(username){
		$.post("http://localhost:5000/php/profile-info/getage.php",{
			username:username
		},function(data,status){
			$(".age").html(data + " years");
		});
	}

	function getFullName(username){
		$.post("http://localhost:5000/php/profile-info/getfullname.php",{
			username:username
		},function(data,status){
			$(".fullname").html(data);
		});
	}



	// validation
	function validateChars(username){
		for(var i = 0;i < username.length;i++){
			if(username[i] == ")" || username[i] == "(" || username[i] == "@" || username[i] == "\'" || username[i] == "\"" || username[i] == "#" || username[i] == "]" || username[i] == "[" || username[i] == ";" || username[i] == ","){
				return 0;
			}
		}
		return 1;
	}


	function validateLength(field){
		if(field.length < 6){
			return 0;
		}
		return 1;
	}

	function validatePhone(number){
		if(number.length != 10){
			return 0;
		}

		let arr = [];
		for(var i = 0;i < 10;i++){
			arr.push(i);
		}

		for(var i = 0;i < number.length;i++){
			var available = 0;
			for(var j = 0;j < 10;j++){
				if(number[i] == arr[j]){
					available = 1;
					break;
				}
			}
			if(available == 0){
				return 0;
			}
		}

		return 1;
	}
	function validateEmail(email){
		for(var i = 0;i < email.length;i++){
			if(email[i] == "@"){
				return 1;
			}
		}
		return 0;
	}


	//


	var view_profile_btn = $(".view-profile-btn");
	var update_profile_btn = $(".update-profile-btn");
	$(".profile-info-div").css("display","block");
	view_profile_btn.css("border-color","white");
	view_profile_btn.click(function(){
		view_profile_btn.css("border-color","white");
		update_profile_btn.css("border-color","#2B273A");
		$(".update-profile-div").css("display","none");
		$(".profile-info-div").css("display","block");
		
	});


	update_profile_btn.click(function(){
		view_profile_btn.css("border-color","#2B273A");
		update_profile_btn.css("border-color","white");
		$(".profile-info-div").css("display","none");
		$(".update-profile-div").css("display","block");
	});


	$(".logout-btn").click(function(){
		window.location.href = "http://localhost:5000/login.html";
	});


	$(".update-btn").click(function(){
		$(".errors").css("display","none");
		$("input.form-control").css("border-color","#2B273A")
		var mail = $(".emailu").val();
		var fname = $(".fullnameu").val();
		var ph = $(".phoneu").val();
		console.log(mail);
		console.log(fname);
		console.log(ph);


		if(validateLength(fname) == 0){
			$(".min-chars").css("display","block");
			$(".fullnameu").css("border-color","red");
			return;
		}

		if(validateChars(fname) == 0){
			$(".special-chars").css("display","block");
			$(".fullnameu").css("border-color","red");
			return;
		}


		if(validateLength(mail) == 0){
			$(".min-chars").css("display","block");
			$(".emailu").css("border-color","red");
			return;
		}

		if(validateEmail(mail) == 0){
			$(".emailu").css("border-color","red");
			$(".invalid-email").css("display","block");
			return;
		}

		if(validatePhone(ph) == 0){
			$(".min-chars-phone").css("display","block");
			$(".phoneu").css("border-color","red");
			return;
		}


		$.post("http://localhost:5000/php/validate-email-reg.php",{
			email:mail
			},function(edata,status){
					if(edata == 0 || edata == '0'){
						username = localStorage.getItem('username');
						$.post("http://localhost:5000/php/update-profile.php",{
							username:username,
							fullname:fname,
							email:mail,
							phone:ph
						}, function(data,status){
							window.location.href = "http://localhost:5000/profile.html";
						});
					}else{
						$(".emailu").css("border-color","red");
						$(".existing-email").css("display","block");
						return;
					}
				});
	});

	$(".logout-btn").click(function(){
		localStorage.removeItem("sessionId");
		localStorage.removeItem('username');
		window.location.href = "http://localhost:5000/login.html";
	})

})