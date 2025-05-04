// controllers/completedTaskController.js
const CompletedTask = require('../models/completedTask');

const addCompletedTask = async (req, res) => {
  try {
    const task = new CompletedTask(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const getCompletedTasks = async (req, res) => {
  try {
    const tasks = await CompletedTask.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCompletedTask = async (req, res) => {
  try {
    const id = req.params.id;
    await CompletedTask.findByIdAndDelete(id);
    res.status(200).json({ message: 'Deleted Successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports={addCompletedTask, deleteCompletedTask, getCompletedTasks}