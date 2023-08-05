const User = require("../../models/user");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
exports.registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists based on the email\
    console.log(email, password);

    let user = await User.findOne({ email });

    // If user exists
    if (user) {
      console.log(user);

      // Check the hasGiven parameter
      if (user.hasGiven) {
        // If hasGiven is true, throw an error indicating that the exam has already been given
        return res.status(403).json({ error: "Exam already given" });
      } else {
        // If hasGiven is false, proceed with password authentication
        if (user.password != password) {
          console.log("password checke");
          // If the password is incorrect, throw an error indicating invalid credentials
          return res.status(401).json({ error: "Invalid credentials" });
        }

        // Password is correct, set hasGiven to true, and save the user
        user.hasGiven = true;
        let token = signToken();

        await user.save();
        console.log("here");

        // Respond with success message
        return res
          .status(200)
          .json({ message: "User registration completed", token: token });
      }
    } else {
      // If the user does not exist, respond with an error indicating that the user is not registered
      return res.status(403).json({ error: "User not registered" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
