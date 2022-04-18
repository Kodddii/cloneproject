const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../../schemas/user");

const signUp = async (req, res) => {
  const { userId, pwd, pwdCheck, userName, userAddress } = req.body;
  //비밀번호 최소 문자 1, 숫자 1 포함 (8자리 이상) 정규식
  const pwdValidation = /^(?=.*[A-Za-z])(?=.*\d)[\w]{8,}$/;

  if (!pwdValidation.test(pwd)) {
    res.status(400).send({
      errorMessage: "비밀번호는 영문+숫자 조합으로 8자리 이상 사용해야합니다.",
    });
    return;
  }

  if (pwd !== pwdCheck) {
    res.status(400).send({
      errorMessage: "비밀번호가 일치하지 않습니다.",
    });
    return;
  }

  //아이디 중복확인
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
};

const idCheck = async (req, res) => {
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
};

const reqLogin = async (req, res) => {
  const { userId, pwd } = req.body;
  const user = await User.findOne({ userId, pwd }).exec();
  console.log(user);
  if (!user) {
    res.status(401).send({
      errorMessage: "아이디 혹은 비밀번호가 잘못되었습니다.",
    });
    return;
  }
  const userName = user.userName;
  const userAddress = user.userAddress;
  const token = jwt.sign({ userId: user.userId }, "my-secret-key");

  res.send({ token, userId, userName, userAddress });
};

const getUser = (req, res) => {
  const { user } = res.locals;
  res.send({ user });
};

const logOut = (req, res) => {
  localStorage.clear();
  window.location.href = "/";
  console.log("로그아웃 되었습니다.");
};

module.exports = { signUp, idCheck, reqLogin, getUser, logOut };
