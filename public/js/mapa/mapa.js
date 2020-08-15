$(document).ready(function(){
    var identity=JSON.parse(localStorage.getItem('identity'));
    $(".imgLevel").css("pointer-events", "none");
    getSensesvalidate(identity);
});

function getSensesvalidate(identity){

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
            
            var insp="";
            trophies.forEach(function(e,i){
                var sense=trophies[i].sense;
                if(sense=="escucha"||sense=="vista"||sense=="tacto"||sense=="olfato"||sense=="gusto"){
                    senses.push(sense);
                }

                if(sense=="inspiradores"){
                    insp=sense;
                }
            });
            if(senses.length==5){
                $(".imgInspiradores").attr("src", "../../images/mapa2/2InspiradoresAct.png");
            }else{
                $(".imgInspiradores").css("pointer-events", "none");
            }

            if(insp=="inspiradores"){
                $(".imgRecorridos").css("display","block");
                $(".imgMapa").attr("src","../../images/mapa2/Fondo.png");
            }else{
                $(".imgRecorridos").css("pointer-events", "none");
            }
            
        }
    })
    .catch(function(err){
        console.log(err);
    }); 
}