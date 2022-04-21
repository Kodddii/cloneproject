const res = require("express/lib/response");
const Cart = require("../schemas/cart");
const User = require("../schemas/user");

//장바구니에 상품 담기
const addCart = async (req, res) => {
  const {
    itemId,
    itemName,
    itemAmount,
    itemPrice,
    userAddress,
    itemCategory,
    itemImg,
    userId,
  } = req.body;
  const userCartData = {
    itemId: itemId,
    itemName: itemName,
    itemAmount: itemAmount,
    itemPrice: itemPrice,
    userAddress: userAddress,
    itemCategory: itemCategory,
    itemImg: itemImg,
  };
  try {
    await User.updateOne({ userId }, { $push: { userCart: userCartData } });
    await Cart.create({
      itemId: itemId,
      itemName: itemName,
      itemAmount: itemAmount,
      itemPrice: itemPrice,
      userAddress: userAddress,
      itemCategory: itemCategory,
      itemImg: itemImg,
      userId: userId,
    });
    res.status(201).send({ ok: "장바구니에 상품이 담겼습니다." });
  } catch (error) {
    res.status(400).send({ ok: "실패했습니다." });
  }
};

//장바구니 조회
const readCart = async (req, res) => {
  const { user } = res.locals;
  const cart = user[0].userCart;
  res.json(cart);
};

//장바구니 수정
const editCart = async (req, res) => {
  const { user } = res.locals;
  const userId = user[0].userId;
  const { itemId, itemAmount, itemPrice } = req.body;
  try {
    await User.updateOne(
      { userId: userId, "userCart.itemId": itemId },
      {
        $set: {
          "userCart.$.itemAmount": itemAmount,
          "userCart.$.itemPrice": itemPrice,
        },
      }
    );
    res.status(201).send("장바구니가 수정되었습니다.");
  } catch (error) {
    res.status(400).send("실패했습니다.");
  }
};

//장바구니 삭제
const deleteCart = async (req, res) => {
  const { userId, itemId } = req.body;
  try {
    for (x of itemId) {
      await User.updateOne({ userId }, { $pull: { userCart: { itemId: x } } });
    }
    res
      .status(201)
      .send({ ok: "true", message: "선택하신 상품이 삭제되었습니다." });
  } catch (error) {
    res.status(400).send({ ok: "false", message: "실패했습니다." });
  }
};

module.exports = { addCart, readCart, editCart, deleteCart };
