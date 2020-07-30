$(document).ready(function(){
    let identity=JSON.parse(localStorage.getItem('identity'));

    $("#questionOlfato").text();
    $("#questionOlfato").text("¿Tienes a alguien para recordar? ¿con qué olor lo identificas?");
   
    $("#formOlfato").on("submit", function(e){
        e.preventDefault();
        let data={
            id:identity._id,
            question:"¿Tienes a alguien para recordar? ¿con qué olor lo identificas?",
            answer:$("#txtAnswerOlfato").val(),
            sense:'olfato',
            activity:'reflexion'
        }

        fetch('/respuesta', {
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
                if(response.message=="exists"){
                    $(".btnContinue").css("display", "block");
                    $(".btnSend").attr("disabled", true);
                    $(".alert").css("display", "block");
                    $(".alert").text("Ya has completado esta sección");
                    validateData(identity);
                }
            }else{
                $(".btnContinue").css("display", "block");
                $(".btnSend").attr("disabled", true);
                validateData(identity);
            }
        })
        .catch(function(err){
            console.log('Error:', err)
        });
    });

});

function validateData(identity){
    if(!localStorage.getItem('senses')){
        localStorage.setItem('senses', JSON.stringify(
            {
                user:identity._id,
                escucha:false,
                vista:false,
                tacto:false,
                olfato:true,
                gusto:false

            })
        );
    }else{
        let senses=JSON.parse(localStorage.getItem('senses'));
        senses.olfato=true;
        localStorage.setItem('senses', JSON.stringify(senses));
    }
}
