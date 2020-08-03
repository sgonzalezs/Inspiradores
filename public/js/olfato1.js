$(document).ready(function(){
    let identity=JSON.parse(localStorage.getItem('identity'));
    answerOlfato(identity);
});

var cAns=0;
function answerOlfato(identity){

    $(".option img").click(function(){
        $(this).css("border","3px solid #ffffff");
        $(this).css("opacity","0.8");
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
                $(this).css("box-shadow","0px 0px 5px 0px rgba(0,0,0,0.75)");
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