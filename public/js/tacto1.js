$(document).ready(function(){
    let identity=JSON.parse(localStorage.getItem('identity'));
    
    var pictures=[ 
        'abuelito',
        'Cantante', 
        'deportista', 
        'Empresario', 
        'enfermero', 
        'Juez', 
        'Ladron', 
        'Panadero', 
        'policia', 
        'Profesor'
    ];
    var count=0;
        $(".btnSendTacto").click(function(){
        // console.log(pictures[count]);
        let answer=$(this).attr("value");
        let data={
            id:identity._id,
            answer,
            question:pictures[count],
            sense:'tacto',
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
                    $(".groupButtons button").attr("disabled", true);
                    $(".btnContinue").css("display", "block");

                    $(".alert").css("display", "block");
                    $(".alert").text("Ya has completado esta sección");
                }
            }else{
                count++;
                $(".pictureTitle").text();
                $(".pictureTitle").text(pictures[count]);
                $(".contentTacto img").attr("src", "../images/sentidos/tacto/tipos/"+pictures[count]+".jpg");
                if(count==10){
                    $(".contentTacto img").attr("src", "../images/sentidos/tacto/tipos/Profesor.jpg");
                    $(".groupButtons button").attr("disabled", true);
                    $(".btnContinue").css("display", "block");
                }
                
            }
        })
        .catch(function(err){
            console.log('Error:', err)
        });
    });

});