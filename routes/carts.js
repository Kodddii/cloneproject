const express = require("express");
const router = express.Router();
const addCart = require("../schemas/cart");
// const authMiddleWare = require("../middleWares/authMiddleWare");


// const controller = require("../controller/carts");

//장바구니에 상품 담기
router.post("/addCart", async (req, res) => {
const itemId = req.params;
// const item = Item.findOne({ _Id: itemId });
 const { itemName, itemAmount, itemPrice, itemImg } = req.body;
 await addCart.create({
    itemId,
    itemName: itemName,
    itemAmount: itemAmount,
    itemPrice: itemPrice,
    itemImg: itemImg
  });
  res.json({ itemName, itemAmount, itemPrice, itemImg });
});

//장바구니 조회
router.get("/readCart", async (req, res) => {
  const carts = await Cart.find();
  const results = carts.map((cart) => {
    return {
      quantity: cart.itemAmount,
      item: itempage.find((item) => item.itemId === cart.itemId),
    };
  });
  res.json({ carts: results });
});


//장바구니 수정
router.put("/editCart", authMiddleware, controller.putCart);

//장바구니 수량 증가 +1
router.put("/inc/:postId", authMiddleware, controller.putCartInc);

//장바구니 수량 감소 -1
router.put("/dec/:postId", authMiddleware, controller.putCartDec);

// 장바구니 삭제
router.delete("/deleteCart", authMiddleware, controller.deleteCart);


// router.get("/api/carts", async (req, res) => {
//   res.json("carts!!")
 
// });

module.exports = router;