const jwt = require("jsonwebtoken");
const User = require("../schemas/user");

module.exports = (req, res, next) => {
  // console.log(req.headers)
  // console.log("미들웨어1")
  const { authorization } = req.headers;
  // console.log("미들웨어2")
  const [authType, authToken] = (authorization || "").split(" ");
  if (!authToken || authType !== "Bearer") {
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능입니다.",
    });
    return;
  }

  try {
    const { userId } = jwt.verify(authToken, "my-secret-key");
    User.find({ userId }).then((user) => {
      res.locals.user = user;
      next();
    });
  } catch (error) {
    return res.status(401).send({ errorMessage: "로그인 후 사용하세요." });
  }
};
