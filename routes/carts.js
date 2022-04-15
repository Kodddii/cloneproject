const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");

const controller = require("../controller/carts");

// 장바구니 추가
router.post("/:itemId", authMiddleware, controller.postCart);

// 장바구니 조회
router.get("/readCart", authMiddleware, controller.readCart);

// 장바구니 항목 수정
router.put("/editCart", authMiddleware, controller.editCart);

// 장바구니 수량 증가 +1
router.put("/inc/:itemId", authMiddleware, controller.putCartInc);

// 장바구니 수량 감소 -1
router.put("/dec/:itemId", authMiddleware, controller.putCartDec);

// 장바구니 삭제
router.delete("/deleteCart", authMiddleware, controller.deleteCart);

module.exports = router;
