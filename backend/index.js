const express=require("express")
const mongoose=require("mongoose")
const userrouter=require("./routes/userrt")
const taskrouter= require("./routes/taskrt")

const app=express()

app.use(express.json())


mongoose.connect("mongodb://localhost:27017/todo").then(()=>{
    console.log("ok")
})

app.use("/",userrouter)
app.use("/",taskrouter)

app.listen("5000")