const mongoose=require('mongoose');
const uniqueValidator=require("mongoose-unique-validator");

let Schema=mongoose.Schema;

let trophySchema=new Schema({
    user:{
        required:[true, "Debes ingresar el usuario"],
        type:String
    },
    sense:{
        type:String,
        required:[true, "Debes ingresar un sentido"]
    },
    trophy:{
        type:String,
        required:[true, "Debes ingresar el premio"]
    }
});

trophySchema.plugin(uniqueValidator, {message:'{PATH} debe ser único'});

module.exports=mongoose.model('Trophy', trophySchema);