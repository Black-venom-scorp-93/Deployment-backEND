// require('dotenv').config();
// const express = require('express');
// const app = express();
// const cors = require('cors');
// const mongoose = require('mongoose');
// const ObjectID = require('mongodb').ObjectId;

// app.use(cors());
// app.use(express.json());


// const uri = 'mongodb://your-database-uri';
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Error connecting to MongoDB:', err));


// // const uri = process.env.ATLAS_URI;
// // mongoose.connect(uri)
// //     .then(() => console.log('MongoDB connected'))
// //     .catch(err => console.log(err));

// // Schema for mentor
// const mentorSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     phone: String,
//     address: String,
//     city: String,
//     state: String,
//     zip: String,
//     country: String,
//     description: String,
//     skills: String,
//     availablity: String,
//     price: String,
//     students: [mongoose.Schema.Types.ObjectId]
// });

// const Mentor = mongoose.model('mentor', mentorSchema, 'mentors');

// // endpoint of new mentor or teacher

// app.post('/create-mentor', (req, res) => {
//     const { name, email, phone, address, city, state, zip, country, description, skills, availability, price } = req.body;
//     const newMentor = new Mentor({ name, email, phone, address, city, state, zip, country, description, skills, availability, price});
//     newMentor.save()
//         .then(() => res.json('Mentor added!'))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

// // Schema for students

// const StudentSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     phone: String,
//     address: String,
//     city: String,
//     state: String,
//     zip: String,
//     country: String
// });

// const Student = mongoose.model('Student', StudentSchema, 'students');

// // endpoint of create new student

// app.post('/create-student', (req, res) => {
//     const { name, email, phone, address, city, state, zip, country } = req.body;
//     const newStudent = new Mentor({ name, email, phone, address, city, state, zip, country });
//     newStudent.save()
//         .then(() => res.json('Student added!'))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

// // endpoint to assign a student to mentor

// app.post('/assign-student', (req, res) => {
//     const { mentorId, studentId } = req.body;
//     Mentor.findById(new ObjectId(mentorId))
//         .then(mentor => {
//             mentor.students.push(new ObjectId(studentId));
//             mentor.save()
//                 .then(() => res.json('student assigned!'))
//                 .catch(err => res.status(400).json('Error: ' + err));
//         })
//         .catch(err => res.status(400).json('Error: ' + err));
// });

// const PORT = 3000;
// app.listen(PORT, () => {
//     console.log('server running on port ${PORT}');
// });


const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { dbConnect } = require("./shared/db");
const studentRoute = require("./routes/student");
const mentorRoute = require("./routes/mentor");
const assignMentortoStudent = require("./routes/assignMentortoStudent");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Working fine...");
});
app.use("/student", studentRoute);
app.use("/mentor", mentorRoute);
app.use("/assignmentor", assignMentortoStudent);

app.listen(process.env.PORT || 3000, async (err) => {
  await dbConnect();
  console.log("Started server ");
  if (err) {
    console.log(err, "error in starting server");
  }
});