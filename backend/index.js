const express=require("express")
const mongoose=require("mongoose")
const router= require("./routes/routes")
const cors=require("cors")

const app=express()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))


mongoose.connect("mongodb://localhost:27017/todo").then(()=>{
    console.log("ok")
})

app.use("/",router)

app.listen("5000")