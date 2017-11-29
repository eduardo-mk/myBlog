"use strict";
exports.__esModule = true;
var express = require("express");
var security_1 = require("./security");
var config_1 = require("../db/config");
var router = express.Router();
exports.router = router;
var today = new Date();
// Variables declaration
/* GET home page. */
// blog/
router.get('/', security_1.isAuth({ session: false, failureRedirect: '/blog/noAuth' }), function (req, res, next) {
    res.render('blog', { msg: "Let's start " + req.user.name });
});
// blog/comment/
router.post('/comment', security_1.isAuth({ session: false, failureRedirect: '/blog/noAuth' }), function (req, res, next) {
    var comment = new config_1.blogInfo({
        title: req.body.title,
        comment: req.body.comment,
        author: req.user.name,
        author_id: req.user._id
    });
    comment.save()
        .then(function onFulfilled(msg) {
        console.log('Data sucessfully saved');
        res.render('blog', { msg: 'Your message has been saved ' + req.user.name });
    }, function onRejected(reason) {
        console.log('Data not saved!', reason);
        res.render('blog', { msg: 'A problem had occured ' + req.user.name + ' Sorry!' });
    });
});
// blog/readPost
router.get('/readPost/:page', security_1.isAuth({ session: false, failureRedirect: '/blog/noAuth/' }), dbConsultBlogComments);
// blog/noAuth
router.get('/noAuth', function (req, res, next) {
    res.render('login', { msg: 'Plese Log In first to access the blog.' });
});
// Functions needed. 
function dbConsultBlogComments(req, res, next) {
    var actualPage = req.params.page >= 0 ? Number(req.params.page) : 0;
    config_1.blogInfo.find({}).sort({ date: -1 }).skip(4 * actualPage).limit(4).exec(function (err, comments) {
        if (err) {
            console.log('An error has occured! ');
            res.json({ msg: 'Error, a problem has occurred in data base' }); // For dev, not for production, I need a templete to land errors, a generic at least.
        }
        else {
            res.render('readPost', { comments: comments, page: actualPage, timeIndicator: daysOld(comments) });
        }
    });
}
;
function daysOld(comments) {
    var days = [];
    var hours = 0;
    for (var index = 0; index < comments.length; index++) {
        var element = comments[index];
        hours = Math.abs(today.getTime() - element.date.getTime()) / (1000 * 3600);
        if (hours < 1) {
            days.push('A moment');
        }
        else if (hours < 24) {
            days.push(Math.ceil(hours) + ' hours');
        }
        else {
            var day = Math.ceil(hours % 24);
            days.push(day + 'days');
        }
    }
    return days;
}
