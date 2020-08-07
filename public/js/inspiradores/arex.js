$(document).ready(function(){
    let identity=JSON.parse(localStorage.getItem('identity'));
    let age=identity.age;
    var video=document.getElementById('video');
    
    if(age<13){
        video.src="https://www.youtube.com/embed/RoLtx-SkS7k";
    }else{
        video.src="https://www.youtube.com/embed/fdn8p20f-gk";
    }
});