const express = require("express");
const router = express.Router();
const addCart = require("../schemas/cart");
// const authMiddleWare = require("../middleWares/authMiddleWare");


const controller = require("../controller/carts");

//장바구니에 상품 담기
router.post("/addCart", authMiddleware, controller.addCart);

//장바구니 조회
router.get("/readCart", authMiddleware, controller.getCart);

//장바구니 수정
router.put("/editCart", authMiddleware, controller.putCart);

// 장바구니 수량 증가 +1
router.put("/inc/:itemId", authMiddleware, controller.putCartInc);

// 장바구니 수량 감소 -1
router.put("/dec/:itemId", authMiddleware, controller.putCartDec);

// 장바구니 삭제
router.delete("/deleteCart", authMiddleware, controller.deleteCart);


// router.get("/api/carts", async (req, res) => {
//   res.json("carts!!")
 
// });

module.exports = router;