$(document).ready(function(){
    let identity=JSON.parse(localStorage.getItem('identity'));
    answerVista(identity);
});

var cAns=0;
function answerVista(identity){

    $(".option img").click(function(){
        $(this).css("border","3px solid #ffffff");
        $(this).css("opacity","0.8");
        var prop=$(this).attr("class");
        $("."+prop).css("pointer-events", "none");
        var question=$(this).attr("value").split("-")[0];
        var answer=$(this).attr("value").split("-")[1];
        
        let data={
            id:identity._id,
            question,
            answer:answer,
            sense:'vista',
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
                    $(".vistaContent").css("pointer-events", "none");
                    $(".alert").css("display", "block");
                    $(".alert").text("Ya has completado esta sección");
                }
            }else{
                cAns++;
                if(cAns==4){
                    $(".btnContinue").css("display", "block");
                    $(".vistaContent").css("pointer-events", "none");
                }
            }
        })
        .catch(function(err){
            console.log('Error:', err)
        });
    });

}