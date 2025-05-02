const express=require("express")
const mongoose=require("mongoose")
const userrouter=require("./routes/userrt")

const app=express()

app.use(express.json())


mongoose.connect("mongodb://localhost:27017/todo").then(()=>{
    console.log("ok")
})

app.use("/",userrouter)

app.listen("5000")