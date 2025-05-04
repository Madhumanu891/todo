const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    "email":String,
    "name":String,
    "pwd":String,

})

const um=mongoose.model("userdetails",userSchema)

module.exports=um
