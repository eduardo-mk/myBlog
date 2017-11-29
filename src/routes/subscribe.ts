
import * as express from 'express';

// Set database
import { userInfo, infoUserModel, blogInfo } from '../db/config';
let router = express.Router();

/* GET users listing. */

// Users can see login page.
router.get('/', function(req, res, next) {
  res.render('subscribe'); // Render page of log in. 
});


// Susbscribing users. 
router.post('/subscribeUser', (req: express.Request, res, next)=> {

  let user = new userInfo ({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
  });

  user.save()
  .then(function onFulfilled (msg) {
    console.log('Succes: ' + msg);
    res.render('index')
  }, function onReject(reason){
    console.log('Fail on saving data: ' + reason )
    res.render('login', { msg: 'Sorry not saved', userName: req.body.name })
  })
  .catch((err)=> console.log('This is the error', err))
})

export { router }