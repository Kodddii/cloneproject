//express 모듈 불러오기
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connect = require("./schemas");
const bodyParser = require("body-parser")
const app = express();
const port = 3000;

//라우터
const loginRouter = require("./routers/logins");
const itemRouter = require("./routers/itempage")
connect();

//접속로그 확인
const requestMiddleWare = (req, res, next) => {
  console.log("request Url : ", req.originalUrl, "-", new Date());
  next();
};

//미들웨어
app.use(cors());
app.use(express.json());
app.use(requestMiddleWare);
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json())

//라우터 연결
app.use("/", [loginRouter,itemRouter]);

app.listen(port, () => {
  console.log(port, "번으로 서버가 켜졌어요!");
});
