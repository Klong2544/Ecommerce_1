const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const OrderSchema = mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: "product",
        },
        count: Number,
        price: Number,
      },
    ],
    cartTotal: {
      type: Number,
    },
    orderstatus: {
      type: String,
      default: "Not Process",
    },
    orderBy: {
      type: ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

module.exports = Order = mongoose.model("order", OrderSchema);
