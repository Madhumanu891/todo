const mongoose=require("mongoose")

const taskSchema=new mongoose.Schema({
    "_id":String,
    "desc":String,
    "startdate":Date,
    "enddate":Date,
    "iscompleted":{
        type:Boolean,
        default:false
    }
})

const tm=mongoose.model("tasks",taskSchema)

module.exports=tm
