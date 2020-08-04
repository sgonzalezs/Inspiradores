const express=require("express");
const app=express();
const Tropy=require("../models/trophy.js");
const trophy = require("../models/trophy.js");

app.post("/premio", (req,res)=>{
    let body=req.body;

    Tropy.findOne({user:body.user, trophy:body.trophy}, (err, trophyStored)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                message:err
            });
        }

        if(trophyStored){
            return res.status(400).json({
                ok:false,
                message:"exists"
            });
        }else{
            let trophy=new Tropy({
                user:body.user,
                sense:body.sense,
                trophy:body.trophy
            });

            trophy.save((error, trophySave)=>{
                if(error){
                    return res.status(400).json({
                        ok:false,
                        message:error
                    });
                }

                return res.status(200).json({
                    ok:true,
                    message:trophySave
                });
            });
        }
    });
});

module.exports=app;