$(document).ready(function(){
	$('.document, .phone').on('input', function () { 
		this.value = this.value.replace(/[^0-9]/g,'');
	});

	$(".login").click(function(){
		$("#formIngresa").css("display", "none");
		$("#formLogin").css("display", "block");
	});

	$(".register").click(function(){
		$("#formIngresa").css("display", "block");
		$("#formLogin").css("display", "none");
	});

    $("#formIngresa").on('submit', function(e){
		e.preventDefault();
		
		if($(".document").val().length<5 || $(".phone").val().length<10){
			$(".alert").css("display", "block");
		}else{
			var data = {
				name: $("#txtName").val(),
				email: $("#txtEmail").val(),
				type_doc:$("#slc_document").val(),
				document:$("#n_document").val(),
				number:$("#txt_number").val(),
				parent_name:$("#txt_nameParent").val(),
				parent_doc:$("#txt_docParent").val()
			};
	
			fetch('/registro', {
			  method: 'POST', 
			  body: JSON.stringify(data),
			  headers:{
				'Content-Type': 'application/json'
			  }
			})
			.then(function(res){
				return res.json();
			})
			.then(function(response){
				if(!response.ok){
					console.log(response.message);
				}else{

					if(response.message=="login"){
						$(".alert").css("display", "block");
						$(".alert").text("ya existe un usuario con estos datos");
						// let identity=JSON.parse(localStorage.getItem('identity'))
						// localStorage.setItem('userAvatar', identity.image);
						// window.location.replace('/viaje');
					}else{
						localStorage.setItem('token', response.token);
						localStorage.setItem('user', response.user.email);
						localStorage.setItem('identity', JSON.stringify(response.user));
						window.location.replace('/avatar');	
					}
				}
			})
			.catch(function(err){
				console.log('Error:', err)
			});
		}
	});
	
	$("#formLogin").on('submit', function(e){
		e.preventDefault();
		
		var data = {
			name: $("#userLogin").val(),
			email: $("#emailLogin").val()
		};

		fetch('/login', {
			method: 'POST', 
			body: JSON.stringify(data),
			headers:{
			'Content-Type': 'application/json'
			}
		})
		.then(function(res){
			return res.json();
		})
		.then(function(response){
			if(!response.ok){
				if(response.message=="not found"){
					$(".alert").css("display", "block");
					$(".alert").text("No existe ningun usuario con estos datos");
				}
			}else{
				if(response.message=="login"){
					localStorage.setItem('token', response.token);
					localStorage.setItem('user', response.user.email);
					localStorage.setItem('identity', JSON.stringify(response.user));
					
					let identity=JSON.parse(localStorage.getItem('identity'))
					localStorage.setItem('userAvatar', identity.image);
					window.location.replace('/viaje');
				}
			}
		})
		.catch(function(err){
			console.log('Error:', err)
		});
    });
});