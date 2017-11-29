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
// Susbscribing users. 
router.post('/subscribeUser', (req, res, next) => {
    let user = new config_1.userInfo({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
    });
    user.save()
        .then(function onFulfilled(msg) {
        console.log('Succes: ' + msg);
        res.render('index');
    }, function onReject(reason) {
        console.log('Fail on saving data: ' + reason);
        res.render('login', { msg: 'Sorry not saved', userName: req.body.name });
    })
        .catch((err) => console.log('This is the error', err));
});
