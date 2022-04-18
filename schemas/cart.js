const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema({
  itemId: {
    type: String,
    required: true,
    unique: true,
  },
  itemName: {
    type: String,
  },
  itemAmount: {
    type: Number,
    required: true,
  },
  itemPrice: {
    type: Number,
    required: true,
  },
  itemImg: {
    type: String,
  },
});

module.exports = mongoose.model("Cart", CartSchema);
