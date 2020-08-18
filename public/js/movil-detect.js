$(document).ready(function(){
    detectDevice();
});

function detectDevice(){
    var orientation=screen.orientation.type;
    if(orientation=="portrait-primary"){
        $("body section").css("display", "none");
        $("body").css({
            "background-size":"100% 100vh"
        });
        $(".device").css("display", "block");
        $(".footer img").css({
            "position":"absolute"
        });
    }
    
    $(window).on("orientationchange",function( event ){
        var orientation2=screen.orientation.type;
        if(orientation2=="portrait-primary"){
            $("body section").css("display", "none");
            $("body").css({
                "background-size":"100% 100vh"
            });
            $(".device").css("display", "block");
            $(".footer img").css({
                "position":"absolute",
            });
        }
        
        if(orientation2=="landscape-primary")
        {
            $("body section").css("display", "block");
            $(".device").css("display", "none");
            $("body").css({
                "background-size":"100% 130%"
            });
            $(".footer img").css({
                "position": "relative",
                "width": "220px"
            })
        }
    });
}