const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET_KEY, { expiresIn: "9999 years" });
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
  res.status(200).json({ message: "staying alive"})
}

module.exports = {
  loginUser,
  signupUser,
  stayAlive,
};
