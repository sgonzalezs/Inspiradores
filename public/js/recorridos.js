$(document).ready(function(){
    let identity=JSON.parse(localStorage.getItem('identity'));
    let type=$(".paragraph").attr("id").split("-")[1];
    getValidate(identity, type);
    if(!localStorage.getItem('recorridos')){
        localStorage.setItem('recorridos', JSON.stringify(
            {
                user:identity._id,
                centro:false,
                apropiacion:false,
                conocimiento:false,

            })
        );
    }

    
});

function answerReflexionRecorridos(identity, type){
    $("#form").on("submit", function(e){
        e.preventDefault();
        let data={
            id:identity._id,
            answer:$("#txtAnswer").val(),
            question:$(".paragraph").text(),
            sense:type,
            activity:'recorridos'
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
                let recorridos=JSON.parse(localStorage.getItem('recorridos'));
                recorridos[type]=true;
                localStorage.setItem('recorridos', JSON.stringify(recorridos));
            }
        })
        .catch(function(err){
            console.log('Error:', err)
        });
    });
}

function getValidate(identity, sense){
    let user=identity._id;
    fetch("/seleccion/"+user+"&"+sense+"&recorridos",{
        type:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then(function(res){
        return res.json();
    })
    .then(function(response){
        if(!response.ok){
            if(response.message=="not found"){
                answerReflexionRecorridos(identity, sense);
            }
        }
        else{
            $(".alert").css("display", "block");
            $(".alert").text("Ya has completado esta sección");
            $(".btnContinue").css("display", "block");
            $(".btnSend").attr("disabled", true);
        }
    })
    .catch(function(err){
        console.log(err);
    });
}

