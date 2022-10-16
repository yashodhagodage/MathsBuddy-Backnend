const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    first_name: {
        type: String,
        required: true

    },
    last_name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    date_of_birth:{
        type: Date,
        required: true
    },
    password:{
        type: String,
        required: true,
        max: 1024,
        min: 8
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Employee', employeeSchema);
