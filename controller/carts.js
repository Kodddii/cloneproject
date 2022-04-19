const Cart = require("../schemas/cart");
const User = require("../schemas/user");

//장바구니에 상품 담기
const addCart = async (req, res) => {
  //   const itemId = req.params;
  const { user } = res.locals;
  const userId = user[0].userId;
  console.log("여기여기");
  console.log({ userId });

  const {
    itemId,
    itemName,
    itemAmount,
    itemPrice,
    userAddress,
    itemCategory,
    itemImg,
    cartUserId,
  } = req.body;
  const userCartData = {
    itemId: itemId,
    itemName: itemName,
    itemAmount: itemAmount,
    itemPrice: itemPrice,
    userAddress: userAddress,
    itemCategory: itemCategory,
    itemImg: itemImg,
    cartUserId: cartUserId,
  };

  await User.updateOne({ userId }, { $push: { userCart: userCartData } });
  //   const userData = await User.find({ userId });
  //   console.log(userData)
  //   const cartData = userData[0].userCart;
  //   console.log(cartData)

  //   cartData.push(userCartData)
  //   console.log(cartData)
  //   await userData.save()
  //   console.log(userCartData)
  //   cart.push(userCart);
  await Cart.create({
    itemId: itemId,
    itemName: itemName,
    itemAmount: itemAmount,
    itemPrice: itemPrice,
    userAddress: userAddress,
    itemCategory: itemCategory,
    itemImg: itemImg,
    cartUserId: cartUserId,
  });
  res.send("장바구니에 상품이 추가되었습니다!");
};

//장바구니 조회
const readCart = async (req, res) => {
  const { user } = res.locals;
  const cart = user[0].userCart;
  res.json(cart);
};
const editCart = async (req, res) => {
  const { user } = res.locals;
  const { itemId, itemAmount } = req.body;
  console.log(user[0].userCart);
  user[0].userCart.find(itemId);
  console.log(user[0].userCart.find(itemId));
};

// 장바구니 삭제

const deleteCart = async (req, res) => {
  const { userId, itemId } = req.body;

  await User.updateOne({ userId }, { $pull: { userCart: { itemId } } });
  res.json({ result: "deleteSuccess" });
};

module.exports = { addCart, readCart, editCart, deleteCart };
