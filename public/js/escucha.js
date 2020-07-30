$(document).ready(function(){
    let identity=JSON.parse(localStorage.getItem('identity'));
    
    let age=identity.age;
    
    $("#questionEscucha").text();
    if(age<13){
        $("#questionEscucha").text("¿Qué consecuencias has vivido por no escuchar a tus papás?");
    }else{
        $("#questionEscucha").text("¿Qué conflicto crees que se pudo evitar en tu barrio, si los involucrados se hubieran sentado a conversar, escuchando lo que el otro tiene para decir?");
    }

    $("#formEscucha").on("submit", function(e){
        e.preventDefault();
        let data={
            id:identity._id,
            answer:$("#txtAnswer").val(),
            question:$("#questionEscucha").text(),
            sense:'escucha',
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
                    $(".alert").css("display", "block");
                    $(".alert").text("Ya has completado esta sección");
                    $(".btnContinue").css("display", "block");
                    $(".btnSend").attr("disabled", true);
                    validateData(identity);
                }
            }else{
                $(".alert").css("display", "block");
                $(".alert").text(response.message);
                $(".btnContinue").css("display", "block");
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
                escucha:true,
                vista:false,
                tacto:false,
                olfato:false,
                gusto:false

            })
        );
    }else{
        let senses=JSON.parse(localStorage.getItem('senses'));
        senses.escucha=true;
        localStorage.setItem('senses', JSON.stringify(senses));
    }
}

