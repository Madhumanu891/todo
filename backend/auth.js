const jwt = require("jsonwebtoken")
const um=require("./models/usermodel")

const auth= async(req,res,next)=>{
    try {
        const token=req.headers.authorization?.split(" ")[1]
        const decoded= jwt.verify(token, "abcd")
        const user = await um.findOne({email:decoded})

        if(!user){
           return res.json({message:"user not found"})
        }
        
        req.userId = user._id
        next()
    } catch (error) {
        res.json({message:"unauthorized access"})
    }
}

module.exports=auth