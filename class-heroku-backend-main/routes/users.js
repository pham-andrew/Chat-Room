var express = require('express');
var router = express.Router();
const db = require('../db')

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.select('*')
  .from('users')
  .then(data => res.status(200).json(data))
  .catch(err =>
    res.status(500).json({
      message: err
    })
  );
});

router.post('/newuser', function(req, res, next) {
  console.log(req.body)
  db('users')
  .insert({
    name: `${req.body.name}`, 
    password: `${req.body.password}`
  })
  .then(data => res.status(200).json(data))
  .catch(err =>
    res.status(500).json({
      message: err
    })
  );
})

router.post('/login', function(req, res, next) {
  console.log('/login hit:', req.body)
  db('users')
  .where('name', req.body.name)
  .andWhere('password', req.body.password)
  .select('name')
  .then(data => {
    if(data[0].name){
      res.cookie('username', `${req.body.name}`, { domain:".ionizing.space"})
      .send('Logged in')
      .status(200)
    } else {
      res.send('Invalid credentials')
      .status(401)
    }
  })
  .catch(err => {
    console.error('OUR ERROR',err)
    res.status(502).json({
      message: err
    })  
  }
);
})

module.exports = router;