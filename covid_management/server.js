/* eslint-disable no-console */
import "@babel/polyfill";
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import multer from "multer";    // 파일 전송을 위한 라이브러리
import dbConfig from "./config/db";
import mysql from "mysql";
const conn = dbConfig.init();
dbConfig.connect(conn);
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const upload = multer({dest:'./upload'});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 사용자 입장에서 image라는 이름의 경로로 접근을 하는데, 실제 서버의 upload 폴더와 매핑되어 있다.
app.use('/image', express.static('./upload'));   // static을 이용해 upload 폴더를 공유한다. image 폴더에서 upload 폴더로 접근한다.


// 확진자 테이블
app.get('/api/patients', async (req,res) => {
    await conn.query(
        "SELECT * FROM PATIENTS WHERE isDeleted = 0",
        (err, rows, field) => {
            res.send(rows);
        }
    );
});

// 특정 확진자 동선
app.get('/api/patients/info/:id', async (req,res) => {
    //console.log("Req id: "+req.params.id);
    await conn.query(
        `SELECT * FROM ROUTES WHERE patient_id = ${req.params.id}`,
        (err, rows, field) => {
            //console.log(rows);
            res.send(rows);
        }
    );
});

// 확진자 추가
app.post('/api/patients', upload.single('image'), (req, res) => {
    // const image = '/image/' + req.file.filename;    // 사용자는 image 경로에 있는 해당 파일이름으로 접근한다.
    // 즉, image라는 변수로 실제로 프로필 이미지의 바이너리 데이터를 서버에 전송 ->  그때의 파일이름도 같이 전송받는데 multer가 자동으로 겹치지 않게 설정해준다.
    const patient_id = req.body.patient_id;
    const country = req.body.country;
    const gender = req.body.gender;
    const age = req.body.age;
    const infection_reason = req.body.infection_reason;
    const confirmed_date = req.body.confirmed_date;
    const province = req.body.province;
    const city = req.body.city;

    const paramsPatients = [patient_id, country, gender, age, infection_reason, confirmed_date, province, city]
    const paramsResidence = [patient_id, city, province, country];
    const paramsRoutes = [1, patient_id, confirmed_date, confirmed_date, "자택", province, city];
    
    const sqlPatients = 'INSERT INTO PATIENTS VALUES (?, ?, ?, ?, ?, ?, ?, ?, now(), 0); ';
    const sql1 = mysql.format(sqlPatients, paramsPatients);
    
    const sqlResidence = 'INSERT INTO RESIDENCE VALUES (?, ?, ?, ?, now(), 0); ';
    const sql2 = mysql.format(sqlResidence, paramsResidence);
    
    const sqlRoutes = 'INSERT INTO ROUTES VALUES (?, ?, ?, ?, ?, ?, ?, now(), 0); ';
    const sql3 = mysql.format(sqlRoutes, paramsRoutes);
    
    const sql = sql1 + sql2 + sql3;
    
    conn.query(sql, (err, rows, field) => {
            res.send(rows);
        }
    );
})

// 확진자 테이블
app.delete('/api/patients/:id', (req, res) => {
    const sql = `UPDATE PATIENTS AS a, RESIDENCE AS b, ROUTES AS c
                    SET a.isDeleted = 1,
                        b.isDeleted = 1,
                        c.isDeleted = 1
                    WHERE a.patient_id =${req.params.id}
                        AND b.patient_id =${req.params.id}
                        AND c.patient_id =${req.params.id};`;
    //const params = [req.params.id];
    conn.query(sql, (err, rows, field) => {
            res.send(rows);
        }
    );
})


const handleListening = () => {
  console.log(`✅  Listening on: http://localhost:${PORT}`);
  // call-back함수.
  // PORT를 listen하기 시작할 때 함수를 호출해준다.
};

app.listen(PORT, handleListening);
