function getUserInfo(){
    let indentity=JSON.parse(localStorage.getItem('identity'));
    $(".userName").text(indentity.name);
    $(".userEmail").text(indentity.email);

    fetch('/premios/'+indentity._id,{
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
                $(".trophiesGroup").append(`
                    <div class="col-md-12">
                        <p>No se han encontrado trofeos</p>
                    </div>
                `);
            }
        }else{
            let trophies=response.message;
            $(".trophiesGroup").empty();
            $("p.points").text();
            var points=0;
            trophies.forEach(function(e,i){
                points=points+e.point;
                $("p.points").text(points);
                $(".trophiesGroup").append(`
                    <div class="col-sm-4">
                        <p>${e.sense}</p>
                        <img src="../images/premios/${e.trophy}" width="80">
                    </div>
                `);
            });
        }
    })
    .catch(function(err){
        console.log(err);
    });
}

function logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('identity');
    localStorage.removeItem('userAvatar');
    localStorage.removeItem('senses');
    localStorage.removeItem('inspiring');
    localStorage.removeItem('recorridos');

    window.location="/";
}
