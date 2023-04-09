$(document).ready(function(){

	var sessionId = localStorage.getItem("sessionId");
	if(sessionId != null){
		$.post("http://localhost:5000/php/get-session-id.php",{
			sessionId:sessionId
		},function(data, status){
			if(data == "[-]Session Expired"){
				localStorage.removeItem("sessionId");
			}else{
				window.location.href = "http://localhost:5000/profile.html";
			};
		});
	}

	function validateEmail(email){
		for(var i = 0;i < email.length;i++){
			if(email[i] == "@"){
				return 1;
			}
		}
		return 0;
	}

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

	var reg_btn = $(".login-btn");
	var fullname = $("#fullname-input");
	var email = $("#email-input");
	var username = $("#username-input");
	var password = $("#password-input");
	var phone = $("#phone-input");
	var date = $("#date-input");
	var age = 0;
	reg_btn.click(()=>{
		$(".errors").css("display","none");
		$("input.form-control").css("border-color","#2B273A")

		if(validateLength(fullname.val()) == 0){
			$(".min-chars").css("display","block");
			fullname.css("border-color","red");
			return;
		}

		if(validateChars(fullname.val()) == 0){
			$(".special-chars").css("display","block");
			fullname.css("border-color","red");
			return;
		}

		if(validateLength(email.val()) == 0){
			$(".min-chars").css("display","block");
			email.css("border-color","red");
			return;
		}

		if(validateEmail(email.val()) == 0){
			email.css("border-color","red");
			$(".invalid-email").css("display","block");
			return;
		}

		if(validateLength(username.val()) == 0){
			$(".min-chars").css("display","block");
			username.css("border-color","red");
			return;
		}

		if(validateChars(username.val()) == 0){
			$(".special-chars").css("display","block");
			username.css("border-color","red");
			return;
		}

		if(validateLength(password.val()) == 0){
			$(".min-chars").css("display","block");
			password.css("border-color","red");
			return;
		}

		if(validateChars(password.val()) == 0){
			$(".special-chars").css("display","block");
			password.css("border-color","red");
			return;
		}

		if(validatePhone(phone.val()) == 0){
			$(".min-chars-phone").css("display","block");
			phone.css("border-color","red");
			return;
		}

		if(date.val() == ""){
			$(".empty-date").css("display","block");
			date.css("border-color","red");
			return;
		};


		var dob = new Date(date.val());
		var curDate = new Date();
		var diff = Math.abs(curDate - dob);
		age = Math.round(diff/(1000 * 3600 * 24) / 365);

		var reg_details = {
			fullname:fullname.val(),
			email:email.val(),
			username:username.val(),
			password:password.val(),
			phone:phone.val(),
			date:date.val(),
			age:age
		}

		console.log(reg_details);

		$.post("http://localhost:5000/php/validate-registration.php",{
			username:username.val()
		}, function(vdata,status){
			if(vdata == 0 || vdata == "0"){

				$.post("http://localhost:5000/php/validate-email-reg.php",{
					email:email.val()
				},function(edata,status){
					if(edata == 0 || edata == '0'){
						$.post("http://localhost:5000/php/register.php",reg_details,function(data, status){
							if(data){
								$.post("http://localhost:5000/php/set-session-id.php",{
										username:username,
										password:password
									},function(sdata, status){
										localStorage.setItem("sessionId",sdata);
										window.location.href = "http://localhost:5000/profile.html";
								});
							}
							else{
								alert("[-]Problem");
							}
						});
					}else{
						email.css("border-color","red");
						$(".existing-email").css("display","block");
						return;
					}
				});


			}else{
				username.css("border-color","red");
				$(".existing-username").css("display","block");
				return;
			}
		});



	});


});