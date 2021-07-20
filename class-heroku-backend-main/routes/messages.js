var express = require('express');
var router = express.Router();
const db = require('../db')
/*const knex = require('knex')({
    client: 'pg',
    connection: process.env.DATABASE_URL,
    searchPath: ['knex', 'public'],
  });

/*
require('knex')({
  client: 'pg',
  connection: 'postgres://user:pass@localhost:5432/dbname'
})

*/

/* GET users listing. */
const getUserId=(username)=>{
  return (
    db('users')
    .where({ username: `${username}`})
    .select('id')
  )
}



router.get('/', function(req, res, next) {


    db.from('messages_users')
    .leftJoin('messages', 'messages_users.messages_id', 'messages.id' )
    .leftJoin('users', 'messages_users.users_id', 'users.id')
    .select('users.name','messages.message', 'messages.id', 'messages.created_at')
    .orderBy('messages.created_at', 'asc')
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(500).json({
        message: err
      })
    );


  });



router.get('/dev', function(req, res, next) {


      db.from('messages_users')
        .leftJoin('messages', 'messages_users.messages_id', 'messages.id' )
        .leftJoin('users', 'messages_users.users_id', 'users.id')
        .select('users.name','messages.message', 'messages.created_at')
        .orderBy('messages.created_at', 'desc')
        .then(data => res.status(200).json(data))
        .catch(err =>
          res.status(500).json({
            message: err
          })
        );


    });



router.get('/alljoin', function(req,res,next){
  db.select('*')
  .from('messages_users')
  .then(data => res.status(200).json(data))
  .catch(err =>
    res.status(500).json({
      message: err
    })
  );
})



// takes username and message
router.post('/postmessage', function(req,res,next){


  console.log('messages post:', req.body)

  db('users')   // first select user id
  .where({ name: `${req.body.username}`})
  .select('id')
  .then( userId => {  // then insert message returning the id
    db('messages')
    .insert({ 
      message : `${req.body.message}`
    })
    .returning('id')
    .then(messageId => {  // finally insert into the join table
      console.log('messageId: ', messageId[0])
      console.log('userId: ', userId[0].id)
      db('messages_users')
      .insert({ 
        messages_id: `${messageId[0]}`, 
        users_id:`${userId[0].id}`
      })
      .then(data => res.status(200).json(data))
      .catch(err =>
        res.status(500).json({
          message: err
        })
      );
    })
  })
  

})

module.exports = router;
