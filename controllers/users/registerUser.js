const User = require("../../models/user");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
exports.registerUser = async (req, res) => {
  const { name } = req.body;
  try {
    const student = await User.findOne({ name });

    if (!student) {
      return res.status(203).json({ message: "No such student" });
    }

    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 60 * 1000
      ),
      httpOnly: true,
    };

    if (process.env.NODE_ENV === "production") {
      cookieOptions.secure = true;
    }

    // Generate and send a JWT token for authentication
    const key = signToken(student._id);

    // student.password = null; // Not sure why this line is commented out

    return res.status(200).json({ message: "Login successful", token: key });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Invalid Credentials" });
  }
};
