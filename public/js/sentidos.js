$(document).ready(function(){
    loadInspiradores();
    let image=localStorage.getItem('userAvatar');
    switch(image.split("/")[3]){
        case "pirataMin_1.png":
            $("#avatarUser img").attr("src", image);
            $("#avatarUser img").css({
                "width": "80px",
                "margin":"0px 0px 0px 10px"
            });
        break;

        case "pirataMin_2.png":
            $("#avatarUser img").attr("src", image);
            $("#avatarUser img").css({
                "width": "80px",
                "margin":"0px 0px 0px 10px"
            });
        break;

        case "pirataMin_3.png":
            $("#avatarUser img").attr("src", image);
            $("#avatarUser img").css({
                "width": "70px",
                "margin":"0px 0px 0px 10px"
            });
        break;

        case "pirataMin_4.png":
            $("#avatarUser img").attr("src", image);
            $("#avatarUser img").css({
                "width":"55px", 
                "margin":"6px 0px 0px 15px"
            });
        break;
    }

});

function loadInspiradores(){

    var senses=JSON.parse(localStorage.getItem('senses'));

    var validate={
        escucha:senses.escucha,
        vista:senses.vista,
        tacto:senses.tacto,
        olfato:senses.olfato,
        gusto:senses.gusto
    };

    if(validate.escucha && validate.vista &&validate.tacto &&validate.olfato &&validate.gusto){

        console.log(validate.escucha);
        $(".alert").css("display", "block");
        $(".btnContinue").css("display", "block");
        $(".alert").text("Ya has completado todas las actividades de los sentidos");
        
    }
    
}