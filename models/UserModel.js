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
    outlets: {
      type: Array,
      require: true
    }
  },
  { timestamps: true }
);

// static create user
UserSchema.statics.signup = async function (email, password,zonal , is_zonal, outlets) {
  if(!email || !password){
    throw new Error("Please enter a valid email and password");
  }
  const exists = await this.findOne({ email });

  console.log(exists);

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
      is_zonal,
      outlets
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

    console.log(user.password);

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


// Hash the password before saving it
// UserSchema.pre("save", async function (next) {
//   console.log("hello");
//   const user = this;
//   if (!user.isModified("password")) return next();

//   try {
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(user.password, salt);
//     user.password = hash;
//     next();
//   } catch (error) {
//     return next(error);
//   }
// });

// Compare the provided password with the stored hash
UserSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model("User", UserSchema);
