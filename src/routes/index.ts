import * as express from 'express';

let router = express.Router();

/* GET home page. */

// myHost:/   Landing Page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

export {router}
