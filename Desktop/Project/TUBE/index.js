/*
    require가 하는 일은 node module을 어딘가에서 가져오는 것이다. 
    express라는 이름의 폴더를 파일들 속에서 찾기 시작하고 못 찾으면 node_moudules 안에서 찾으려고 한다.
    node_modules에서 express를 찾고 그 안에 index.js를 찾는다.
*/
//const express = require("express");
import express from "express"; //최신 js 문법인데 이를 babel이 해석해준다. babel을 설치해주고 실행을 위해 package.json 부분도 약간 수정해준다. --> "start": "babel-node index.js"
const app = express();
const PORT = 4000;

function handleListening() {
    console.log(`Listening on: http://localhost:${PORT}`);
    //call-back함수.
    //PORT를 listen하기 시작할 때 함수를 호출해준다.
}

function handleHome(req, res) {
    //console.log(req);
    res.send('Hello from home!'); //서버가 응답하게 해준다.
}
const handleProfile = (req, res) => res.send("You are on my profiles.");
//ES6로 위에 있는 함수와 같은 내용이다. = Arrow Function

const betweenHome = (req, res, next) => {
    //next key를 줌으로써 브라우저에게 요청을 계속 처리할지에 대해 권한을 준다.
    console.log('Between');
    next();
};

// app.use(betweenHome); 이렇게 쓰면 전역으로 사용가능하다.
app.get("/", betweenHome, handleHome); //route를 생성해준다.
app.get("/profile", handleProfile);
/*
GET : 브라우저가 웹 사이트를 불러올 때 쓰는 method
POST : 로그인을 한다면 POST를 이용. 즉, 브라우저가 웹사이트에 정보를 전달.
*/

app.listen(PORT, handleListening); //포트넘버
/*
매번 index.js를 node로 실행하고 싶지 않아서 package.json을 중앙 컨트롤 타워로 이용하고 싶다.
*/

/*
Babel은 최신 JS 문법을 기존의 문법으로 변환해준다. 
npm install @babel/node 로 설치해준다. 
npm install @babel/preset-env   preset을 env로 설치.
.babelrc파일을 만들어서 내용을 채워주고 package.json의 내용도 일부 수정해준다.
--> "start": "babel-node index.js"
이 상태에서 npm start하면 오류가 날 것이다.
npm install @babel/core를 해준다.
<Babel 예시>
import express from "express"; --> var express = require("express");
*/

/*
nodemon이라는 패키지를 이용하면 매번 서버를 껐다가 새로고침할 필요없이
자동으로 새로고침한 내용이 반영된다.
npm install nodemon -D
-D를 붙이면 dependencies에 추가 되는게 아니라 devDependencies에 추가 된다. 
프로젝특가 아닌 개발자에게 필요한 것이기 때문이다.
package.json도 수정해준다. --> "start": "nodemon --exec babel-node index.js"
*/