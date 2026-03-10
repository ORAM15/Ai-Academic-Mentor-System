const student = {
  name: "Oram Rajput",
  branch: "Information Technology",
  semester: 6,
  section: "D3IT B2",
  cgpa: 6.02
};

const subjects = [
  {
    code: "IT601",
    name: "MEAN Fullstack Development",
    professor: "Dr. Jagdeep Singh",
    type: "Theory + Lab"
  },
  {
    code: "IT602",
    name: "Design and Analysis of Algorithms",
    professor: "Dr. Randeep Kaur",
    type: "Theory"
  },
  {
    code: "IT603",
    name: "Introduction to Machine Learning",
    professor: "Pf. Rupinder Kaur",
    type: "Theory + Lab"
  },
  {
    code: "IT604",
    name: "DevOps",
    professor: "Pf. Himani Sharma",
    type: "Theory + Lab"
  },
  {
    code: "IT605",
    name: "Organizational Behavior",
    professor: "Pf. Arshpreet Kaur",
    type: "Theory"
  },
  {
    code: "IT606",
    name: "Project Management and Marketing",
    professor: "TBD",
    type: "Theory"
  }
];

const lms = {
  "MEAN Fullstack Development": {
    notes: [],
    labs: [],
    syllabus: ""
  },
  "Design and Analysis of Algorithms": {
    notes: [],
    labs: [],
    syllabus: ""
  },
  "Introduction to Machine Learning": {
    notes: [],
    labs: [],
    syllabus: ""
  },
  "DevOps": {
    notes: [],
    labs: [],
    syllabus: ""
  },
  "Organizational Behavior": {
    notes: [],
    labs: [],
    syllabus: ""
  },
  "Project Management and Marketing": {
    notes: [],
    labs: [],
    syllabus: ""
  }
};

window.appData = { student, subjects, lms };
