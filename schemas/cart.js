const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema({
  itemId: {
    type: String,
    required: true,
    unique: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  itemAmount: {
    type: String,
    required: true,
  },
  userAddress: {
    type: String,
    required: true,
  },
  itemPrice: {
    type: String,
    required: true,
  },
  itemCategory: {
    type: String,
    required: true,
  },
  itemImg: {
    type: String,
    required: true,
  },
  cartUserId: {
    type: String,
  },
});

module.exports = mongoose.model("Cart", CartSchema);
