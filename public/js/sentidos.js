$(document).ready(function(){
    var identity=JSON.parse(localStorage.getItem('identity'));
    loadInspiradores(identity);
    // validateSenses(identity);
    getSensesComplete(identity);
    
    let image=localStorage.getItem('userAvatar');
    switch(image.split("/")[3]){
        case "pirataMin_1.png":
            $("#avatarUser img").attr("src", image);
            $("#avatarUser img").css({
                "width": "80px",
                "margin":"0px 0px 0px 10px"
            });
        break;

        case "pirataMin_2.png":
            $("#avatarUser img").attr("src", image);
            $("#avatarUser img").css({
                "width": "80px",
                "margin":"0px 0px 0px 10px"
            });
        break;

        case "pirataMin_3.png":
            $("#avatarUser img").attr("src", image);
            $("#avatarUser img").css({
                "width": "70px",
                "margin":"0px 0px 0px 10px"
            });
        break;

        case "pirataMin_4.png":
            $("#avatarUser img").attr("src", image);
            $("#avatarUser img").css({
                "width":"55px", 
                "margin":"6px 0px 0px 15px"
            });
        break;
    }

});

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
                
            }
        }else{
            let trophies=response.message;
            let senses=[];
            
            trophies.forEach(function(e,i){
                var sense=trophies[i].sense;
                if(sense=="escucha"||sense=="vista"||sense=="tacto"||sense=="olfato"||sense=="gusto"){
                    senses.push(sense);
                }
                $("."+sense).css("pointer-events", "none");
                $("."+sense).attr("src", "../images/sentidos/"+sense+"_checked.png");
            });
            if(senses.length==5){
                $(".alert").css("display", "block");
                $(".btnContinue").css("display", "block");
                $(".alert").text("Ya has completado todas las actividades de los sentidos");
            }
            
        }
    })
    .catch(function(err){
        console.log(err);
    }); 
}

// function validateSenses(identity){
//     let user=identity._id;
//     let answer='complete';
//     let question='senses';

//     fetch('/senses/'+user+"&"+answer+"&"+question, {
//         method: 'GET',
//         headers:{
//         'Content-Type': 'application/json'
//         }
//     })
//     .then(function(res){
//         return res.json();
//     })
//     .then(function(response){
//         if(!response.ok){
//             if(response.message=="not found"){

//                 $(".alert").css("display", "none");
//                 $(".btnContinue").css("display", "none");
//                 $(".alert").text("");
//             }
//         }else{
//             $(".alert").css("display", "block");
//             $(".btnContinue").css("display", "block");
//             $(".alert").text("Ya has completado todas las actividades de los sentidos");
//         }
//     })
//     .catch(function(err){
//         console.log('Error:', err);
//     });
// }

function loadInspiradores(identity){

    var senses=JSON.parse(localStorage.getItem('senses'));
    
    if(senses){
        var validate={
            escucha:senses.escucha,
            vista:senses.vista,
            tacto:senses.tacto,
            olfato:senses.olfato,
            gusto:senses.gusto
        };
    
        if(validate.escucha && validate.vista &&validate.tacto &&validate.olfato &&validate.gusto){
            $(".alert").css("display", "block");
            $(".btnContinue").css("display", "block");
            $(".alert").text("Ya has completado todas las actividades de los sentidos");
            
            let data={
                id:identity._id,
                answer:"complete",
                question:"senses",
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
                        $(".alert").text("Ya has completado todas las actividades de los sentidos");
                    }
                }else{
                    $(".alert").css("display", "block");
                    $(".btnContinue").css("display", "block");
                    $(".alert").text("Ya has completado todas las actividades de los sentidos");
                }
            })
            .catch(function(err){
                console.log('Error:', err);
            });
        }
        
    }
   
}