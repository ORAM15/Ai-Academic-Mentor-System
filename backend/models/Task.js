const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  title: { type: String, required: true },
  type: { type: String, enum: ['daily', 'weekly', 'deadline'], required: true },
  completed: { type: Boolean, default: false },
  dueDate: { type: Date }
});

module.exports = mongoose.model('Task', taskSchema);
