"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var bluebird = require("bluebird");
// A workaround do not get the depricated use of promises (need more research)
mongoose.Promise = bluebird;
var blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    author_id: String,
    comment: String,
    date: {
        type: Date,
        "default": Date.now
    },
    metaData: {
        vote: { type: Number, "default": 0 },
        favs: { type: Number, "default": 0 }
    }
});
var userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        lowercase: true,
        unique: true,
        require: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        "default": false
    }
});
mongoose.connect('mongodb://localhost/test', { useMongoClient: true }, function (err) {
    if (err)
        console.log('conection Error when trying to connect to mongodb');
});
// These are models, instance of models are documents. 
exports.userInfo = mongoose.model('userInfo', userSchema), exports.blogInfo = mongoose.model('blogInfo', blogSchema);
