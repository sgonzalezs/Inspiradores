$(document).ready(function(){
    let identity=JSON.parse(localStorage.getItem('identity'));
    $(".btnRecorridos").click(function(){
        getRecorridos(identity);
    });
});

function getRecorridos(identity){
    let user=identity._id;
    fetch("/recorridos-validacion/"+user+"&recorridos", {
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then(function(res){
        return res.json();
    })
    .then(function(response){
        if(response.ok){
            var categories=[];
            if(response.data.length>0){
                response.data.forEach(function(e,i){
                    if(e.sense=="centro" || e.sense=="conocimiento" || e.sense=="apropiacion"){
                        categories.push(e.sense);
                    }
                });
                var points=categories.length*100;
                getTrophyRecorridos(identity,points);
            }
        }
    })
    .catch(function(err){
        console.log(err);
    });
    
}

function getTrophyRecorridos(identity, points){
    let trophy=$(".trophyImg").attr("value");
    let data={
        user:identity._id,
        sense:"recorridos",
        trophy,
        points
    };
    
    fetch('/premio', {
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
        if(response.message=="exists"){
            updatedPoints(data.user, data.sense, data.points);
        }else{
            window.location="/premiacion";
        }
    })
    .catch(function(err){
        console.log(err);
    });
}

function updatedPoints(user, sense, points){
    let data={
        user,
        sense,
        points
    };

    fetch("/puntaje", {
        method:"PUT",
        body:JSON.stringify(data),
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then(function(res){
        return res.json();
    })
    .then(function(response){
        if(response.ok){
            
            window.location="/premiacion";
        }
    })
    .catch(function(err){
        console.log(err);
    });
}