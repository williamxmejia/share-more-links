import express from "express";
import mysql2 from "mysql2";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

const app = express();

const __dirname = path.resolve();

dotenv.config();

console.log(__dirname);
// console.log(process.cwd)
// console.log(__dirname)

const connection = mysql2.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: "testing",
});

app.set("view engine", "ejs");
app.use("/static", express.static(__dirname + "/public"));

// connection.query("SELECT * FROM users", (err, results) => {
//     if(err) throw err;
//     console.log(results)
// })

app.get("/", (req, res) => {
  res.render("pages/index");
});

app.listen(3000, () => {
  console.log("Connected");
});
