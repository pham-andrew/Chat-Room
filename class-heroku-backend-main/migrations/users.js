// 20210715155156_migrate.js


exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
      table.increments('id'); // adds an auto incrementing PK column
      table.string('name').unique().notNullable();
      table.string('password').notNullable();
    });
  };

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};