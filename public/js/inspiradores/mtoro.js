$(document).ready(function(){
    let identity=JSON.parse(localStorage.getItem('identity'));
    let age=identity.age;
    var video=document.getElementById('video');
    
    if(age<13){
        video.src="https://www.youtube.com/embed/C04DNSS8rL4";
    }else{
        video.src="https://www.youtube.com/embed/2vxGP3zWPFY";
    }
});