// const mysql = require("mysql2/promise")
import mysql from "mysql2/promise";

const Mysql_db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "I12raftar",
  database: "mysql_db",
});
console.log("database connected");

// create database
// await Mysql_db.execute("create database mysql_db");
// console.log(await Mysql_db.execute("show databases"));

// create schema
// await Mysql_db.execute(`CREATE TABLE users (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(100) NOT NULL,
//     email VARCHAR(100) NOT NULL UNIQUE
// );
// `);

// insert data in database
// await Mysql_db.execute(`
//     insert into users(name,email) values("Manish","manandhar@gmial.com")
//     `);

// to use inser method
// await Mysql_db.execute(
//   `
//     insert into users(name,email) values(?,?)
//     `,
//   ["mane", "niggaasd@gmial.com"]
// );

// const userData = [
//   ["Alice", "alice123@example.com"],
//   ["Bob", "bob456@outlook.com"],
//   ["Charlie", "charlie789@gmail.com"],
//   ["David", "david1011@yahoo.com"],
//   ["Eve", "eve1213@aol.com"],
// ];

// await Mysql_db.query("insert into users(name,email) values ?", [userData]);

// reade data
const [rows] = await Mysql_db.execute(`select * from users`);
console.log(rows);
// console.log(userData);

// update
// try {
//   const [rows] = await Mysql_db.execute(
//     "update users set name='Manandhar' where email= 'manandhar@gmial.com'"
//   );
//   console.log("users Data", rows);
// } catch (error) {
//   console.error(error);
// }

// Delete
try {
  const [rows] = await Mysql_db.execute(
    "delete from users   where name='mane'"
  );
  console.log(rows);
} catch (error) {
  console.log(error.message);
}
