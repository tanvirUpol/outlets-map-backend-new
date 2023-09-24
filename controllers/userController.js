const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET_KEY, { expiresIn: "9999 years" });
};


//get user
const getUser = async (req, res) => {
  // comes from middleware
  const user  = req.user
  console.log(req.user);
  if(user){
    res.status(200).json(user);
  }else{
    res.status(400).json({ error: "user not found" });
  }
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// signup user
const signupUser = async (req, res) => {
  // email, password,outlet_division,role
  const { email, password , zonal , is_zonal, outlets } = req.body;

  // console.log(req.body);

  try {
    const user = await User.signup(email, password, zonal , is_zonal, outlets);

    // create a token
    const token = createToken(user._id);

    // const role = user.role.toLowerCase()

    res.status(200).json({ email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


const stayAlive = async (req, res ) => {
  res.status(200).json({ message: "staying alive "})
}


// change password
const changePassword = async (req, res) => {
  const { id } = req.params; // Assuming you have the userId as a parameter
  const { currentPassword, newPassword } = req.body;

  console.log(req.user);

  if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
    console.log("not a valid id");
    return res.status(404).json({ error: "No Such Outlet" });
  }

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the provided current password matches the stored password
    const isPasswordValid = await user.comparePassword(currentPassword);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid current password" });
    }

    // Update the user's password with the new one
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getUser,
  loginUser,
  signupUser,
  stayAlive,
  changePassword
};
