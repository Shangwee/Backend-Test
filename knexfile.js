require('dotenv').config()

const { CLIENT, DATABASE, PG_USER, PASSWORD, HOST, PG_PORT } = process.env


module.exports = {

  development: {
    client: CLIENT,
    connection: {
      database: DATABASE,
      user: PG_USER,
      password: PASSWORD,
      host: HOST,
      port: PG_PORT
    },
    migrations: {
      directory: './db/migrations', // Path to migrations folder
    },
    seeds: {
      directory: './db/seeds', // Path to seeds folder
    },
  },
};
