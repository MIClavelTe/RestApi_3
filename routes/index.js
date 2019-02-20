'use strict';
var express = require('express');
var router = express.Router();

var Question = require('../model').Question;

router.param("qID", function(req, res, next, id) {
    Question.findById(id, function(err, doc) {
        if (err) return next(err);
        if (!doc) {
            err = new Error('Not Found');
            err.status = 404;
            return next(err);
        }
        req.question = doc;
        return next();
    });
});

//GET /questions
router.get('/', function(req, res, next) {
    Question.find({}) 
        .sort({createdAt: -1})
        .exec(function(err, questions) {
            if (err) return next(err);
            res.json(questions);
    });
});

//POST /questions
router.post('/', function(req, res, next) {
    var question = new Question(req.body);
    question.save(function(err, question) {
        if (err) return next(err);
        res.status(201);
        res.json(question);
    }); 
});

//GET /questions/:qID
router.get('/:qID', function(req, res, next) {
    Question.findById(req.params.qID, function(err, doc) {
        if (err) return next(err);
        res.json(doc);
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
router.post('/:qID/answers/:aID/vote-:dir', function(req, res, next) {
    if (req.params.dir.search(/^(up|down)$/) === -1) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    } else {
        next();
    }
}, function(req, res) {
    res.json({
        response: 'Sent a POST request for /questions/answers/vote-' + req.params.dir,
        questionId: req.params.qID,
        answerId: req.params.aID,
        vote: req.params.dir
    });
});


module.exports = router;