$(document).ready(function(){
    let identity=JSON.parse(localStorage.getItem('identity'));
    answerOlfato(identity);
});

var cAns=0;
function answerOlfato(identity){

    $(".option img").click(function(){
        var question=$(this).attr("value").split("-")[0];
        var answer=$(this).attr("value").split("-")[1];
        
        let data={
            id:identity._id,
            question,
            answer:answer,
            sense:'olfato',
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
                    $(".olfatoContent").css("pointer-events", "none");
                    $(".alert").css("display", "block");
                    $(".alert").text("Ya has completado esta sección");
                }
            }else{
                cAns++;
                if(cAns==4){
                    $(".btnContinue").css("display", "block");
                    $(".olfatoContent").css("pointer-events", "none");
                }
            }
        })
        .catch(function(err){
            console.log('Error:', err)
        });
    });
}