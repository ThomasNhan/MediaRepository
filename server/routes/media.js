var express = require('express');
var router = express.Router();
var MediaModel = require('../models/media');
var fs = require('fs');
var AWS = require('aws-sdk');

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
    console.log(req.body.fileName);
    const media = new MediaModel({
        author: req.body.author,
        publisher: req.body.publisher,
        description: req.body.description,
        fileName: req.body.fileName,
        mediaType: req.body.mediaType
    });

    try {
        const newMedia = await media.save();
        res.status(201).json(newMedia);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/upload', async function (req, res, next) {
    console.log(req);
    //Create reference for S3 bucket
    const s3 = new AWS.S3({
        accessKeyId: 'AKIAJXOE5MHOBVUYYVCA',
        secretAccessKey: '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'
    });
    //Read content from request body
    //const fileContent = fs.readFileSync(req.body.media);

    //Setting up S3 upload parameters
    const params = {
        Bucket: 'iteach-thomas-n',
        Key: 'req.body.filename',
        Body: req.body.media
    };

    s3.upload(params, function (err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully, ${data.Location}`);
    });
});

module.exports = router;
