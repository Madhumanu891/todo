const mongoose=require("mongoose")

const taskSchema=new mongoose.Schema({
    "_id":String,
    "desc":String,
    "startdate":String,
    "enddate":String,
    "iscompleted":{
        type:Boolean,
        default:false
    }
})

const tm=mongoose.model("tasks",taskSchema)

module.exports=tm
