require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/db.js');
const cookieParser = require('cookie-parser');

const app = express();

connectDB();
app.use(express.urlencoded());
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

const { getIndexPage, 
        generateTokenPage, 
        findAllStudents, 
        findByDivision, 
        findParticularStudent, 
        getCreateStudentPage, 
        postCreateStudent, 
        getUpdateStudentPage, 
        postUpdateStudent, 
        getDeleteStudentPage, 
        postDeleteStudent
    } = require('./controller/student');

app.route('/')
    .get(getIndexPage);

app.route('/generateToken')
    .get(generateTokenPage);

app.route('/findAllStudents')
    .get(findAllStudents);

app.route('/findByDiv/:div')
    .get(findByDivision);

app.route('/findStudent/:id')
    .get(findParticularStudent);

app.route('/createStudent')
    .get(getCreateStudentPage)
    .post(postCreateStudent);

app.route('/updateStudent')
    .get(getUpdateStudentPage)
    .post(postUpdateStudent);

app.route('/deleteStudent')
    .get(getDeleteStudentPage)
    .post(postDeleteStudent);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

module.exports = {
  app
}