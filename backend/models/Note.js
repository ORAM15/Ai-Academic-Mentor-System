const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  title: { type: String, required: true },
  type: { type: String, enum: ['pdf', 'doc', 'link'], required: true },
  url: { type: String },
  category: { type: String, enum: ['notes', 'manual', 'assignment'], default: 'notes' }
});

module.exports = mongoose.model('Note', noteSchema);
