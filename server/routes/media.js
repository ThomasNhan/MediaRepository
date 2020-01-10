var express = require('express');
var router = express.Router();
var MediaModel = require('../models/media');

/* GET home page. */
router.get('/', async function (req, res, next) {
    //change this code to be json and res.send rather than res.render
    try {

        var media = await MediaModel.find();
        res.json(media);
    } catch (err) {
        console.log('Error: ', err);
    }

});

router.post('/', async function (req, res, next) {
    const media = new MediaModel({
        url: req.body.url,
        author: req.body.author,
        publisher: req.body.publisher,
        comment: req.body.comment,
        mediaType: req.body.mediaType
    });

    try {
        const newMedia = await media.save();
        res.status(201).json(newMedia);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
