$(document).ready(function(){
    let identity=JSON.parse(localStorage.getItem('identity'));
    let age=identity.age;
    var video=document.getElementById('video');
    
    if(age<13){
        video.src="https://www.youtube.com/embed/oMo6tTQwTSI";
    }else{
        video.src="https://www.youtube.com/embed/vj9EOqv-GF4";
    }
});