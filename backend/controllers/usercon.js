const um=require("../models/usermodel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

let reg=async(req,res)=>{
    let hashpwd= await bcrypt.hash(req.body.pwd,10)
    try {
        let data=new um({...req.body,"pwd":hashpwd})
        await data.save()
        res.json(data)
    } catch (error) {
        res.json({message:"error in register"})
    }
}

let login=async(req,res)=>{
    const obj = await um.findOne({ email: req.body.email });
    try {
        if(obj){
            let f=await bcrypt.compare(req.body.pwd, obj.pwd)
            if(f){
                res.json({"token":jwt.sign(obj.email,"abcd"),"name":obj.name})
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