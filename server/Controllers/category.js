const Category = require("../Models/category");
exports.createcategory = async (req, res) => {
  try {
    const { namecategory } = req.body;
    console.log(req.body);
    const categoryUser = await new Category({ namecategory }).save();
    res.send(categoryUser);
  } catch (err) {
    console.log(err);
    res.status(500).send("createProduct Error");
  }
};

exports.getallcategory = async (req, res) => {
  try {
    const categoryAllUser = await Category.find({}).exec();
    res.send(categoryAllUser);
  } catch (err) {
    console.log(err);
    res.status(500).send("getallcategory Error");
  }
};

exports.removecategory = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteCategoryUser = await Category.findOneAndDelete({
      _id: id,
    }).exec();
    res.send(deleteCategoryUser);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.readcategory = async (req, res) => {
  try {
    const id = req.params.id;
    const readCategory = await Category.findOne({ _id: id }).exec();
    console.log(readCategory);
    res.send(readCategory);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
exports.updatecategory = async (req, res) => {
  try {
    const id = req.params.id;
    const { namecategory } = req.body;
    const editCategoryUser = await Category.findOneAndUpdate(
      { _id: id },
      { namecategory: namecategory },
      {new:true}
    ).exec()
    res.send(editCategoryUser)
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
