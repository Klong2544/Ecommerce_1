const Users = require("../Models/user");
const Cart = require("../Models/cart");
const Order = require("../Models/order");
const bcrypt = require("bcrypt");
const Product = require("../Models/product");
exports.getAllUser = async (req, res) => {
  try {
    const alluser = await Users.find({}).exec();
    res.send(alluser);
  } catch (err) {
    console.log(err);
    res.status(500).send("GetAllUser Error");
  }
};

exports.changRole = async (req, res) => {
  try {
    const { role, id } = req.body;
    const roleUser = await Users.findOneAndUpdate(
      { _id: id },
      { role: role }
    ).exec();
    res.send(roleUser);
  } catch (err) {
    console.log(err);
    res.status(500).send("Changrole Error");
  }
};

exports.changStatus = async (req, res) => {
  try {
    const { enabled, id } = req.body;
    const statusUser = await Users.findOneAndUpdate(
      { _id: id },
      { enabled: enabled }
    ).exec();
    res.send(statusUser);
  } catch (err) {
    console.log(err);
    res.status(500).send("Changrole Error");
  }
};

exports.removeuser = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteUser = await Users.findOneAndDelete({ _id: id }).exec();
    res.send(deleteUser);
  } catch (err) {
    console.log(err);
    res.status(500).send("removeuser error");
  }
};
exports.repassworduser = async (req, res) => {
  try {
    const { id, password } = req.body.values;
    const salt = await bcrypt.genSalt(10);
    var enPassword = await bcrypt.hash(password, salt);
    const updateUser = await Users.findByIdAndUpdate(
      { _id: id },
      { password: enPassword }
    ).exec();
    res.send(updateUser);
  } catch (err) {
    console.log(err);
    res.status(500).send("removeuser error");
  }
};

exports.usercart = async (req, res) => {
  try {
    const { cart } = req.body;
    let user = await Users.findOne({ username: req.user.username }).exec();
    let products = [];
    let cartOld = await Cart.findOne({ orderBy: user._id }).exec();
    if (cartOld) {
      await Cart.deleteOne({
        _id: cartOld._id,
      });
    }
    for (let i = 0; i < cart.length; i++) {
      let object = {};
      (object.product = cart[i]._id),
        (object.count = cart[i].count),
        (object.price = cart[i].price),
        products.push(object);
    }
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].count;
    }
    let newCart = await new Cart({
      products,
      cartTotal,
      orderBy: user._id,
    }).save();
    res.send(newCart);
  } catch (err) {
    console.log(err);
    res.status(500).send("userCart Error");
  }
};

exports.getUserCart = async (req, res) => {
  try {
    const getAllUserCart = await Users.findOne({
      username: req.user.username,
    }).exec();
    let cart = await Cart.findOne({ orderBy: getAllUserCart._id })
      .populate("products.product", "_id title price")
      .exec();
    const { products, cartTotal } = cart;
    console.log("cart" + cart);
    res.json({ products, cartTotal });
  } catch (err) {
    console.log(err);
    res.status(500).send("getusercart Error");
  }
};

exports.saveAddress = async (req, res) => {
  try {
    const userAddress = await Users.findOneAndUpdate(
      { username: req.user.username },
      {
        addressBy: [
          {
            address: req.body.address,
            name: req.body.name,
            phonenumber: req.body.phonenumber,
          },
        ],
      }
    ).exec();
    console.log(userAddress);
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

exports.saveOrder = async (req, res) => {
  try {
    const user = await Users.findOne({ username: req.user.username }).exec();
    let userCart = await Cart.findOne({ orderBy: user._id }).exec();
    let order = await new Order({
      products: userCart.products,
      orderBy: user._id,
      cartTotal: userCart.cartTotal,
    }).save();
    let bulkOption = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });
    let updated = await Product.bulkWrite(bulkOption, {});
    res.json({ massage: updated });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};
exports.clearOrder = async (req, res) => {
  try {
    const user = await Users.findOne({ username: req.user.username }).exec();
    const empty = await Cart.findOneAndDelete({ orderBy: user._id }).exec();
    res.json({ empty });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
};

exports.getorderuser = async (req, res) => {
  try {
    const user = await Users.findOne({ username: req.user.username }).exec();
    const orderuser = await Order.find({ orderBy: user._id })
      .populate("products.product")
      .exec();
    res.json(orderuser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
exports.addtowishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await Users.findOneAndUpdate(
      { username: req.user.username },
      { $addToSet: { wishlist: productId } }
    )
      .select("-password")
      .exec();
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
exports.deletewishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await Users.findOneAndUpdate(
      { username: req.user.username },
      { $pull: { wishlist: productId } },
      { new: true }
    ).exec();
    console.log(product);
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
