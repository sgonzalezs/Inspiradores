function getUserInfo(){
    let indentity=JSON.parse(localStorage.getItem('identity'));
    $(".userName").text(indentity.name);
    $(".userEmail").text(indentity.email);
}