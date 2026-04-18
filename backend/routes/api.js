const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Subject = require('../models/Subject');
const Attendance = require('../models/Attendance');
const Task = require('../models/Task');
const Note = require('../models/Note');
const Timetable = require('../models/Timetable');

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware to verify teacher token
const verifyTeacher = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.teacher = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// Student Routes
router.post('/register', async (req, res) => {
  const { studentId, fullName, password } = req.body;
  if (!studentId || !fullName || !password)
    return res.status(400).json({ error: 'All fields required' });

  try {
    const existing = await Student.findOne({ studentId });
    if (existing) return res.status(409).json({ error: 'Student ID already registered' });

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const student = new Student({ studentId, name: fullName, password: hashedPassword });
    await student.save();

    res.status(201).json({ message: 'Registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { studentId, password } = req.body;
  if (!studentId || !password)
    return res.status(400).json({ error: 'Student ID and password required' });

  try {
    const student = await Student.findOne({ studentId });
    if (!student) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, student.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const { password: _, ...studentData } = student.toObject();
    res.json(studentData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Teacher Routes
router.post('/teacher/register', async (req, res) => {
  const { teacherId, name, email, password, department, subjects } = req.body;
  if (!teacherId || !name || !email || !password || !department)
    return res.status(400).json({ error: 'All fields required' });

  try {
    const existing = await Teacher.findOne({ $or: [{ teacherId }, { email }] });
    if (existing) return res.status(409).json({ error: 'Teacher ID or email already exists' });

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const teacher = new Teacher({
      teacherId,
      name,
      email,
      password: hashedPassword,
      department,
      subjects: subjects || []
    });
    await teacher.save();

    res.status(201).json({ message: 'Teacher registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/teacher/login', async (req, res) => {
  const { teacherId, password } = req.body;
  if (!teacherId || !password)
    return res.status(400).json({ error: 'Teacher ID and password required' });

  try {
    const teacher = await Teacher.findOne({ teacherId });
    if (!teacher) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, teacher.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    // Update last login
    teacher.lastLogin = new Date();
    await teacher.save();

    const token = jwt.sign(
      { _id: teacher._id, teacherId: teacher.teacherId, role: teacher.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    const { password: _, ...teacherData } = teacher.toObject();
    res.json({ ...teacherData, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Teacher Protected Routes
router.get('/teacher/profile', verifyTeacher, async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.teacher._id).select('-password');
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/teacher/dashboard', verifyTeacher, async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const avgAttendance = 78; // TODO: Calculate from attendance records
    const activeNotes = await Note.countDocuments();
    const totalResources = 42; // TODO: Count resources

    const recentActivity = [
      { icon: 'fa-user-plus', color: 'green', message: 'New student registered', time: '2 hours ago' },
      { icon: 'fa-upload', color: 'blue', message: 'Notes uploaded for Algorithms', time: '4 hours ago' },
      { icon: 'fa-calendar-check', color: 'purple', message: 'Attendance updated', time: '6 hours ago' }
    ];

    res.json({
      totalStudents,
      avgAttendance,
      activeNotes,
      totalResources,
      recentActivity
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Student Management
router.get('/teacher/students', verifyTeacher, async (req, res) => {
  try {
    const students = await Student.find().select('-password');
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/teacher/students', verifyTeacher, async (req, res) => {
  const { studentId, name, branch, semester } = req.body;
  try {
    const student = new Student({ studentId, name, branch, semester });
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Attendance Management
router.post('/teacher/attendance', verifyTeacher, async (req, res) => {
  const { studentId, subjectCode, date, status } = req.body;
  try {
    const attendance = new Attendance({ studentId, subjectCode, date, status });
    await attendance.save();
    res.status(201).json(attendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/teacher/attendance/bulk', verifyTeacher, async (req, res) => {
  const { subjectCode, date, attendanceData } = req.body;
  try {
    const attendanceRecords = attendanceData.map(record => ({
      studentId: record.studentId,
      subjectCode,
      date,
      status: record.status
    }));
    await Attendance.insertMany(attendanceRecords);
    res.status(201).json({ message: 'Bulk attendance updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Notes Management
router.post('/teacher/notes', verifyTeacher, async (req, res) => {
  const { title, content, subject, fileUrl } = req.body;
  try {
    const note = new Note({
      title,
      content,
      subject,
      fileUrl,
      uploadedBy: req.teacher.teacherId
    });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/teacher/notes', verifyTeacher, async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Resources Management
router.post('/teacher/resources', verifyTeacher, async (req, res) => {
  const { title, type, url, subject, description } = req.body;
  try {
    const resource = new Note({ // Using Note model for now, should create Resource model
      title,
      type,
      url,
      subject,
      description,
      uploadedBy: req.teacher.teacherId
    });
    await resource.save();
    res.status(201).json(resource);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/teacher/resources', verifyTeacher, async (req, res) => {
  try {
    const resources = await Note.find({ type: { $exists: true } }).sort({ createdAt: -1 });
    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Student-facing routes (existing)
router.get('/dashboard', async (req, res) => {
  // Return student dashboard placeholder until backend -> front integration is completed
  res.json({ message: 'Student dashboard endpoint is available.' });
});

router.get('/tasks', async (req, res) => {
  // Return tasks data
  res.json([]);
});

router.get('/tasks/:studentId', async (req, res) => {
  try {
    const tasks = await Task.find({ studentId: req.params.studentId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/tasks', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/generate-report', async (req, res) => {
  setTimeout(() => {
    res.json({
      weeklySuggestions: [
        "Focus on DevOps Lab practicals this week.",
        "Review DAA algorithms before MSTs."
      ],
      productivity: "You are currently maintaining a solid 82% attendance. Your task completion rate is good.",
      improvement: "Consider spending 30m extra daily on Machine Learning concepts to bump your CGPA up to 8.5."
    });
  }, 1500);
});

module.exports = router;