const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    "_id":String,
    "name":String,
    "pwd":String

})

const um=mongoose.model("userdetails",userSchema)

module.exports=um
