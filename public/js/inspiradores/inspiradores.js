$(document).ready(function(){
    let identity=JSON.parse(localStorage.getItem('identity'));
    // validateInspirings(identity);
    // loadRecorridos(identity);
    getSensesComplete(identity);
    getVotesvalidate(identity)
});

function getVotesvalidate(identity){
    let user=identity._id;

    fetch("/validate-votes/"+user, {
        type:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then(function(res){
        return res.json();
    })
    .then(function(response){
        if(response.ok){
            var data=[];
            response.data.forEach(function(e,i){
                var category=e.category;
                if(category=="Cuerpo" || category=="Arte" || category=="Sociedad" || category=="Ciencia"){
                    data.push(category);  
                }
                
            });
            
            var data_filter = data.filter( onlyUnique );
            if(data_filter.length==4){
                $(".alert").css("display", "block");
                $(".alert").text("Haz clic en continuar");
                $(".btnContinue").css("display", "block");
            }
        }
    })
    .catch(function(err){

    });
}

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}


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

function getSensesComplete(identity){
    
    fetch('/premios/'+identity._id,{
        method:'GET',
        headers:{
            'Content-type':'application/json'
        }
    })
    .then(function(res){
        return res.json();
    })
    .then(function(response){
        if(!response.ok){
            if(response.message=="No data"){
                console.log(response);
            }
        }else{
            let trophies=response.message;
            let senses=[];
            
            trophies.forEach(function(e,i){
                var sense=trophies[i].sense;
                if(sense=="escucha"||sense=="vista"||sense=="tacto"||sense=="olfato"||sense=="gusto"){
                    senses.push(sense);
                }
                // $("."+sense).css("pointer-events", "none");
                // $("."+sense).attr("src", "../images/sentidos/"+sense+"_checked.png");
            });
            if(senses.length<5){
                $(".alert").css("display", "block");
                $(".redirectInspirings").attr("href", "/sentido");
                $(".btnContinue").css("display", "block");
                $(".alert").text("Debes completar todos los sentidos para continuar con esta sección");
                $(".imagesSection").css("pointer-events", "none");
            }
            
        }
    })
    .catch(function(err){
        console.log(err);
    }); 
}
