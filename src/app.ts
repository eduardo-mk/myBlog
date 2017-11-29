
// Import standard middlewares. 
import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon'
import * as logger from 'morgan'; 
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';

// Routes for this app.
import { router as index } from  './routes/index';
import { router as subscribe } from './routes/subscribe';
import { router as auth } from './routes/auth';
import { router as blog } from './routes/blog';
// Custom types. 
import { CustomError  } from './customTypes';


let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/images/ring.ico'));

// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true } ));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Mounting routes. 
app.use('/', index);
app.use('/subscribe', subscribe);
app.use('/blog', blog)
app.use('/auth', auth)

// //catch 40000000vierasdfasdsf 
// app.use(function(req, res, next) {
//   var err: CustomError = new Error('Not Found');git 
//   err.status = 404;
//   next(err);
// })

// // error handler
// app.use(function(err: CustomError, req: express.Request, res: express.Response, next: express.NextFunction) {
//   // set locals, only providing error in development
//   res.locals.message = err;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.listen( process.env.PORT || 3001)
// module.exports = app;    
