$(document).ready(function(){
    let identity=JSON.parse(localStorage.getItem('identity'));
    
    $("#form").on("submit", function(e){
        e.preventDefault();
        let data={
            id:identity._id,
            answer:$("#txtAnswer").val(),
            question:$("#question").text(),
            sense:'recorridos',
            activity:'reflexion'
        };

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
                $(".btnContinue").css("display", "block");
            }
        })
        .catch(function(err){
            console.log('Error:', err)
        });
    });
});