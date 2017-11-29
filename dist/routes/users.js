"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
// Set database
const config_1 = require("../db/config");
let router = express.Router();
exports.router = router;
/* GET users listing. */
// Users can see login page.
router.get('/', function (req, res, next) {
    res.render('subscribe'); // Render page of log in. 
});
// Users are allowed to subscribe.
router.post('/subscribe', (req, res, next) => {
    let user = new config_1.userInfo({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
    });
    user.save()
        .then(function resolve(info) {
        console.log('Data for', info);
        res.render('index');
    }, function reject(reason) {
        console.log('data has not been saved due to code', reason.code);
        if (reason.code == 11000) {
            res.render('login', { msg: 'Not saved', userName: req.body.name });
        }
        else {
            res.render('index');
        }
    })
        .catch((err) => console.log('This is the error', err));
});
