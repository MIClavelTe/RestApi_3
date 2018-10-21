'use strict';
var express = require('express');
var router = express.Router();

//GET /questions
router.get('/', function(req, res) {
    res.json({response: 'Sent a GET request to /questions'});
});

//POST /questions
router.post('/', function(req, res) {
    res.json({
        response: 'Sent a POST request to /questions',
        body: req.body
    });
});

//GET /questions/:qID
router.get('/:qID', function(req, res) {
    res.json({
        response: 'Sent a GET request for /questions/' + req.params.qID
    });
});

//POST /questions/:qID/answers
router.post('/:qID/answers', function(req, res) {
    res.json({
        response: 'Sent a POST request for /questions/answers',
        questionId: req.params.qID,
        body: req.body
    });
});

//PUT /questions/:qID/answers/:aID
router.put('/:qID/answers/:aID', function(req, res) {
    res.json({
        response: 'Sent a PUT request for /questions/answers',
        questionId: req.params.qID,
        answerId: req.params.aID,
        body: req.body
    });
});

//DELETE /questions/:qID/answers/:aID
router.delete('/:qID/answers/:aID', function(req, res) {
    res.json({
        response: 'Sent a DELETE request for /questions/answers',
        questionId: req.params.qID,
        answerId: req.params.aID
    });
});

//POST /questions/:qID/answers/:aID/vote-up
//POST /questions/:qId/answers/:aID/vote-down
router.post('/:qID/answers/:aID/vote-:dir', function(req, res) {
    res.json({
        response: 'Sent a POST request for /questions/answers/vote-' + req.params.dir,
        questionId: req.params.qID,
        answerId: req.params.aID,
        vote: req.params.dir
    });
});


module.exports = router;