$(document).ready(function(){
    getAvatarUser();

    $(".btnReflexion").click(function(){
        let sense=$(this).attr("value");
        getTrophy(sense);
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

function getTrophy(sense){
    let identity=JSON.parse(localStorage.getItem("identity"));
    let trophy=$(".trophyImg").attr("value");
    let data={
        user:identity._id,
        sense,
        trophy
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