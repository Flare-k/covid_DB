import "@babel/polyfill";
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // json, html, text, urlencoded 할 거 없이 다 parser할 수 있도록 설정해줘야 한다.

app.get('/api/patients', (req,res)=>{
    res.send([
    {
        'id': 1,
        'image': 'https://placeimg.com/64/64/1',
        'name': '신%%',
        'birthday': '940603',
        'gender': '남자',
        'job': '직업군인'
    },
    {
        'id': 2,
        'image': 'https://placeimg.com/64/64/2',
        'name': '강##',
        'birthday': '940529',
        'gender': '남자',
        'job': '대학생'
    },
    {
        'id': 3,
        'image': 'https://placeimg.com/64/64/3',
        'name': '조@@',
        'birthday': '941003',
        'gender': '남자',
        'job': '취준생'
    }
]);
});

const handleListening = () => {
  console.log(`✅  Listening on: http://localhost:${PORT}`);
  // call-back함수.
  // PORT를 listen하기 시작할 때 함수를 호출해준다.
};

app.listen(PORT, handleListening);
