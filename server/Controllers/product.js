const Product = require("../Models/product");
exports.createProduct = async (req, res) => {
  try {
    const createProductUser = await new Product(req.body).save();
    res.send(createProductUser);
  } catch (err) {
    console.log(err);
    res.status(500).send("createProduct Error");
  }
};

exports.getAllProduct = async (req, res) => {
  try {
    const getProductUser = await Product.find({}).populate("wishlist").exec();
    res.send(getProductUser);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.removeProduct = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const deleteProductUser = await Product.findOneAndDelete({
      _id: id,
    }).exec();
    res.send(deleteProductUser);
  } catch (err) {
    console.log(err);
    res.status(500).send("removeproduct Error");
  }
};
exports.readProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const readProductUser = await Product.findOne({ _id: id })
      .populate("category")
      .exec();
    res.send(readProductUser);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
exports.updaetProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const updateProductUser = await Product.findOneAndUpdate(
      { _id: id },
      req.body
    ).exec();
    res.send(updateProductUser);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
//category
const handleCategory = async (req, res, category) => {
  let product = await Product.find({
    category,
  }).populate("category", "_id namecategry");
  res.send(product);
};
//price
const handlePrice = async (req, res, price) => {
  const number = parseInt(price); //เปลี่ยนobject เป็น number
  if (typeof number !== "number") {
    return res.status(400).json({ error: "Price must be a number" });
  }
  let productprice = await Product.find({
    price: { $lte: number },
  }).populate("category", "_id namecategory");
  res.send(productprice);
};
//searchProduct
// const handleSearchProduct = async (req, res, query) => {
//   console.log(query);
//   let productsearch = await Product.find({
//     $text: { $search: query },
//   }).populate("category", "_id namecategory");
//   res.send(productsearch);
// };

exports.serchProduct = async (req, res) => {
  try {
    const { category, price } = req.body;
    console.log(price);
    if (category) {
      await handleCategory(req, res, category);
    }
    if (price !== undefined) {
      await handlePrice(req, res, price);
    }
    // if (query) {
    //   await handleSearchProduct(req, res, query);
    // }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.listByProduct = async (req, res) => {
  try {
    const { sort, order, limit } = req.body;
    const listProduct = await Product.find()
      .limit(limit)
      .populate("category")
      .sort([[sort,order]]);
      res.json(listProduct)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
