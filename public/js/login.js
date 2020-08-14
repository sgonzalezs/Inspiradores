$(document).ready(function(){
	
    $("#formLogin").on('submit', function(e){
        e.preventDefault();

		// if(localStorage.getItem('token')){
			
		// 	localStorage.removeItem('token');
		// 	localStorage.removeItem('user');
		// 	localStorage.removeItem('identity');
		// 	localStorage.removeItem('userAvatar');
		// 	localStorage.removeItem('senses');
		// }

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
				// localStorage.removeItem('user');
				localStorage.setItem('token', response.token);
				localStorage.setItem('user', response.user.email);
				localStorage.setItem('identity', JSON.stringify(response.user));
				if(response.message=="login"){
					let identity=JSON.parse(localStorage.getItem('identity'))
					localStorage.setItem('userAvatar', identity.image);
					window.location.replace('/viaje');
				}else{
					window.location.replace('/avatar');	
				}
			}
		})
		.catch(function(err){
			console.log('Error:', err)
		});

    })

});