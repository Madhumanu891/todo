
const mongoose = require('mongoose');

const completedTaskSchema = new mongoose.Schema({
  userId: String,
  desc: String,
  deadline: String,
  iscompleted: {
    type: Boolean,
    default: true,
  }
});

module.exports = mongoose.model('CompletedTask', completedTaskSchema);
