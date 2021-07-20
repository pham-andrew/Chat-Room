// 20210715155155_migrate.js

exports.up = function(knex) {
    return knex.schema.createTable('messages_users', table => {
      table.increments('id'); // adds an auto incrementing PK column
      table.integer('messages_id').notNullable();
      table.integer('users_id').notNullable();
    });
  };

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('messages_users');
};
  