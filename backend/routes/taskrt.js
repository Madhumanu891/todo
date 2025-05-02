const express=require("express")
const {addtask, getall, edittask}=require("../controllers/taskcon")

const router= new express.Router()

router.post("/addtask",addtask)
router.get("/getall",getall)
router.put('/edittask',edittask)

module.exports=router