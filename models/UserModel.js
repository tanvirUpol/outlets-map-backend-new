const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    zonal: {
      type: String,
      required: true,
    },
    is_zonal: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

// static create user
UserSchema.statics.signup = async function (email, password,zonal , is_zonal) {
  if(!email || !password){
    throw new Error("Please enter a valid email and password");
  }
  const exists = await this.findOne({ email });

  if (exists) {
    throw new Error("This user already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  if (!exists) {
    const user = await this.create({
      email,
      password: hashedPassword,
      zonal , 
      is_zonal
    });

    return user;
  }
};

// static login method

UserSchema.statics.login = async function (email, password) {
  if(!email || !password){
    throw new Error("Please enter a valid email and password");
  }
  if (email && password) {
    const user = await this.findOne({ email });

    if (!user) {
      throw new Error("User does not exist");
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error("Incorrect password");
    }

    return user;
  }

  if (!email && !password) {
    throw new Error("Email and password are required");
  }

  if (email || !password) {
    throw new Error("Password is required");
  }

  if (!email || password) {
    throw new Error("Email is required");
  }
};

module.exports = mongoose.model("User", UserSchema);
