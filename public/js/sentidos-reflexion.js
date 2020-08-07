$(document).ready(function(){
    let identity=JSON.parse(localStorage.getItem('identity'));
    let age=identity.age;
    var video=document.getElementById('video');
    
    if(age<13){
        video.src="https://www.youtube.com/embed/aXDpAnHuaxc";
    }else{
        video.src="https://www.youtube.com/embed/H88ZknJ4q5g";
    }
});