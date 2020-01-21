var mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
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
        required: false
    },
    mediaType: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Media', mediaSchema);

