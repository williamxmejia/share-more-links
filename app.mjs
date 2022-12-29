
import express from "express"
import mysql2 from "mysql2"
import cors from "cors"
import dotenv from "dotenv"

const app = express()

dotenv.config()
console.log(process.env)

const connection = mysql2.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: 'testing'
});

app.set('view engine', 'ejs');

connection.query("SELECT * FROM users", (err, results) => {
    if(err) throw err;
    console.log(results)
})


app.listen(3000, () => {
    console.log("Connected")
})
