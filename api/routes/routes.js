
var express = require('express'),
    router = express.Router();
var controller = require('../controllers/controller');

router.get('/task1/I/want/title', controller.getTitles);

router.get('/task2/I/want/title', controller.getTitlesAsync);

module.exports = router;