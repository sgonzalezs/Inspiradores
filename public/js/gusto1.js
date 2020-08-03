$(document).ready(function(){
    let identity=JSON.parse(localStorage.getItem('identity'));
    answerGusto(identity);
});

var cAns=0;
function answerGusto(identity){

    $(".option img").click(function(){
        $(this).css("border","3px solid #ffffff");
        $(this).css("opacity","0.8");
        var question=$(this).attr("value").split("-")[0];
        var answer=$(this).attr("value").split("-")[1];
        
        let data={
            id:identity._id,
            question,
            answer:answer,
            sense:'gusto',
            activity:'seleccion'
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
                    $(".gustoContent").css("pointer-events", "none");
                    $(".alert").css("display", "block");
                    $(".alert").text("Ya has completado esta sección");
                }
            }else{
                cAns++;
                if(cAns==5){
                    $(".btnContinue").css("display", "block");
                    $(".gustoContent").css("pointer-events", "none");
                }
            }
        })
        .catch(function(err){
            console.log('Error:', err)
        });
    });
    

}