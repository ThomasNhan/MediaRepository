var mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        unique: true,
    },
    url: {
        type: String,
        required: false
    },
    author: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    fileName: {
        type: String,
        required: false,
        unique: true,
    },
    mediaType: {
        type: String,
        required: false
    },
    size: {
        type: Number,
        required: false
    },
    datepublished: {
        type: Date,
        required: false
    },
    datesubmitted: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Media', mediaSchema);

