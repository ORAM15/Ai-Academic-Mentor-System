const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  group: { type: String, required: true }, // e.g., 'D3IT_B2'
  day: { type: String, required: true }, // monday, tuesday, etc.
  slots: [{
    subjectName: String,
    professor: String,
    time: String,
    room: String,
    type: String // Lecture, Practical
  }]
});

module.exports = mongoose.model('Timetable', timetableSchema);
