exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('messages').del()
      .then(function () {
        // Inserts seed entries
        return knex('messages').insert([
          {message: 'you are now connected to an unsecure chat...'},
          {message: 'party on Andrew.'},
          {message: 'party on Alex.'},
        ]);
      });
  };