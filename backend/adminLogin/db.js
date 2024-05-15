const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'post',
  password: '313',
  port: 5432,//5050
});

module.exports = pool;
