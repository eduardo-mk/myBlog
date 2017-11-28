import * as express from 'express';
import { userInfo, infoUserModel, blogInfo } from '../db/config';
import * as passport_jwt from 'passport-jwt';
import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';


// Set Security parameters for jsonwebtoken in cookies (i love cookies :)   ) 
function cookieExtractor(req: express.Request) {
    let token = null;
    if (req && req.cookies){
        token = req.cookies['token'];
    }
    return token;
}
// first: set options for strategy 
let opts = {
    jwtFromRequest: passport_jwt.ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: 'batmantrararararara',
}
// second: set strategy, is what passport is going to use. 
passport.use(new passport_jwt.Strategy(opts, function(jwt_payload, done){
    userInfo.findOne( {_id: jwt_payload.id}, function(err, user: infoUserModel){
        if (err) { console.log('Error when'); done(404) }
        else if ( user && user.admin ){ console.log('Valid user'); done(null, user) }  // Checking against db, if user is admin and if the user exists. 
        else { console.log('Invalid User'); done(null, false)}
    })
})):
// third: declare a function to look for the user 
function matchItWithDB(req: express.Request, res: express.Response, next: express.NextFunction) {
    userInfo.findOne({password: req.body.password, email: req.body.email}, function(err, user: infoUserModel) {
        if(err) {console.log('Some problem when looking in the database');  res.render('login', { msg:"Our system is under maintanance, please try again latter"})}
        else {
            if(user.admin){
                let token = jwt.sign({id: user.id}, opts.secretOrKey, { expiresIn: 86400000 }); // Just pass the id to the payload. Giving more 
                res.cookie('token', token, { maxAge: 86400000 });                              // info is not a good practice, we match id against 
                res.render('blog', {msg: user.name})                                       // db and then check if the user is admin (check passport.use)
            } else {
                res.render('login', {userName: user.name, msg:" You are not an admin."})
            }                                                                                
        }                                                                                   
    })
}
// fourth: Declare a variable to say passport how to authenticate. 
let  isAuth =  function( options: passport.AuthenticateOptions ) {
    return passport.authenticate('jwt', options)
}

 export {matchItWithDB, isAuth}