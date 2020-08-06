$(document).ready(function(){
    getAvatarUser();

    $(".btnReflexion").click(function(){
        let sense=$(this).attr("value").split("-")[1];
        let category=$(this).attr("value").split("-")[0];
        getTrophy(sense, category);
    });

    $(".bntInspiradores").click(function(){
        let identity=JSON.parse(localStorage.getItem("identity"));
        let type=$(this).attr("value");
        let trophy=$(".trophyImg").attr("value");
        let data={
            user:identity._id,
            sense:type,
            trophy,
            points:75
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

            window.location="/recorrido";
            
        })
        .catch(function(err){
            console.log(err);
        });
    });

});

function getAvatarUser(){
    let image=localStorage.getItem('userAvatar');
    
    switch(image.split("/")[3]){
        case "pirataMin_1.png":
            $(".avatarSelected img").attr("src", image);
            $(".avatarSelected img").css({
                "width": "80px",
                "margin":"0px 0px 0px 10px"
            });
            $(".avatarLoaded img").attr("src", "./images/sentidos/pirata.png");
        break;

        case "pirataMin_2.png":
            $(".avatarSelected img").attr("src", image);
            $(".avatarSelected img").css({
                "width": "80px",
                "margin":"0px 0px 0px 10px"
            });
            $(".avatarLoaded img").attr("src", "./images/sentidos/pirata_2.png");
        break;

        case "pirataMin_3.png":
            $(".avatarSelected img").attr("src", image);
            $(".avatarSelected img").css({
                "width": "70px",
                "margin":"0px 0px 0px 10px"
            });
            $(".avatarLoaded img").attr("src", "./images/sentidos/pirata_3.png");
        break;

        case "pirataMin_4.png":
            $(".avatarSelected img").attr("src", image);
            $(".avatarSelected img").css({
                "width":"55px", 
                "margin":"6px 0px 0px 15px"
            });
            $(".avatarLoaded img").attr("src", "./images/sentidos/pirata_4.png");
        break;
    }
}

function getTrophy(sense, category){
    let identity=JSON.parse(localStorage.getItem("identity"));
    let trophy=$(".trophyImg").attr("value");
    let puntaje=0;
    if(category=="sentidos"){
        puntaje=20;
    }
    let data={
        user:identity._id,
        sense,
        trophy,
        points:puntaje
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

        window.location="/sentido";
        
    })
    .catch(function(err){
        console.log(err);
    });
}