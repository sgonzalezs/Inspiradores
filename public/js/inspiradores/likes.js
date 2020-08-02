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
                    getVotes(name);
                    $(".alert").css("display", "block");
                    $(".alert").text("Ya calificaste este video");
                }
            }else{
                $(".btnContinue").css("display", "block");
                $(".groupButtons").css("pointer-events", "none");
                getVotes(name);
                
            }
        })
        .catch(function(err){
            console.log('Error:', err)
        });
    });

});

function getVotes(user){
    fetch('/votos/'+user, {
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
            console.log(response.message);
        }else{
            var likes=0;
            var dislikes=0;
            for(var i=0; i<response.data.length; i++){
                if(response.data[i].like){
                    likes++;
                }else{
                    dislikes++;
                }
            }
            $(".votes").text();
            $(".like").text(likes);
            $(".dislike").text(dislikes);
        }
    })
    .catch(function(err){
        console.log('Error:', err)
    });
}