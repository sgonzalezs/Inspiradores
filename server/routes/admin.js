//Requires
const express=require("express");

// Models
const User=require('../models/user.js');
const Student=require("../models/students.js");
const Quest=require("../models/questions.js");

const app=express();

app.get("/administracion", (req,res)=>{
    res.sendFile("admin.html", {root:"public"});
});

app.get("/usuarios", (req,res)=>{
    User.find((err, data)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                message:err
            });
        }

        return res.status(200).json({
            ok:true,
            data
        });
    });
});

module.exports=app;