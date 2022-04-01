const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const historySchema = new Schema({
    user_id: {
        type: String,
        required: true

    },
    question_category: {//image
        type: String,
        required: true

    },
    marks: {
        type: Number,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('History', historySchema);