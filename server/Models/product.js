const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      text:true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: ObjectId,
      ref: "category",
    },
    price: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    quantity: Number,
    images: {
      type: Array,
    },
    wishlist:{
      type:ObjectId,
      ref:"users"
    }
  },
  { timestamps: true }
);

module.exports = Product = mongoose.model("product", ProductSchema);
