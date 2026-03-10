const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Simple string for demo
  name: { type: String, required: true },
  branch: { type: String, required: true },
  semester: { type: Number, required: true },
  cgpa: { type: Number, required: true },
  profileImg: { type: String }
});

module.exports = mongoose.model('Student', studentSchema);
