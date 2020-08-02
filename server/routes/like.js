const express=require('express');
const Inspiring=require("../models/inspiring.js");
const Vote=require("../models/vote.js");
const app=express();

app.get("/votos/:user", (req,res)=>{
    let user=req.params.user;
    Vote.find({inspiring:user}, (err, dataFounded)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                message:err
            });
        }

        if(dataFounded){
            return res.status(200).json({
                ok:true,
                data:dataFounded
            });
        }
    });
});

app.post("/vote", (req,res)=>{
    let body=req.body;
    let like=false;
    let dislike=false;
    if(body.option=="like"){
        like=true;
        dislike=false;
    }else{
        like=false;
        dislike=true;
    }

    Vote.findOne({user:body.user, inspiring: body.name}, (err, voteReg)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                message:err
            });
        }

        if(voteReg){
            return res.status(400).json({
                ok:false,
                message:"exists",
                voteReg
            });
        }

        let vote=new Vote({
            inspiring:body.name,
            user:body.user,
            like,
            dislike
        });
    
        vote.save((error, newVote)=>{
            if(error){
                return res.status(400).json({
                    ok:false,
                    message:error
                });
            }
    
            return res.status(200).json({
                ok:true,
                message:newVote
            });
        });
    });
    
});


module.exports=app;
