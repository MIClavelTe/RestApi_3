'use strict';
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.json({response: 'Sent a GET request'});
});

router.post('/', function(req, res) {
    res.json({
        response: 'Sent a POST request',
        body: req.body
    });
});

router.get('/:id', function(req, res) {
    res.json({
        response: 'Sent a GET request for ID ' + req.params.id
    })
})


module.exports = router;