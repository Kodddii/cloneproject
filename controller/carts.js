const Cart = require("../models/carts");
const Posts = require("../models/pages");

const Cart = async (req, res) => {
  const userEmail = res.locals.user.email;
  const { quantity } = req.body;
  const { postId } = req.params;
  const thePost = await Posts.findOne({ postId });
  const exitCart = await Cart.findOne({ userEmail, postId });

  if (exitCart) {
    await Cart.updateOne(
      { userEmail, postId },
      { $inc: { quantity: +quantity } }
    );
    return res.status(200).json({ ok: "기존에 있는거여서 추가 했슴당" });
  }

  try {
    await Cart.create({
      userEmail,
      postId,
      title: thePost.title,
      price: thePost.price,
      img: thePost.img,
      quantity,
    });
    const data = {
      userEmail,
      postId,
      title: thePost.title,
      price: thePost.price,
      img: thePost.img,
      quantity,
    };
    res.status(200).json({ ok: "true", data });
  } catch (error) {
    res.status(400).json({ ok: "false" });
  }
};

const getCart = async (req, res) => {
  const userEmail = res.locals.user.email;
  try {
    const getCarts = await Cart.find({ userEmail });
    return res.status(200).json({
      ok: "true",
      carts: getCarts,
    });
  } catch (error) {
    res.status(400).json({ ok: "false" });
  }
};

const putCart = async (req, res) => {
  const userEmail = res.locals.user.email;
  const { postId } = req.params;
  const { quantity } = req.body;

  // if(quantity == 0 ){
  //   await Cart.deleteOne({
  //     userId,
  //     postId,
  //   });
  //   res.status(200).json({
  //     ok: 'true',
  //     msg: '삭제되었습니다.'
  //   });
  // }

  try {
    await Cart.updateOne({ userEmail, postId }, { $set: { quantity } });
    const putCarts = await Cart.find({ userEmail, postId });
    res.status(200).send({ ok: "true", message: "수정 성공", putCarts });
  } catch (error) {
    res.status(400).json({ ok: "false", message: "수정 실패" });
  }
};

// 장바구니 수량 증가 +1
const putCartInc = async (req, res) => {
  try {
    const { postId } = req.params;
    const loginUserEmail = res.locals.user.email; // 로그인 정보에 담아놓은 email
    const user = await Cart.findOne({ postId, userEmail: loginUserEmail }); // 디비에 있는 email

    console.log(user.userEmail);
    console.log(loginUserEmail);

    if (user.userEmail === loginUserEmail) {
      // 로그인 된 유저일 경우만
      await Cart.updateOne(
        { postId, userEmail: loginUserEmail },
        { $inc: { quantity: +1 } }
      );
      res.json({ ok: true, message: "장바구니 수량 증가 +1 완료" });
    } else {
      res.json({ ok: false, message: "장바구니 수량 증가 +1 실패" });
    }
  } catch (error) {
    res.status(400).json({ ok: false, message: "장바구니 수량 증가 +1 실패" });
    console.error(`장바구니 수량 증가에서 ${error}에러가 발생하였습니다.`);
  }
};

// 장바구니 수량 감소 -1
const putCartDec = async (req, res) => {
  try {
    const { postId } = req.params;
    const loginUserEmail = res.locals.user.email; // 로그인 정보에 담아놓은 email
    const user = await Cart.findOne({ postId, userEmail: loginUserEmail }); // 디비에 있는 email
    const quantity = user.quantity; // 장바구니 수량

    // 1 이하는 감소 불가
    if (quantity === 1) {
      return res.json({
        ok: false,
        message: "삭제를 원하시면 삭제 버튼을 눌러주세요.",
      });
    }

    if (user.userEmail === loginUserEmail) {
      // 로그인 된 유저일 경우만
      await Cart.updateOne(
        { postId, userEmail: loginUserEmail },
        { $inc: { quantity: -1 } }
      );
      res.json({ ok: true, message: "장바구니 수량 감소 -1 성공" });
    } else {
      res.json({ ok: false, message: "장바구니 수량 감소 -1 실패" });
    }
  } catch (error) {
    res.status(400).json({ ok: false, message: "장바구니 수량 감소 -1 실패" });
  }
};

const deleteCart = async (req, res) => {
  const userEmail = res.locals.user.email;
  const { postId } = req.params;
  try {
    const deleteCarts = await Cart.find({ userEmail, postId });
    if (deleteCarts.length) {
      await Cart.deleteOne({ userEmail, postId });
    }
    res.status(200).json({ ok: "true", message: "삭제 성공" });
  } catch (error) {
    res.status(400).json({ ok: "false", message: "삭제 실패" });
  }
};

module.exports = {
  postCart,
  getCart,
  putCart,
  putCartInc,
  putCartDec,
  deleteCart,
};
