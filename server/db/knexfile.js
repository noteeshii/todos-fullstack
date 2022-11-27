module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'TODO',
      user: 'postgres',
      password: 'root'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
};
