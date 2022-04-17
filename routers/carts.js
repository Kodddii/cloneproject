const express = require("express");
const router = express.Router();

router.get("/api/carts", async (req, res) => {
  res.json("carts!!")
 
});

module.exports = router;