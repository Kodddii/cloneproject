const express = require("express");
const router = express.Router();
// const addCart = require("../schemas/cart");
const authMiddleWare = require("../middleWares/authMiddleWare");


const { addCart, readCart} = require("../controller/carts");

//장바구니에 상품 담기
router.post("/addCart", authMiddleWare, addCart);

//장바구니 조회
router.get("/readCart", authMiddleWare, readCart);

// //장바구니 수정
// router.put("/editCart", authMiddleWare, readCart);

// // 장바구니 수량 증가 +1
// router.put("/inc/:itemId", authMiddleWare, controller.putCartInc);

// // 장바구니 수량 감소 -1
// router.put("/dec/:itemId", authMiddleWare, controller.putCartDec);

// // 장바구니 삭제
// router.delete("/deleteCart", authMiddleWare, controller.deleteCart);


// router.get("/api/carts", async (req, res) => {
//   res.json("carts!!")
 
// });

module.exports = router;