import express from "express";
import mysql2 from "mysql2";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import bodyParser from "body-parser";

const app = express();

const __dirname = path.resolve();

dotenv.config();

const connection = mysql2.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

app.set("view engine", "ejs");
app.use("/static", express.static(__dirname + "/public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


app.get("/", (req, res) => {
  res.render("pages/index")
});

app.post("/", (req, res) => {
  let endPoint = (Math.random() + 1).toString(36).substring(7);
  let website = req.body.input;
  let sql = "INSERT INTO url(website, shortened_url) VALUES(?, ?)";

  connection.query(sql, [website, endPoint], (err, result) => {
    if (err) throw err
  });

  res.send(`<a href= 'http://localhost:3000/url/${endPoint}'>https://localhost:3000/url/${endPoint}</a>`)
});

app.get("/url/:endpoint", (req,res) => {
    let sql = `SELECT WEBSITE FROM url WHERE shortened_url=${mysql2.escape(req.params.endpoint)}` 
    let website = "";

    connection.query(sql, (err, result) => {
        if(err) throw err

        website =result[0].WEBSITE
        console.log(website)

        res.redirect(301, `https://${website}`)

    })
    
})

app.listen(3000, () => {
  console.log("Connected");
});
