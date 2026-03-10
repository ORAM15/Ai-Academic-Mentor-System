const timetable = {
  Monday: [
    { subject: "Open Elective I", professor: "Other Departments", time: "08:30 - 09:20", room: "TBD", type: "Lecture" },
    { subject: "DAA", professor: "Dr. Randeep Kaur", time: "09:30 - 10:20", room: "S-213", type: "Lecture" },
    { subject: "DevOps", professor: "Pf. Himani Sharma", time: "10:30 - 11:20", room: "F-119", type: "Lecture" },
    { subject: "Organizational Behavior", professor: "Pf. Arshpreet Kaur", time: "11:30 - 12:20", room: "F-119", type: "Lecture" },
    { subject: "Break", professor: "", time: "12:30 - 01:20", room: "", type: "Break" },
    { subject: "MEAN Fullstack", professor: "Dr. Jagdeep Singh", time: "01:30 - 02:20", room: "WD Lab", type: "Elective Lecture" },
    { subject: "DAA Tutorial", professor: "TA1 Er. Parminder Kaur", time: "02:30 - 03:20", room: "S-220", type: "Tutorial" }
  ],
  Tuesday: [
    { subject: "DevOps", professor: "Pf. Himani Sharma", time: "08:30 - 09:20", room: "S-213", type: "Lecture" },
    { subject: "IML", professor: "Pf. Rupinder Kaur", time: "09:30 - 10:20", room: "S-213", type: "Lecture" },
    { subject: "DAA", professor: "Dr. Randeep Kaur", time: "10:30 - 11:20", room: "S-213", type: "Lecture" },
    { subject: "Organizational Behavior", professor: "Pf. Arshpreet Kaur", time: "11:30 - 12:20", room: "S-221", type: "Lecture" },
    { subject: "MEAN Fullstack Lab", professor: "Dr. Jagdeep Singh", time: "12:30 - 02:20", room: "OS Lab", type: "Lab" },
    { subject: "IML", professor: "Pf. Rupinder Kaur", time: "02:30 - 03:20", room: "F-118", type: "Theory" },
    { subject: "Minor MNP", professor: "", time: "03:30 - 04:20", room: "HPC Lab", type: "Minor" }
  ],
  Wednesday: [
    { subject: "Open Elective I", professor: "Other Departments", time: "08:30 - 09:20", room: "TBD", type: "Lecture" },
    { subject: "DevOps Lab", professor: "Pf. Himani Sharma", time: "09:30 - 11:20", room: "DBMS Lab", type: "Lab" },
    { subject: "Organizational Behavior", professor: "Pf. Arshpreet Kaur", time: "11:30 - 12:20", room: "TBD", type: "Lecture" },
    { subject: "Break", professor: "", time: "12:30 - 01:20", room: "", type: "Break" },
    { subject: "MEAN Fullstack", professor: "Dr. Jagdeep Singh", time: "01:30 - 02:20", room: "TBD", type: "Elective Lecture" },
    { subject: "DAA Lab", professor: "TA1 Er. Parminder Kaur", time: "02:30 - 04:20", room: "PL Lab", type: "Lab" }
  ],
  Thursday: [
    { subject: "DAA", professor: "Dr. Randeep Kaur", time: "08:30 - 09:20", room: "S-213", type: "Lecture" },
    { subject: "IML", professor: "Pf. Rupinder Kaur", time: "09:30 - 10:20", room: "S-213", type: "Lecture" },
    { subject: "MEAN Fullstack Lab", professor: "Dr. Jagdeep Singh", time: "10:30 - 11:20", room: "DBMS Lab", type: "Lab" },
    { subject: "Break", professor: "", time: "11:30 - 12:20", room: "", type: "Break" },
    { subject: "IML Lab", professor: "Pf. Rupinder Kaur", time: "12:30 - 01:20", room: "WD Lab", type: "Lab" },
    { subject: "DevOps", professor: "Pf. Himani Sharma", time: "01:30 - 02:20", room: "F-119", type: "Theory" },
    { subject: "TPO Activity", professor: "TPO", time: "02:30 - 03:20", room: "HPC Lab", type: "Activity" }
  ],
  Friday: [
    { subject: "Open Elective I", professor: "Other Departments", time: "08:30 - 09:20", room: "TBD", type: "Lecture" },
    { subject: "IML", professor: "Pf. Rupinder Kaur", time: "09:30 - 10:20", room: "S-213", type: "Lecture" },
    { subject: "DevOps", professor: "Pf. Himani Sharma", time: "10:30 - 11:20", room: "S-213", type: "Lecture" },
    { subject: "Minor MNP", professor: "", time: "12:30 - 01:20", room: "DBMS Lab", type: "Minor" },
    { subject: "MC Course", professor: "Dr. Kamaljit Kaur / Others", time: "01:30 - 02:20", room: "TBD", type: "Course" },
    { subject: "IML", professor: "Pf. Rupinder Kaur", time: "02:30 - 03:20", room: "HW Lab", type: "Theory" },
    { subject: "DAA Lab", professor: "TA1 Er. Parminder Kaur", time: "03:30 - 04:20", room: "IOT Lab", type: "Lab" }
  ]
};

window.appTimetable = timetable;
