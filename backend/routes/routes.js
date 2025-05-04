const express = require("express");
const router = express.Router();
const { reg, login } = require("../controllers/usercon");
const { addtask, getUserTasks, updateTask, deleteTask } = require("../controllers/taskcon");
const auth = require("../auth");
const {addCompletedTask, deleteCompletedTask, getCompletedTasks} = require("../controllers/completedTaskController")

router.post("/register", reg);
router.post("/login", login);

router.post("/addtask", auth, addtask);
router.get("/tasks", auth, getUserTasks);
router.put("/updatetasks/:id", auth, updateTask);
router.delete("/deletetask/:id", auth, deleteTask);


router.post('/completedtasks', addCompletedTask);
router.get('/completedtasks', getCompletedTasks);
router.delete('/completedtasks/:id', deleteCompletedTask);

module.exports = router;
