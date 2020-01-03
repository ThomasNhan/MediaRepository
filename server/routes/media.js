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

router.post('/', function (req, res, next) {
    //change this code to be json and res.send rather than res.render
    res.send({ "index": "saved!" });
});

module.exports = router;
