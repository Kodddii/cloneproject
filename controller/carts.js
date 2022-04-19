const Cart = require("../schemas/cart");
const User = require("../schemas/user");
 
//장바구니에 상품 담기
  const addCart = async (req, res) => {
  const { user } = res.locals;
  const userId = user[0].userId;
  console.log("여기여기")
  console.log({userId})

  const { itemId, itemName, itemAmount, itemPrice, userAddress, itemCategory, itemImg, cartUserId } = req.body;
  const userCartData = {
    itemId: itemId,
    itemName: itemName,
    itemAmount: itemAmount,
    itemPrice: itemPrice,
    userAddress: userAddress, 
    itemCategory: itemCategory,
    itemImg: itemImg,
    cartUserId: cartUserId
  };

  await User.updateOne({ userId }, { $push : { userCart: userCartData  }
  });
  await Cart.create({
    itemId,
    itemName: itemName,
    itemAmount: itemAmount,
    itemPrice: itemPrice,
    userAddress: userAddress,
    itemCategory: itemCategory,
    itemImg: itemImg,
    cartUserId: cartUserId
  });
  res.send("장바구니에 상품이 추가되었습니다!");
};
 
//장바구니 조회
const readCart = async (req, res) => {
  
  const { user } = res.locals;
  const cart = user[0].userCart;
  res.json(cart);
};


//장바구니 수정
 const editCart = async (req, res) => {
   
  const { itemId, itemAmount } = req.body;
  
  try {
    await User.updateOne({ userId }, { $set: {} });
    const editCart = await Array.find({ itemAmount });
    res.status(200).send({ ok: "success", message: "수정 성공", editCart });
  } catch (error) {
    res.status(400).json({ ok: "false", message: "수정 실패" });
  }
};

//장바구니 삭제

  const deleteCart = async (req, res) => {
  const { userqwe } = req.body;
  const { user } = res.locals;
  // const userId = user[0].userId;
  const userCartData = user[0].userCartData[0]
  console.log(userId)
  console.log(user[0].userCart[0])

  await User.deleteOne({ userCart });
  if (existsCarts.length) {
     await User.updateOne({ userId }, { $pop : { userCart: userCartData  }
  });

  res.json({ success: true });
}
}

module.exports = {addCart, readCart, editCart, deleteCart};