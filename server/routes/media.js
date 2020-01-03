var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    //change this code to be json and res.send rather than res.render
    res.send({ "media": "success" });
});

router.post('/', function (req, res, next) {
    //change this code to be json and res.send rather than res.render
    res.send({ "index": "saved!" });
});

module.exports = router;
