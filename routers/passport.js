module.exports = function (app) {
  const user = require("./userController");
  const jwtMiddleware = require("../../../config/jwtMiddleware");
  const passport = require("passport");
  const session = require("express-session");
  const KakaoStrategy = require("passport-kakao").Strategy;

  app.use(
    session({ secret: "SECRET_CODE", resave: true, saveUninitialized: false })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(
    "kakao-login",
    new KakaoStrategy(
      {
        clientID: "037c49fc2597d1697ff929e1a1e19493",
        clientSecret: "hPaI7YNNrR0FMAYGyS8OSsttCuYpmoAJ",
        callbackURL: "http://localhost:3000/auth/kakao/callback",
      },
      function (accessToken, refreshToken, profile, done) {
        result = {
          accessToken: accessToken,
          refreshToken: refreshToken,
          profile: profile,
        };
        console.log("KakaoStrategy", result);
        return done;
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user); // user객체가 deserializeUser로 전달됨.
  });
  passport.deserializeUser((user, done) => {
    done(null, user); // 여기의 user가 req.user가 됨
  });
};
