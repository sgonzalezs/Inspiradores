$(document).ready(function(){
    var orientation=screen.orientation.type;
    if(orientation=="portrait-primary"){
        $("body section").css("display", "none");
        $("body").css({
            "background-image": "url('../images/fondo/Fondo.png')",
            "background-size": "cover",
            "background-repeat":"no-repeat",
            "background-size": "100% 100vh"
        });
        $(".device").css("display", "block");
    }else{
        $("body section").css("display", "block");
        $("body").css({
            "background-image": "url('../images/fondo/FondoCompleto.png')",
            "background-size": "cover",
            "background-repeat":"no-repeat",
            "background-size": "100% 100vh"
        });
        $(".device").css("display", "none");
    }
    $(window).on("orientationchange",function( event ){
        var orientation2=screen.orientation.type;
        if(orientation2=="portrait-primary"){
            $("body section").css("display", "none");
            $("body").css({
                "background-image": "url('../images/fondo/Fondo.png')",
                "background-size": "cover",
                "background-repeat":"no-repeat",
                "background-size": "100% 100vh"
            });
            $(".device").css("display", "block");
        }else{
            $("body section").css("display", "block");
            $("body").css({
                "background-image": "url('../images/fondo/FondoCompleto.png')",
                "background-size": "cover",
                "background-repeat":"no-repeat",
                "background-size": "100% 100vh"
            });
            $(".device").css("display", "none");
        }
    });
});