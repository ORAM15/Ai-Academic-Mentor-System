const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name:     { type: String, required: true },
  branch:   { type: String, default: '' },   // ← optional
  semester: { type: Number, default: 0 },    // ← optional
  cgpa:     { type: Number, default: 0 },    // ← optional
  profileImg: { type: String }
});

module.exports = mongoose.model('Student', studentSchema);