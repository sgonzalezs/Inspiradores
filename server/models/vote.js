const mongoose=require('mongoose');

let Schema=mongoose.Schema;

let voteSchema=new Schema({
    inspiring:{
        required:true,
        type:String
    },
    user:{
        type:String,
        required:true
    },
    like:{
        type:Boolean,
        required:true
    },
    dislike:{
        type:Boolean,
        required:true
    }
});

module.exports=mongoose.model('Vote', voteSchema);