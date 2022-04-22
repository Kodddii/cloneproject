exports.loginKakao = async function (req, res) {
  const { accessToken } = req.body;
  try {
    let kakao_profile;
    try {
      kakao_profile = await axios.get("https://kapi.kakao.com/v2/user/me", {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      logger.error(`Can't get kakao profile\n: ${JSON.stringify(err)}`);
      return res.send(errResponse(baseResponse.USER_ACCESS_TOKEN_WRONG));
    }

    const name = kakao_profile.data.kakao_account.profile.nickname;
    const email = kakao_profile.data.kakao_account.email;
    const emailRows = await userProvider.emailCheck(email);
    // 이메일이 존재하는 경우 = 회원가입 되어 있는 경우 -> 로그인 처리
    if (emailRows.length > 0) {
      const userInfoRows = await userProvider.accountCheck(email);
      const token = await jwt.sign(
        {
          userId: userInfoRows[0].id,
        },
        secret_config.jwtsecret,
        {
          expiresIn: "365d",
          subject: "userId",
        }
      );

      const result = { userId: userInfoRows[0].id, jwt: token };
      return res.send(response(baseResponse.SUCCESS, result));
      // 이메일이 존재하지 않는 경우 -> 회원가입 처리
    } else {
      const result = {
        name: name,
        email: email,
        loginStatus: "KAKAO",
      };

      const signUpResponse = await userService.createSocialUser(
        name,
        email,
        result.loginStatus
      );
      return res.send(response(baseResponse.SUCCESS, result));
    }
  } catch (err) {
    logger.error(`App - logInKakao Query error\n: ${JSON.stringify(err)}`);
    return res.send(errResponse(baseResponse.USER_INFO_EMPTY));
  }
};
