import * as express from 'express';
import { userInfo, infoUserModel, blogInfo } from '../db/config';
import {matchItWithDB, isAuth} from './security';
let router = express.Router();

/* auth/     ROUTING */



// auth/
router.get('/', function(req, res, next) {
  res.render('login');
});

//auth/login
router.post('/login', function(req, res, next) {
    console.log('auth/login')
    userInfo.findOne({email: req.body.email}, function(err, user: infoUserModel){
        if(err) {
            console.log('Problem with email (not include this in production)');
            next(err); //giveUp. 
        } else {
            if (user){
                if (user.password == req.body.password) {
                    matchItWithDB(req, res, next);
                } else {
                    res.render('login', {msg: 'Please try again, name or password might be invalid. '})
                }
            } else {
                res.render('login', {msg: 'Please try again.'})
            }
        }
          
    })
  });
  


export {router}
