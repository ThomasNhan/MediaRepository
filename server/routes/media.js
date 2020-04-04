var express = require('express');
var router = express.Router();
var multer = require('multer');
var MediaModel = require('../models/media');
var fs = require('fs');

const DIR = 'public/';

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, DIR)
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
});

var upload = multer({
    storage: storage
});

/* GET home page. */
router.get('/', async function (req, res, next) {
    //change this code to be json and res.send rather than res.render
    try {
        var media;
        media = await MediaModel.find();

        res.json({ success: true, data: media });
    } catch (err) {
        console.log('Error: ', err);
    }

});

router.post('/', upload.single('media'), async function (req, res, next) {

    //Check to see if the media title already exists
    MediaModel.findOne({ 'title': req.body.title }, (err, m) => {
        if (m) {
            res.status(400).json({ message: 'Title already exists' })
        }
    });

    //Check to see if the media title already exists
    MediaModel.findOne({ 'fileName': req.file.filename }, (err, f) => {
        if (f) {
            res.status(400).json({ message: 'Filename already exists' })
        }
    })

    const url = `${req.protocol}://${req.get('host')}`;

    const media = new MediaModel({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        datePublished: req.body.datePublished,
        submittedBy: req.body.submittedBy,
        fileName: req.file.filename,
        mediaType: req.file.mimetype,
        dateSubmitted: Date.now(),
        url: `${url}/public/${req.file.filename}`
    });

    try {
        const newMedia = await media.save();
        res.status(201).json(newMedia);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
});

router.post('/uploadfile', upload.single('MyMedia'), (req, res, next) => {
    console.log(req.body);
    const file = req.body.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(file)

})
module.exports = router;
