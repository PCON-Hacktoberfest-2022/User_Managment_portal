const User = require("../models/users");

exports.addUser = async (req, res, next) => {
  const { first_name, last_name, email, avatar } = req.body;
  const newUser = new User({
    firstName: first_name,
    lastName: last_name,
    email,
    avatar,
  });
  await newUser.save();
  res.status(200).json({ success: 1, msg: "User saved successfully" });
};

exports.getUser = async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({ success: 1, users });
};
