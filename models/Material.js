const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const materialSchema = new Schema({
    name: {
        type: String,
        required: true

    },
    material_link: {
        type: String,
        required: true

    },
    category: {
        type: String,
        required: true

    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Material', materialSchema);