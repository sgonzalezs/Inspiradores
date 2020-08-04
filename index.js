const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');

const hbs=require('hbs');

const app=express();
const path = require('path');

let port=process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname+'/public');
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(require('./server/routes/user.js'));
app.use(require('./server/routes/like.js'));
app.use(require('./server/routes/trophy.js'));

app.listen(port, (err)=>{
    if(err){
        return console.log(err);
    }
    let local='mongodb://localhost:27017/db_navegantes';
    let web='mongodb://navegantes:navegantes_1@ds133670.mlab.com:33670/db_navegantes';
    mongoose.connect(local, {useNewUrlParser:true, useUnifiedTopology:true}, (errConn)=>{
        if(errConn){
            return console.log(errConn);
        }
        console.log(`listening port ${port} - db connected`);
    });
});
