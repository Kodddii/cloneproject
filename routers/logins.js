const express = require("express");
const authMiddleWare = require("../middleWares/authMiddleWare");
const router = express.Router();
const {
  signUp,
  idCheck,
  reqLogin,
  getUser,
  logOut,
} = require("../controller/login");

router.post("/login/signUp", signUp);

router.post("/login/idCheck", idCheck);

router.post("/login/reqLogin", reqLogin);

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
  console.log(user);
  res.json(user);
});

router.get("/login/logOut", logOut);

module.exports = router;
