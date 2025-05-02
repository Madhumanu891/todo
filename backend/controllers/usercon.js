const express= require("express")
const um=require("../models/usermodel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

let reg=async(req,res)=>{
    let hashpwd= await bcrypt.hash(req.body.pwd,10)
    try {
        let data=new um({...req.body, "pwd":hashpwd})
        res.json(data)
        await data.save()
    } catch (error) {
        res.json({message:"error in register"})
    }
}

let login=async(req,res)=>{
    let obj=await um.findById(req.body._id)
    try {
        if(obj){
            let f=await bcrypt.compare(req.body.pwd, obj.pwd)
            if(f){
                res.json({"token":jwt.sign({"_id":obj._id},"abcd"),"name":obj.name})
            }else{
                res.json({message:"check password"})
            }
        }else{
            res.json({message:"check email"})

        }
    } catch (error) {
        res.json({error:"error in login"})
        
    }
}

module.exports={reg,login}