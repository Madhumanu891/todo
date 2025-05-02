const express= require("express")
const tm=require("../../models/taskmodel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

let reg=async(req,res)=>{
    let rn=Math.round(Math.random()*99999+10000)
    let hashpwd= await bcrypt.hash(req.body.)
}