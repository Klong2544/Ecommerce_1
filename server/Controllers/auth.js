const Users = require("../Models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.regisrer = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    console.log(req.body);
    var user = await Users.findOne({ email });
    if (user) {
      return res.status(400).send("User Already exists");
    }
    const salt = await bcrypt.genSalt(10);
    user = new Users({
      email,
      username,
      password,
    });
    //encrypt
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    res.send("Register success");
  } catch (err) {
    console.log(err);
    res.status(500).send("Register Error");
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    if (!(email && password)) {
      res.status(400).send("Password is Incorrect");
    }
    const user = await Users.findOne({email});
    console.log(user);
    if (user && user.enabled) {
      const isMatch = await bcrypt.compare(password, user.password);
      console.log(isMatch);
      if (!isMatch) {
        return res.status(400).send("Password Invalid!!");
      }
      const payload = {
        user: {
          username: user.username,
          email: user.email,
          role: user.role,
        },
      };
      jwt.sign(payload, "jwtSecret", { expiresIn: "2h" }, (err, token) => {
        if (err) throw err;
        res.status(200).send({ token, payload });
      });
    } else {
      return res.status(404).send("user not found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Login Error");
  }
};
exports.currenUser = async (req, res) => {
  try {
    const email = req.user.email;
    const user = await Users.findOne({ email }).select("-password").exec();
    res.send(user)
  } catch (err) {
    console.log(err);
    res.status(500).send("CurrentUser Error");
  }
};
