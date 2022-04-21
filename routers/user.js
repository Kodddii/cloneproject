const express = require("express");
const router = express.Router();
const passport = require("passport");
// const userController = require("../controller/user");

router.get("/kakao", passport.authenticate("kakao-login"));
router.get(
  "/kakao/callback",
  passport.authenticate("kakao-login", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/");
  }
);

module.exports = router;
