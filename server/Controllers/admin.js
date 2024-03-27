const Order = require("../Models/order");
const Users = require("../Models/user");
exports.getAllOrderAdmin = async (req, res) => {
  try {
    let getAllOrderUser = await Order.find()
      .populate("products.product")
      .populate(
        "orderBy",
        "username addressBy.address addressBy.name addressBy.phonenumber"
      )
      .exec();
    res.send(getAllOrderUser);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
exports.updateorderstatus = async (req, res) => {
  try {
    const { orderstatus, id } = req.body;
    console.log(req.body);
    const ordersUpdate = await Order.findByIdAndUpdate(
      id,
      { orderstatus },
      { new: true }
    ).exec();
    res.json(ordersUpdate);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.removeOrderAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const removeOrder = await Order.findOneAndDelete({ _id: id }).exec();
    res.json(removeOrder);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
exports.readOrderAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await Order.findOne({ _id: id })
      .populate("orderstatus")
      .exec();
    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
