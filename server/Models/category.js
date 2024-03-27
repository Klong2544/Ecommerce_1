const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    namecategory: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = Category = mongoose.model("category", CategorySchema);
