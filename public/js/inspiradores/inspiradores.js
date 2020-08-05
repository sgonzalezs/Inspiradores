$(document).ready(function(){
    let identity=JSON.parse(localStorage.getItem('identity'));
    validateInspirings(identity);
    loadRecorridos(identity);

    if(!localStorage.getItem('inspiring')){
        localStorage.setItem('inspiring', JSON.stringify(
            {
                user:identity._id,
                arte:false,
                ciencia:false,
                cuerpo:false,
                sociedad:false

            })
        );
    }

    $(".imagesSection img").click(function(){
        let type=$(this).attr("value");
        let inspirings=JSON.parse(localStorage.getItem('inspiring'));
        inspirings[type]=true;
        localStorage.setItem('inspiring', JSON.stringify(inspirings));

    });
});

function loadRecorridos(identity){
    let user=identity._id;
    let answer='complete';
    let question='inspirings';

    fetch('/senses/'+user+"&"+answer+"&"+question, {
        method: 'GET',
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

                $(".alert").css("display", "none");
                $(".btnContinue").css("display", "none");
                $(".alert").text("");
            }
        }else{
            $(".alert").css("display", "block");
            $(".alert").text("Haz clic en continuar");
            $(".btnContinue").css("display", "block");
        }
    })
    .catch(function(err){
        console.log('Error:', err);
    });
}

function validateInspirings(identity){
    let inspirings=JSON.parse(localStorage.getItem('inspiring'));

    if(inspirings){
        let validate={
            arte:inspirings.arte,
            ciencia:inspirings.ciencia,
            cuerpo:inspirings.cuerpo,
            sociedad:inspirings.sociedad
        };

        if(validate.arte && validate.ciencia &&validate.cuerpo &&validate.sociedad){
            $(".alert").css("display", "block");
            $(".alert").text("Haz clic en continuar");
            $(".btnContinue").css("display", "block");

            let data={
                id:identity._id,
                answer:"complete",
                question:"inspirings",
                sense:'all',
                activity:'validate'
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
                        $(".btnContinue").css("display", "block");
                        $(".alert").text("Haz clic en continuar");
                    }
                }else{
                    $(".alert").css("display", "block");
                    $(".btnContinue").css("display", "block");
                    $(".alert").text("Haz clic en continuar");
                }
            })
            .catch(function(err){
                console.log('Error:', err);
            });
        }
    }
}
