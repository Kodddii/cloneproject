const mongoose = require("mongoose");
const itemSchema = new mongoose.Schema({
  itemId: "string",
  itemName: "string",
  itemPrice: "string",
  itemCategory: "string",
  itemInfo: "string",
  cartCount: "string",
});

module.exports = mongoose.model("Item", itemSchema);
