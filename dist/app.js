"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import standard middlewares. 
const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
// Routes for this app.
const index_1 = require("./routes/index");
const subscribe_1 = require("./routes/subscribe");
const auth_1 = require("./routes/auth");
const blog_1 = require("./routes/blog");
let app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/images/ring.ico'));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Mounting routes. 
app.use('/', index_1.router);
app.use('/subscribe', subscribe_1.router);
app.use('/blog', blog_1.router);
app.use('/auth', auth_1.router);
// //catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err: CustomError = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
// // error handler
// app.use(function(err: CustomError, req: express.Request, res: express.Response, next: express.NextFunction) {
//   // set locals, only providing error in development
//   res.locals.message = err;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
app.listen(3001);
// module.exports = app;
