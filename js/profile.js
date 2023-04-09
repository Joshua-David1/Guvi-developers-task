$(document).ready(function(){


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
		getUsername(username);
		getEmail(username);
		getFullName(username);
		getPhone(username);
		getDob(username);
		getAge(username);
	});


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
		window.location.href = "http://localhost:5000/login.html"
	});


	$(".logout-btn").click(function(){
		localStorage.removeItem("sessionId");
		window.location.href = "http://localhost:5000/login.html";
	})

})