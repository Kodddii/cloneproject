const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  pwd: {
    type: String,
    required: true,
  },
  pwdCheck: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userAddress: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
