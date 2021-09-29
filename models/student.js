const express = require('express');
const mongoose = require('mongoose');

const studentSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        division: {
            type: String,
            required: true,
        },
        year: {
            type: String,
            required: true,
        },
        roll_id: {
            type: Number,
            required: true,
            unique: true,
        }
    },
    {
        timestamps: true,
    }
);

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;