const express = require("express");
const router = express.Router();
const authMiddleWare = require("../middleWares/authMiddleWare");
const User = require("../schemas/user");

const {
  addCart,
  readCart,
  editCart,
  deleteCart,
} = require("../controller/carts.js");

//장바구니에 상품 담기
router.post("/addCart", authMiddleWare, addCart);

//장바구니 조회
router.get("/readCart", authMiddleWare, readCart);

//장바구니 수정
router.put("/editCart", authMiddleWare, editCart);

// 장바구니 삭제
router.delete("/deleteCart", authMiddleWare, deleteCart);

module.exports = router;
