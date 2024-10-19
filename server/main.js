"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var app = express();
app.get('/', function (req, res) {
    res.send('hello world');
});
app.listen(3000);
