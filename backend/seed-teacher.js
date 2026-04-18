require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Teacher = require('./models/Teacher');

const seedTeacher = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mentor_sys');

    // Check if demo teacher already exists
    const existingTeacher = await Teacher.findOne({ teacherId: 'T001' });
    if (existingTeacher) {
      console.log('Demo teacher already exists');
      return;
    }

    // Create demo teacher
    const hashedPassword = await bcrypt.hash('teacher123', 10);
    const teacher = new Teacher({
      teacherId: 'T001',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@university.edu',
      password: hashedPassword,
      department: 'Computer Science',
      subjects: ['MEAN Fullstack Development', 'Design and Analysis of Algorithms', 'Introduction to Machine Learning', 'DevOps'],
      role: 'teacher'
    });

    await teacher.save();
    console.log('Demo teacher created successfully!');
    console.log('Teacher ID: T001');
    console.log('Password: teacher123');

  } catch (error) {
    console.error('Error seeding teacher:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedTeacher();