const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'unas',
  password: '313',
  port: 5432,//5050
});

pool.connect()
  .then(() => {
    console.log('Connect to postgres database: unas');
  })
  .catch((err) => {
    console.log(`Error connecting to postgres database`);
  })

module.exports = pool;