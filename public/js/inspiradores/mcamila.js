$(document).ready(function(){
    let identity=JSON.parse(localStorage.getItem('identity'));
    let age=identity.age;
    var video=document.getElementById('video');
    
    if(age<13){
        video.src="https://www.youtube.com/embed/vLktbE_M-9g";
    }else{
        video.src="https://www.youtube.com/embed/CvHIP0zo5Sg";
    }
});