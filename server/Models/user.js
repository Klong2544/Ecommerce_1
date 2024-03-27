const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const UserShhema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    addressBy: [
      {
        address: String,
        name: String,
        phonenumber: Number,
      },
    ],

    wishlist: [
      {
        type: ObjectId,
        ref: "product",
      },
    ],
  },
  { timestamps: true }
);

module.exports = Users = mongoose.model("users", UserShhema);
