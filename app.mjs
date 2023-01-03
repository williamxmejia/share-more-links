import express from "express";
import mysql2 from "mysql2";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import bodyParser from "body-parser";
import {check, validationResult } from "express-validator";

const app = express();

const __dirname = path.resolve();

dotenv.config();

const PORT = process.env.LOCALPORT;
const HOST = process.env.IP;


const pool = mysql2.createPool({
  host: process.env.HOST,
  port: process.env.PORT,
  user: "user221",
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: 100,
  multipleStatements:true
});

app.set("view engine", "ejs");
app.use("/static", express.static(__dirname + "/public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.render("pages/index");
});

app.post("/", (req, res) => {
  let endPoint = (Math.random() + 1).toString(36).substring(7);
  let website = req.body.input;
  let sql = "INSERT INTO url(website, shortened_url) VALUES(?, ?)";

  pool.query(sql, [website, endPoint], (err, result) => {
    if (err) throw err;
  });

   res.send(
	`<div><h3><a href="/">Create Another</a><h3>
	<h3><a href="/list">All Links</a></h3></div>
	<a href= '/url/${endPoint}'>https://sml.onrender.com//url/${endPoint}</a>`
   );

});

app.get("/url/:endpoint", (req, res) => {
  let sql = `SELECT WEBSITE FROM url WHERE shortened_url=${mysql2.escape(
    req.params.endpoint
  )}`;
  let website = "";

  pool.query(sql, (err, result) => {
    if (err) throw err;

    website = result[0].WEBSITE;


    res.redirect(301, `https://${website}`);
  });
});

app.get("/list", (req, res) => {
  const sql = "SELECT * FROM url";
  pool.query(sql, (err, result) => {
    if (err) throw err;

    res.render("pages/list", { data: result });
  });
});

app.listen(PORT, HOST, () => {
  console.log(`${HOST}:${PORT} connected`);
});
