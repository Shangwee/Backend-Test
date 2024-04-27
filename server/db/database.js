  const pgp = require('pg-promise')();
  require('dotenv').config();

  const {DATABASE, PG_PORT, PASSWORD, PG_USER, PG_HOST} = process.env


  const connectionDetails = {
    user: PG_USER,
    password: PASSWORD,
    host: PG_HOST,
    port: PG_PORT,
    database: DATABASE,
  };
  
  const db = pgp(connectionDetails); // Create a connection pool

  // test the connection  
  db.connect()
    .then(obj => {
        obj.done(); // success, release the connection;
    })
    .catch(error => {
        console.log('ERROR:', error.message || error);
    });
   
  module.exports = db;  // Export the database connection pool