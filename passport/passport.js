const passport = require("passport")
const kakaoStrategy = require("passport-kakao").Strategy

passport.use('kakao-login', new kakaoStrategy({
    clientID:RESTAPIKEY
}))