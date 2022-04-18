const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../schemas/user");
const authMiddleWare = require("../middleWares/authMiddleWare");
const router = express.Router();

router.post("/login/signUp", async (req, res) => {
  const { userId, pwd, pwdCheck, userName, userAddress } = req.body;
  //비밀번호 영문/숫자/특수조합 (8-25자리) 정규식
  // const pwdValidation = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*+=-])(?=.*[0-9]).{8,25}$/;

  // if (!pwdValidation.test(pwd.value)) {
  //   res.status(400).send({
  //     errorMessage:
  //       "비밀번호는 영문+숫자+특수문자 조합으로 8-25자리 사용해야합니다.",
  //   });
  //   return;
  // }

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

router.post("/login/reqLogin", async (req, res) => {
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
});

// router.get("/login/isLogin", authMiddleWare, (req, res) => {
//   console.log(res.locals);
//   res.send("로그인 상태입니다.");
// });

// router.get("/checkLogin", authMiddleware, async (req, res) => {
//   const { user } = res.locals;
//   res.send({ user_name: user[0].user_name, _id: user[0]._id });
// });

router.get("/login/getUser", authMiddleWare, (req, res) => {
  const { user } = res.locals;
  res.send({ user });
});

router.get("/login/logOut", (req, res) => {
  localStorage.clear();
  window.location.href = "/";
  console.log("로그아웃 되었습니다.");
});

module.exports = router;
