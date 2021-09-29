var path = require('path');
const Student = require('../models/student');
const {generateToken} = require('../utils/generateToken');

const getIndexPage = async (req, res) => {
    try {
        var options = {
            root: path.join(__dirname, '../public')
        };
        var fileName = '/index.html';
        res.sendFile(fileName, options, function (err) {
            if (err) {
                throw new Error(err);
            } else {
                console.log(fileName);
            }
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }    
};

const generateTokenPage = async (req, res) => {
    try {
        const token = generateToken();
        res.cookie('nToken', token, { httpOnly: true });
        res.status(201).json({
            success: true,
            data: token
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            message: err.message
        })
    }   
};

const findAllStudents = async (req, res) => {
    try {
        if(req.cookies) {
            const token = req.cookies.nToken;
            if(token) {
                const students = await Student.find({}).sort('roll_id');
                if (students) {
                    res.status(201).json({
                        success: true,
                        data: students
                    });
                } else {
                    res.status(400).json({
                        success: true,
                        message: 'No students are registered'
                    })
                }
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Please generate a token first!'
                })
            }   
        }    
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }           
};

const findByDivision = async (req, res) => {
    try {
        if(req.cookies) {
            const token = req.cookies.nToken;
            if(token) {
                const students = await Student.find({division: req.params.div.toUpperCase()}).sort('roll_id');
                if (students) {
                    res.status(201).json({
                        success: true,
                        data: students
                    });
                } else {
                    res.status(201).json({
                        success: true,
                        data: 'No students are registered'
                    });
                }
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Please generate a token first!'
                });
            }      
        } 
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }           
};

const findParticularStudent = async (req, res) => {
    try {
        if(req.cookies) {
            const token = req.cookies.nToken;
            if(token) {
                const student = await Student.findOne({roll_id: req.params.id});
                if (student) {
                    res.status(201).json({
                        success: true,
                        data: student
                    });
                } else {
                    res.status(400).json({
                        success: false,
                        data: 'Student not found'
                    });
                }
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Please generate a token first!'
                });
            } 
        }       
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }   
};

const getCreateStudentPage = async (req, res) => {
    try {
        if(req.cookies) {
            const token = req.cookies.nToken;
            if(token) {
                var options = {
                    root: path.join(__dirname, '../public')
                };
                var fileName = '/createStudent.html';
                res.sendFile(fileName, options, function (err) {
                    if (err) {
                        throw new Error(err);
                    } 
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Please generate a token first!'
                });
            } 
        }    
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }   
};

const postCreateStudent = async (req, res) => {
    try {
        if(req.cookies) {
            const token = req.cookies.nToken;
            if(token) {
                const student = new Student({
                    ...req.body
                });
                await student.save();
                res.status(201).json({
                    success: true,
                    data: student
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Please generate a token first!'
                })
            }     
        }   
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
};

const getUpdateStudentPage = async (req, res) => {
    try {
        if(req.cookies) {
            const token = req.cookies.nToken;
            if(token) {
                var options = {
                    root: path.join(__dirname, '../public')
                };
                var fileName = '/updateStudent.html';
                res.sendFile(fileName, options, function (err) {
                    if (err) {
                        throw new Error(err);
                    } 
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Please generate a token first!'
                });
            } 
        }      
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }   
};

const postUpdateStudent = async (req, res) => {
    try {
        if(req.cookies) {
            const token = req.cookies.nToken;
            if(token) {
                const student = await Student.findOne({roll_id: req.body.roll_id});
                if (student) {
                    student.name = req.body.name || student.name;
                    student.division = req.body.division || student.division;
                    student.year = req.body.year || student.year;
                    const updatedStudent = await student.save();
                    if (updatedStudent) {
                        res.status(201).json({
                            success: true,
                            data: updatedStudent,
                            message: 'Student updated'
                        }); 
                    }
                } else {
                    return res.status(404).json({
                        success: false,
                        message: "Student not found"
                    })
                }
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Please generate a token first!'
                })
            }   
        }
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
};

const getDeleteStudentPage = async (req, res) => {
    try {
        if(req.cookies) {
            const token = req.cookies.nToken;
            if(token) {
                var options = {
                    root: path.join(__dirname, '../public')
                };
                var fileName = '/deleteStudent.html';
                res.sendFile(fileName, options, function (err) {
                    if (err) {
                        throw new Error(err);
                    } 
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Please generate a token first!'
                });
            } 
        }      
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }   
};

const postDeleteStudent = async (req, res) => {
    try {
        if(req.cookies) {
            const token = req.cookies.nToken;
            if(token) {
                const student = await Student.findOne({roll_id: req.body.roll_id});
                if (!student) {
                    return res.status(404).json({
                        success: false,
                        message: "Student not found"
                    })
                }
                student.remove();
                res.status(201).json({
                    success: true,
                    data: student,
                    message: 'Student removed'
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Please generate a token first!'
                })
            }    
        }     
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
};

module.exports = { getIndexPage, 
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
                }