const Cart = require("../schemas/cart");
const User = require("../schemas/user");

//장바구니에 상품 담기
const addCart = async (req, res) => {
  //   const itemId = req.params;
  const { user } = res.locals;
  // const userId = user[0].userId;

  console.log({ userId });

  // const item = Item.findOne({ _Id: itemId });
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
    userId: userId,
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
const editCart = async (req, res) => {
  const { user } = res.locals;
  const userId = user[0].userId;
  console.log(user);
  const { itemId, itemAmount, itemPrice } = req.body;
  // console.log(user[0].userCart)
  // user[0].userCart.itemId{itemId:itemId})
  // user[0].userCart.find(a =>a.itemId=itemId).itemAmount=itemAmount
  // user.save()
  // console.log(user[0].userCart.find(a=>a.itemId=itemId))
  // const data = await User.findOne({userCart:{$elemMatch:{itemId:itemId}}}).userCart
  // console.log(data)
  // console.log(data.userCart.find(a=>a.itemId = itemId))
  // // data.userCart.find(a=>a.itemId = itemId).itemAmount=itemAmount
  // data.userCart.map(a =>{
  //   if(a.itemId = itemId){
  //     a.itemAmount=itemAmount
  //   }
  // })
  // console.log(data.userCart.find(a=>a.itemId = itemId))
  // await data.save();
  await User.updateOne(
    { userId: userId, "userCart.itemId": itemId },
    {
      $set: {
        "userCart.$.itemAmount": itemAmount,
        "userCart.$.itemPrice": itemPrice,
      },
    }
  );
  res.status(201).send();
};

const deleteCart = async (req, res) => {
  const { userId, itemId } = req.body;

  await User.updateOne({ userId }, { $pull: { userCart: { itemId } } });
  console.log(itemId);
  res.json({ result: "deleteSuccess" });
};

module.exports = { addCart, readCart, editCart, deleteCart };
