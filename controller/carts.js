const Cart = require("../schemas/cart");
const User = require("../schemas/user");
 
//장바구니에 상품 담기
const addCart = async (req, res) => {
//   const itemId = req.params;
  const { user } = res.locals;
  const userId = user[0].userId;
  console.log("여기여기")
  console.log({userId})

  // const item = Item.findOne({ _Id: itemId });
  const { itemId, itemName, itemAmount, itemPrice, userAddress, itemCategory, itemImg } = req.body;
  const userCartData = {
    itemId: itemId,
    itemName: itemName,
    itemAmount: itemAmount,
    itemPrice: itemPrice,
    userAddress: userAddress, 
    itemCategory: itemCategory,
    itemImg: itemImg,
  };

  await User.updateOne(
    { userId },
    { $push : { userCart: userCartData  }}
  );
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
    itemId,
    itemName: itemName,
    itemAmount: itemAmount,
    itemPrice: itemPrice,
    userAddress: userAddress,
    itemCategory: itemCategory,
    itemImg: itemImg,
  });
  res.send("장바구니에 상품이 추가되었습니다!");
};
 
 //장바구니 조회
const readCart = async (req, res) => {
  
  const { user } = res.locals;
  const cart = user[0].userCart;
  
//     return {
//       : cart.itemAmount,
//       item: itempage.find((item) => item.itemId === cart.itemId),
//     };
//   });
  res.json(cart);
};

module.exports = {addCart,readCart}  ;