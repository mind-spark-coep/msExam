const User = require("../../models/user");
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, { name: 1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
