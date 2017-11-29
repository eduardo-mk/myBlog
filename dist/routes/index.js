"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
let router = express.Router();
exports.router = router;
/* GET home page. */
// myHost:/   Landing Page.
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});
