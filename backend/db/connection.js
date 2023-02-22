// PG database client/connection setup
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const connectDb = async () => {
  try {
    await pool.connect();
    console.log("Successfully connected to db.");
  } catch (err) {
    console.log(err);
  }
};

connectDb();

module.exports = pool;
