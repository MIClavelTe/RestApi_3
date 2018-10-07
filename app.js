'use strict'
var express = require('express');
var app = express();

var jsonParser = require('body-parser').json;
app.use(jsonParser());

var port = process.env.PORT ||  7000
app.listen(port, function() {
    console.log(`Running On Port:${port}`);
});