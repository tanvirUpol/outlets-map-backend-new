const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "9999 years",
  });
};

// Set up Nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  // secure: false,
  auth: {
    user: "tanvirrahmanupol@gmail.com",
    pass: "qI5gr8JDZ37TambK",
  },
});

// Generate a random verification code
function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Store temporary verification codes in memory
const verificationCodes = new Map();

//get user
const getUser = async (req, res) => {
  // comes from middleware
  const user = req.user;
  console.log(req.user);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(400).json({ error: "user not found" });
  }
};

// login user
// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   console.log(email,password);

//   try {
//     const user = await User.login(email, password);
//     // create a token
//     const token = createToken(user._id);

//     res.status(200).json({ email, token });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

//----------------------------

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // console.log(email, password);

  try {
    const user = await User.login(email, password);
    // create a token
    // const token = createToken(user._id);

    

    // Generate a new verification code
    const verificationCode = generateVerificationCode();

    // Send the verification code via email
    const mailOptions = {
      from: "tanvirrahmanupol@gmail.com",
      to: email.toLowerCase(),
      subject: "Verification Code",
      text: `Your verification code is: ${verificationCode}`,
    };

    // res.status(200).json({ email, token });
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .json({ message: "Error sending verification code" });
      }

      // Store the verification code in memory temporarily
      verificationCodes.set(email.toLowerCase(), verificationCode);

      res
        .status(200)
        .json({
          message: `Verification code sent successfully to:${email} `,
          email,
        });
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//--------------------------------------

const verifyUser = async (req, res) => {
  const { email, verificationCode } = req.body;

  const user = await User.findOne({ email });

  // create a token
  const token = createToken(user._id);

  console.log(email, verificationCode);

  // Retrieve the stored verification code for the given email
  const storedVerificationCode = verificationCodes.get(email.toLowerCase());
  // const storedVerificationCode = 413123;

  // console.log(storedVerificationCode);

  if (!storedVerificationCode || storedVerificationCode != verificationCode) {
    return res.status(401).json({ message: "Invalid verification code" });
  }

  // At this point, the user is successfully verified
  res.status(200).json({ message: "User verified successfully", email, token });
};

// signup user
const signupUser = async (req, res) => {
  // email, password,outlet_division,role
  const { email, password, zonal, is_zonal, outlets } = req.body;

  // console.log(req.body);

  try {
    const user = await User.signup(email, password, zonal, is_zonal, outlets);
    console.log(user);
    // create a token
    const token = createToken(user._id);

    // const role = user.role.toLowerCase()

    res.status(200).json({ email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const stayAlive = async (req, res) => {
  res.status(200).json({ message: "staying alive " });
};

// change password
const changePassword = async (req, res) => {
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
    // const isPasswordValid = await user.comparePassword(currentPassword);

    // if (!isPasswordValid) {
    //   return res.status(400).json({ error: "Invalid current password" });
    // }

    // Update the user's password with the new one
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// // with Email
// const changePassword = async (req, res) => {
//   const { newPassword , email } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(newPassword, salt);

//     user.password = hashedPassword;
//     await user.save();

//     res.status(200).json({ message: "Password updated successfully" });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

module.exports = {
  getUser,
  loginUser,
  signupUser,
  stayAlive,
  changePassword,
  verifyUser,
};
