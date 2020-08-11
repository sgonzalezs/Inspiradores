const express=require('express');
const User=require("../models/user.js");
const Quest=require("../models/questions.js");

const app=express();

app.get("/seleccion/:user&:sense&:activity", (req,res)=>{
    let user=req.params.user;
    let sense=req.params.sense;
    let activity=req.params.activity;

    if(activity=="seleccion"){
        Quest.find({user, sense, activity}, (err, data)=>{
            if(err){
                return res.status(400).json({
                    ok:false,
                    message: err
                });
            }
    
            if(!data){
                return res.status(404).json({
                    ok:false,
                    message:"not found"
                });
            }
    
            return res.status(200).json({
                ok:true,
                data
            }); 
        });
    }

    if(activity=="reflexion"){
        Quest.findOne({user, sense, activity}, (err, data)=>{
            if(err){
                return res.status(400).json({
                    ok:false,
                    message: err
                });
            }
    
            if(!data){
                return res.status(404).json({
                    ok:false,
                    message:"not found"
                });
            }
    
            return res.status(200).json({
                ok:true,
                data
            }); 
        });
    }
    
});

module.exports=app;