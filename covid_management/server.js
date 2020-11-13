/* eslint-disable no-console */
import "@babel/polyfill";
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import dbConfig from "./config/db";
const conn = dbConfig.init();
dbConfig.connect(conn);


dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // json, html, text, urlencoded 할 거 없이 다 parser할 수 있도록 설정해줘야 한다.

app.get('/api/patients', async (req,res) => {
    await conn.query(
        "SELECT * FROM PATIENT",
        (err, rows, field) => {
            res.send(rows);
        }
    );
});

const handleListening = () => {
  console.log(`✅  Listening on: http://localhost:${PORT}`);
  // call-back함수.
  // PORT를 listen하기 시작할 때 함수를 호출해준다.
};

app.listen(PORT, handleListening);
