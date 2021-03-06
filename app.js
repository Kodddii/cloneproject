//express 모듈 불러오기
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const socketIo = require("socket.io");
const connect = require("./schemas");
const nunjucks = require("nunjucks");
const axios = require("axios");
const qs = require("qs");
const session = require("express-session");
const bodyParser = require("body-parser");
const passportConfig = require("./passport");
const app = express();
const port = 3000;

//라우터
const loginRouter = require("./routers/logins");
const itemRouter = require("./routers/itempage");
const cartsRouter = require("./routers/carts");
const urlencoded = require("body-parser/lib/types/urlencoded");
connect();
passportConfig();

//접속로그 확인
const requestMiddleWare = (req, res, next) => {
  // console.log(req.url,req.headers,req.method)
  console.log("request Url : ", req.originalUrl, "-", new Date());
  next();
};

//미들웨어
app.use(cors());
app.use(express.json());
app.use(requestMiddleWare);
app.use(express.urlencoded({ extended: false }));

//라우터
const loginRouter = require("./routers/logins");
const itemRouter = require("./routers/itempage");
const cartsRouter = require("./routers/carts");
connect();

app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
});

app.use(
  session({
    secret: "aaa",
    resave: true,
    secure: false,
    saveUninitialized: false,
  })
);

const kakao = {
  clientID: process.env.CLIENTID,
  clientSecret: process.env.CLIENTSECRET,
  redirectUri: process.env.REDIRECTURI,
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

app.get("/auth/kakao", (req, res) => {
  const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakao.clientID}&redirect_uri=${kakao.redirectUri}&response_type=code&scope=profile_nickname`;
  console.log("ID : ", kakao.clientID);
  console.log(kakaoAuthURL);
  res.redirect(kakaoAuthURL);
});

app.get("/auth/kakao/callback", async (req, res) => {
  console.log(req.query);
  let token;
  try {
    token = await axios(
      {
        method: "POST",
        url: "https://kauth.kakao.com/oauth/token",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },

        data: qs.stringify({
          //객체를 string 으로 변환
          grant_type: "authorization_code", //특정 스트링
          client_id: kakao.clientID,
          client_secret: kakao.clientSecret,
          redirectUri: kakao.redirectUri,
          code: req.query.code,
        }),
      },
      console.log("token1: ", token)
    );
  } catch (err) {
    // console.log("err: ", err);
    res.json(err.data);
  }

  // let token = ;
  let user;
  try {
    console.log("token2: ", token); //access정보를 가지고 또 요청해야 정보를 가져올 수 있음.
    user = await axios({
      method: "get",
      url: "https://kapi.kakao.com/v2/user/me",
      headers: {
        Authorization: `Bearer ${token.data.access_token}`,
      },
    });
    // console.log("user.data: ", user.data);
  } catch (e) {
    // console.error(e);
    res.json(e.data);
  }
  console.log("user:", user);

  req.session.kakao = user.data;
  // console.log("kakao session : ", req.session.kakao);
  // console.log("kakao session : ", req.session.kakao.properties);
  let { nickname } = req.session.kakao.properties;
  console.log(nickname);
  res.send("success");
});

// app.get("/auth/info", (req, res) => {
//   let { nickname } = req.session.kakao.properties;
//   console.log("req: ", req.session);
//   res.render("info", {
//     nickname,
//   });
// });

app.get(kakao.redirectUri);

//라우터 연결
app.use("/", [loginRouter, itemRouter, cartsRouter]);

app.listen(port, () => {
  console.log(port, "번으로 서버가 켜졌어요!");
});






