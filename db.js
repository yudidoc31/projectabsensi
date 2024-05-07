const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'absensi_mahasiswa',
  password: '313',
  port: 5432,
});

module.exports = pool;
