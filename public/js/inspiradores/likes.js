$(document).ready(function(){
    let identity=JSON.parse(localStorage.getItem('identity'));

    $(".btnQual").click(function(){
        let value=$(this).attr("value").split("-")[1];
        let name=$(this).attr("value").split("-")[0];
        let data={
            name,
            option:value,
            user:identity._id
        };

        fetch('/vote', {
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
                    $(".groupButtons").css("pointer-events", "none");
                    $(".alert").css("display", "block");
                    $(".alert").text("Ya calificaste este video");
                }
            }else{
                $(".btnContinue").css("display", "block");
                $(".groupButtons").css("pointer-events", "none");
            }
        })
        .catch(function(err){
            console.log('Error:', err)
        });
    });

});

