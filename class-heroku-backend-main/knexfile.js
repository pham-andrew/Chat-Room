// Update with your config settings.
const connectionString = process.env.DATABASE_URL

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    }
  },

  //from docker checkpoint
  // development: {
  //   client: 'pg',
  //   connection,
  //   migrations: {
  //     tableName: 'knex_migrations',
  //     directory: path.join(__dirname, '/migrations'),
  //   },
  //   seeds: { directory: path.join(__dirname, '/seeds') },
  // },

  // from initial docker project
  // development: {
  //   client: 'pg',
  //   connection: connection_string,
  // },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: {
      connectionString,
      ssl: {
        rejectUnauthorized: false,
        require: false
      },
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations',
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  }

};
