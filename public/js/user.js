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
            trophies.forEach(function(e,i){
                $(".trophiesGroup").append(`
                    <div class="col-md-4">
                        <img src="../images/sentidos/premios/${e.trophy}" width="80">
                    </div>
                `);
            });
        }
    })
    .catch(function(err){
        console.log(err);
    });
}