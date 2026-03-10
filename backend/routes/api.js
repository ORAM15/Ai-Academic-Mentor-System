const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Subject = require('../models/Subject');
const Attendance = require('../models/Attendance');
const Task = require('../models/Task');
const Timetable = require('../models/Timetable');

// Simple authentication
router.post('/login', async (req, res) => {
  const { studentId, password } = req.body;
  try {
    const student = await Student.findOne({ studentId, password });
    if (!student) return res.status(401).json({ error: 'Invalid credentials' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get student dashboard info
router.get('/dashboard/:studentId', async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
    if (!student) return res.status(404).json({ error: 'Not found' });
    
    // Get aggregated attendance
    const attendanceRecords = await Attendance.find({ studentId: student._id }).populate('subjectId');
    let totalClasses = 0;
    let totalAttended = 0;
     
    const detailedAttendance = attendanceRecords.map(r => {
        totalClasses += r.totalClasses;
        totalAttended += r.attendedClasses;
        const perc = r.totalClasses > 0 ? (r.attendedClasses/r.totalClasses)*100 : 0;
        let status = 'safe';
        if(perc < 75) status = 'warning';
        if(perc < 60) status = 'critical';
        
        return {
            subject: r.subjectId.name,
            code: r.subjectId.code,
            professor: r.subjectId.professor,
            total: r.totalClasses,
            attended: r.attendedClasses,
            percentage: perc.toFixed(1),
            status
        };
    });

    const overallAttendance = totalClasses > 0 ? ((totalAttended/totalClasses)*100).toFixed(1) : 0;

    res.json({
        student,
        attendance: {
            overall: overallAttendance,
            subjects: detailedAttendance
        }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get timetable
router.get('/timetable/:group', async (req, res) => {
    try {
        const schedule = await Timetable.find({ group: req.params.group });
        res.json(schedule);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Tasks
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

// AI Report Mock
router.post('/generate-report', async (req, res) => {
    // Mocking an AI API delay and response
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
