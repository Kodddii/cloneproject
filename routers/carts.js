const express = require("express");
const router = express.Router();

router.get("/carts", (req, res) => {
  res.send("carts!!");
});

module.exports = router;
