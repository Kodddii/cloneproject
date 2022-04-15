const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../schemas/uesr");
const router = express.Router();

router.post("/login/signUp", async (req, res) => {
  const { userId, pwd, pwdCheck, userName, userAddress } = req.body;

  if (pwd !== pwdCheck) {
    res.status(400).send({
      errorMessage: "비밀번호가 일치하지 않습니다.",
    });
    return;
  }

  const existUser = await User.find({
    $or: [{ userId }],
  });
  if (existUser.length) {
    res.status(400).send({
      errorMessage: "이미 등록된 아이디입니다.",
    });
    return;
  }

  const user = new User({ userId, pwd, userName, userAddress });
  await user.save();
  res.status(201).send({});
});

router.post("/login/idCheck", async (req, res) => {
  const { userId } = req.body;
  const existUser = await User.find({
    $or: [{ userId }],
  });
  if (existUser.length) {
    res.status(400).send({
      errorMessage: "이미 등록된 아이디입니다.",
    });
    return;
  }
  res.send("사용 가능한 아이디입니다.");
});

router.post("/login/reqLogin", async (req, res) => {});

router.get("/login/isLogin", (req, res) => {});

router.get("/login/getUser", (req, res) => {});

router.get("/login/logOut", (req, res) => {
  localStorage.clear();
  window.location.href = "/";
  console.log("로그아웃 되었습니다.");
});

module.exports = router;
