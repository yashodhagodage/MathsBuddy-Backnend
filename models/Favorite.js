const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    user_id: {
        type: String,
        required: true

    },
    question_id: {
        type: String,
        required: true

    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Favorite', favoriteSchema);