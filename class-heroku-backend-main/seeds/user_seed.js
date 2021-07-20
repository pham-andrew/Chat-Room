exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('users').del()
      .then(function () {
        // Inserts seed entries
        return knex('users').insert([
          {name: 'admin', password: 'project5'},
          {name: 'andrew', password: 'securepassword'},
          {name: 'alex', password: 'alsosecurepassword'},
        ]);
      });
  };