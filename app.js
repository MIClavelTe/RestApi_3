'use strict'
var express = require('express');
var app = express();

app.use(function(req, res, next) {
    req.question = '<h2 style="color: ' + req.query.color + '">Q: What did the Pacific and Atlantic do to each other?</h2>';
    req.answer = '<h2 style="color: ' + req.query.color + '">A: They waved to each other</h2>';
    next();
});

app.use('/question', function(req, res, next) {
    res.send(req.question);
    next();
});

app.use('/answer', function(req, res, next) {
    res.send(req.answer);
    next();
});

var port = process.env.PORT ||  7000
app.listen(port, function() {
    console.log(`Running On Port:${port}`);
});