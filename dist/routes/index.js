"use strict";
exports.__esModule = true;
var express = require("express");
var router = express.Router();
exports.router = router;
/* GET home page. */
// myHost:/   Landing Page.
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});
