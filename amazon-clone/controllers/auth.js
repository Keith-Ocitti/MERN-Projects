const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors/index");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// function to register
const register = async (req, res) => {
  const { email } = req.body;
  let emailAlreadyExist = await User.findOne({ email });
  if (emailAlreadyExist) {
    throw new BadRequestError("Email already exist");
  }
  const user = await User.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ user });
};

// function to login
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Provide email and password please");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials,password");
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ name: user.name, userId: user._id, token });
};

// function to update current user profile
const updateProfile = async (req, res) => {
  let { userId, name, email, password, phone, address } = req.body;

  let newProfile = {};
  if (name) {
    newProfile.name = name;
  }
  if (email) {
    newProfile.email = email;
  }
  if (password) {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    newProfile.password = password;
  }
  if (phone) {
    newProfile.phone = password;
  }
  if (address) {
    newProfile.address = address;
  }

  const user = await User.findOneAndUpdate(
    { _id: userId },
    { ...newProfile },
    { new: true }
  );

  res.status(StatusCodes.CREATED).json(newProfile);
};

module.exports = { register, login, updateProfile };
