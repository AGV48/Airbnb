const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  ssl: {
    rejectUnauthorized: false, // Esto es necesario si usas SSL en Neon Tech
  },
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};