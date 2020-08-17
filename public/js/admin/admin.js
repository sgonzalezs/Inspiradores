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
                <tr onclick="getUserInfo('${e._id}', '${e.name}','${e.email}','${e.parentName}','${e.number}');" data-toggle="modal" data-target="#userInfoModal">
                    <td>${e.typeDoc.toUpperCase()}</td>
                    <td>${e.document}</td>
                    <td>${e.name}</td>
                    <td>${e.email}</td>
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

function getUserInfo(id, name, email, parent, number){
    $(".basic-info").empty();
    $(".basic-info").append(`
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Nombre del estudiante</th>
                    <th>Correo</th>
                    <th>Número</th>
                    <th>Acudiente</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${name}</td>
                    <td>${email}</td>
                    <td>${number}</td>
                    <td>${parent}</td>
                </tr>
            </tbody>
        </table>
    `);
    fetch("/usuario/"+id,{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then(function(res){
        return res.json();
    })
    .then(function(response){
        if(response.data.length>0){
            var respuestas=[];
            var data=response.data;
            // extraccion de datos: preguntas y respuestas
            data.forEach(function(e,i){
                if(e.activity=="reflexion" || e.activity=="recorridos"){
                    respuestas.push({sense:e.sense,question:e.question, answer:e.value});
                }
            });

            //asignacion de los datos en la vista: sentidos
            $(".info-sentidos").empty();
            respuestas.forEach(function(e,i){
                if(e.sense!=""){
                    $(".info-sentidos").append(`
                        <div class="col-md-4 mt-1">
                            <div class="card">
                                <div class="card-header">
                                    <p><b>${e.sense.toUpperCase()}</b></p>
                                    <p><b>${e.question}</b></p>
                                </div>
                                <div class="card-body">
                                    <p>${e.answer}</p>
                                </div>
                            </div>
                        </div>    
                    `);
                }  
            });
        }
        
    })
    .catch(function(err){
        console.log(err);
    });
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