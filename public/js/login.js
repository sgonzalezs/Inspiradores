$(document).ready(function(){
	$('.document, .phone').on('input', function () { 
		this.value = this.value.replace(/[^0-9]/g,'');
	});

	$(".login").click(function(){
		$("#formIngresa").css("display", "none");
		$("#formLogin").css("display", "block");

		$(".alert").css("display", "none");
		$(".alert").text("");
	});

	$(".register").click(function(){
		$("#formIngresa").css("display", "block");
		$("#formLogin").css("display", "none");

		$(".alert").css("display", "none");
		$(".alert").text("");
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
					if(response.message=="student not found"){
						$(".alert").css("display", "block");
						$(".alert").text("El estudiante no está registrado en la base de datos del colegio");
					}else{
						$(".alert").css("display", "block");
						$(".alert").text("Error al ingresar, revisa la información");
					}
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
						localStorage.setItem('student', JSON.stringify(response.student));
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
			document: $("#documentLogin").val(),
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
				if(response.message=="student not found"){
					$(".alert").css("display", "block");
					$(".alert").text("El estudiante no está registrado en la base de datos del colegio");
				}
			}else{
				if(response.message=="login"){
					localStorage.setItem('token', response.token);
					localStorage.setItem('user', response.user.email);
					localStorage.setItem('identity', JSON.stringify(response.user));
					localStorage.setItem('student', JSON.stringify(response.student));
					
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