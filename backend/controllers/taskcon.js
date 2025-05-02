const express= require("express")
const tm=require("../models/taskmodel")


let addtask=async(req,res)=>{
    let rn= Math.round(Math.random()*99999+10000)
    try {
        let data=new tm({...req.body, "_id":rn})
        res.json(data)
        await data.save()
    } catch (error) {
        res.json({message:"error in adding task"})
    }
}

let getall=async(req,res)=>{
    try {
        let data=await tm.find()
        res.json(data)
    } catch (error) {
        res.json({message:"error in getting all tasks"})
    }
}

let edittask=async(req,res)=>{
    try {
        let data=await tm.findByIdAndUpdate(req.body._id,req.body)
        res.json(data)
    } catch (error) {
        res.json({message:"error in edit task"})
        console.log(error)
    }
}



module.exports={addtask,getall,edittask}


