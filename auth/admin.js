const jwt = require("jsonwebtoken");

exports.admin = async (req, res, next) => {
  if (req.body.adminPassword == 8421642169) next();
  else {
    return res.status(401).json({ message: "only admin can access this" });
  }
};
