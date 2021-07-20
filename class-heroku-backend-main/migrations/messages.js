// 20210715155157_migrate.js


exports.up = function(knex) {
    return knex.schema.createTable('messages', table => {
      table.increments('id'); // adds an auto incrementing PK column
      table.string('message').notNullable();
      table.timestamps(true, true); // adds created_at and updated_at
    });
  };
  
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('messages');
};