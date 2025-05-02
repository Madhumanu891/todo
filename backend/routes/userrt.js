const express=require("express")
const {reg,login}=require("../controllers/usercon")

const router= new express.Router()

router.post("/reg",reg)
router.post("/login",login)

module.exports=router