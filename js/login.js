$(document).ready(function(){


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

	$(".login-btn").click(() => {
		$("#username-input").css("border-color","#2B273A");
		$("#password-input").css("border-color","#2B273A")
		$(".errors").css("display","none");
		let username = $("#username-input").val();
		let password = $("#password-input").val();

		if(validateChars(username) == 0){
			$("#username-input").css("border-color","red");
			$(".unknown-user").css("display","block");
			return;
		}


		if(validateLength(username) == 0){
			$("#username-input").css("border-color","red");
			$(".unknown-user").css("display","block");
			return;
		}

		if(validateChars(password) == 0){
			$("#password-input").css("border-color","red");
			$(".incorrect-password").css("display","block");
			return;
		}

		if(validateLength(password) == 0){
			$("#password-input").css("border-color","red");
			$(".incorrect-password").css("display","block");
			return;
		}


		$.post("http://localhost:5000/php/validate-username-login.php", {
			username: username
		},(data, status) => {
			if(data == 1 || data == "1"){
				$.post("http://localhost:5000/php/validate-password-login.php",{
					username:username,
					password:password
				},(pdata, status) => {
					if(pdata == 1 || pdata == "1"){
						window.location.href = "http://localhost:5000/profile.html";
					}else{
						$("#password-input").css("border-color","red");
						$(".incorrect-password").css("display","block");
						return;	
					}
				});
			}else{
				$("#username-input").css("border-color","red");
				$(".unknown-user").css("display","block");
				return;
			}
		});
	});


})