//express 모듈 불러오기
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const socketIo = require("socket.io");
const connect = require("./schemas");

const bodyParser = require("body-parser");
const app = express();
const port = 3000;

//라우터
const loginRouter = require("./routers/logins");
const itemRouter = require("./routers/itempage");
const cartsRouter = require("./routers/carts");
connect();

//접속로그 확인
const requestMiddleWare = (req, res, next) => {
  // console.log(req.url,req.headers,req.method)
  console.log("request Url : ", req.originalUrl, "-", new Date());
  next();
};

// const io = socketIo(3000, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log("연결이 되었습니다.");
// });

//미들웨어
app.use(cors());
app.use(express.json());
app.use(requestMiddleWare);
app.use(express.urlencoded({ extended: false }));

//라우터 연결
app.use("/", [loginRouter, itemRouter, cartsRouter]);

app.listen(port, () => {
  console.log(port, "번으로 서버가 켜졌어요!");
});
