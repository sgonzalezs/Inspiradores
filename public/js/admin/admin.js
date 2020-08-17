$(document).ready(function(){

    getUsersData();
});

function getUsersData(){
    fetch("/usuarios", {
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then(function(res){
        return res.json();
    })
    .then(function(response){
        $(".usersData").empty();
        response.data.forEach(function(e,i){
            $(".usersData").append(`
                <tr onclick="getUserInfo('${e._id}');">
                    <td>${e.typeDoc.toUpperCase()}</td>
                    <td>${e.document}</td>
                    <td>${e.name}</td>
                    <td>${e.email}</td>
                    <td>${e.number}</td>
                </tr>
            `);
        });
    })
    .catch(function(err){
        console.log(err);
    });
}

function logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('identity');

    window.location="/";
}

function getUserInfo(id){
    console.log(id);
}

function doSearch(){

    var tableReg = document.getElementById('tableUsers');
    var searchText = document.getElementById('searchTerm').value.toLowerCase();
    var cellsOfRow="";
    var found=false;
    var compareWith="";

    // Recorremos todas las filas con contenido de la tabla
    for (var i = 1; i < tableReg.rows.length; i++)
    {
        cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
        found = false;
        // Recorremos todas las celdas
        for (var j = 0; j < cellsOfRow.length && !found; j++)
        {
            compareWith = cellsOfRow[j].innerHTML.toLowerCase();
            // Buscamos el texto en el contenido de la celda
            if (searchText.length == 0 || (compareWith.indexOf(searchText) > -1))
            {
                found = true;
            }
        }
        if(found)
        {
            tableReg.rows[i].style.display = '';
        } else {
            // si no ha encontrado ninguna coincidencia, esconde la
            // fila de la tabla
            tableReg.rows[i].style.display = 'none';
        }
    }
}