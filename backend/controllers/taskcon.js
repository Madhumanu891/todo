const tm=require("../models/taskmodel")


let addtask=async(req,res)=>{
    try {
        let data=new tm({...req.body, "userId":req.userId})
        await data.save()
        res.json({ message: "Task added", data });
        console.log(data)
        
    } catch (error) {
        res.json({message:"error in adding task"})
        console.log(error)
    }
}

let getUserTasks=async(req,res)=>{
    try {
        let data=await tm.find({"userId":req.userId})
        res.json(data)
    } catch (error) {
        res.json({message:"error in getting all tasks"})
    }
}

let updateTask = async (req, res) => {
    try {
      let data = await tm.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(data);
    } catch (error) {
      res.json({ message: "error in edit task" });
      console.log(error);
    }
  };
  


let deleteTask = async (req, res) => {
    try {
      await tm.deleteOne({ _id: req.params.id});
      res.json({ message: "Task deleted" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting task", error });
    }
  };


  module.exports = { addtask, getUserTasks, updateTask, deleteTask};


