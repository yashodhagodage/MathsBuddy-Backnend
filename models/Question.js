const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
    category: {
        type: String,
        required: true

    },
    question: {//image
        type: String,
        required: true

    },
    answer:{
        type: String,
        required: true
    },
    sample_answers:{
        type: String,
        required: true
    },
    guide:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Question', questionSchema);