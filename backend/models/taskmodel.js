const mongoose=require("mongoose")

const taskSchema=new mongoose.Schema({
    "userId":{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userdetails"
    },
    "desc":String,
    "deadline":String,
    "iscompleted":{
        type:Boolean,
        default:false
    }
})

const tm=mongoose.model("tasks",taskSchema)

module.exports=tm
