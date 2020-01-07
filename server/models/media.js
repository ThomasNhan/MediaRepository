var mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    comment: {
        type: String
    },
    mediaType: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Media', mediaSchema);

