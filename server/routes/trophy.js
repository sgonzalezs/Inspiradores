const express=require("express");
const app=express();
const Tropy=require("../models/trophy.js");

app.get("/premios/:user", (req,res)=>{

    let user=req.params.user;

    Tropy.find({user}, (err, trophies)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                message:err
            });
        }

        if(!trophies){
            return res.status(404).json({
                ok:false,
                message:"No data"
            });
        }

        return res.status(200).json({
            ok:true,
            message:trophies
        });
    });
});

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