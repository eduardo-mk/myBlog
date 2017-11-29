"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const config_1 = require("../db/config");
const security_1 = require("./security");
let router = express.Router();
exports.router = router;
/* auth/     ROUTING */
// auth/
router.get('/', function (req, res, next) {
    res.render('login');
});
//auth/login
router.post('/login', function (req, res, next) {
    console.log('auth/login');
    config_1.userInfo.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log('Problem with email (not include this in production)');
            next(err); //giveUp. 
        }
        else {
            if (user) {
                if (user.password == req.body.password) {
                    security_1.matchItWithDB(req, res, next);
                }
                else {
                    res.render('login', { msg: 'Please try again, name or password might be invalid. ' });
                }
            }
            else {
                res.render('login', { msg: 'Please try again.' });
            }
        }
    });
});
