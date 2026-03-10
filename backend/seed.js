const mongoose = require("mongoose");
const Subject = require("./models/Subject");

mongoose.connect("mongodb://localhost:27017/mentor");

const subjects = [
  { code: "IT601", name: "MEAN Fullstack Development", professor: "Dr. Jagdeep Singh", semester: 6 },
  { code: "IT602", name: "Design and Analysis of Algorithms", professor: "Dr. Randeep Kaur", semester: 6 },
  { code: "IT603", name: "Introduction to Machine Learning", professor: "Pf. Rupinder Kaur", semester: 6 },
  { code: "IT604", name: "DevOps", professor: "Pf. Himani Sharma", semester: 6 },
  { code: "IT605", name: "Organizational Behavior", professor: "Pf. Arshpreet Kaur", semester: 6 },
  { code: "IT606", name: "Project Management and Marketing", professor: "TBD", semester: 6 }
];

// Re-using Subject model constraints, passing code/prof/sem
Subject.deleteMany({}).then(() => {
    Subject.insertMany(subjects).then(() => {
        console.log("Subjects inserted");
        process.exit();
    }).catch(err => {
        console.error("Insertion error:", err);
        process.exit(1);
    });
});
