$(document).ready(function(){
    let identity=JSON.parse(localStorage.getItem('identity'));
    let age=identity.age;
    
    $("#question").text();
    if(age<13){
        $("#question").text("¿Quisieras ser como alguno de ellos?");
    }else{
        $("#question").text("¿Te identificas con alguno de ellos?");
    }

    $("#formReflexion").on("submit", function(e){
        e.preventDefault();
        let data={
            id:identity._id,
            answer:$("#txtAnswer").val(),
            question:$("#question").text(),
            sense:'reflexion',
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
                }
            }else{
                $(".alert").css("display", "block");
                $(".alert").text(response.message);
                $(".btnSend").attr("disabled", true);
                $(".btnContinue").css("display", "block");
            }
        })
        .catch(function(err){
            console.log('Error:', err)
        });
    });
});