// DAL/DBconnection.js
import mysql from "mysql2/promise";

const db = await mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Ahmad_2025$*", 
  database: "lebmovies",
  port: 3306,
});

console.log("✅ Connected to lebmovies DB (Promise Pool Mode)");

export default db;
