const User = require("../models/userData");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    let toasts = [];

    if (!fullName)
      toasts.push({ message: "full name is required", type: "error" });

    if (!password)
      toasts.push({ message: "A valid Password is required", type: "error" });
    if (password && (password.length < 4 || password.length > 19))
      toasts.push({
        message: "Password must be at least 8 - 16 characters long",
        type: "error",
      });

    if (!email || !validatedEmail(email))
      toasts.push({ message: "A valid Email is required", type: "error" });

    if (toasts.length > 0) return res.status(400).json(toasts);

    let newUser = await User.findOne({ email });

    if (newUser)
      return res
        .status(400)
        .json([{ message: "User already exists", type: "error" }]);

    newUser = new User(req.body);

    // Hash password before saving in database
    const salt = await bcrypt.genSalt(10);

    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();

    const payload = {
      id: newUser._id,
    };

    jwt.sign(
      payload,
      "SkyGoal_api",
      {
        expiresIn: "7d",
      },
      (err, token) => {
        if (err) throw err;
        res.json(token);
      }
    );
  } catch (err) {
    console.error(`ERROR: ${err.message}`);
    res.status(500).send("Server Error");
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    let toasts = [];
    if (!password)
      toasts.push({ message: "A valid Password is required", type: "error" });
    if (password && (password.length < 4 || password.length > 19))
      toasts.push({
        message: "Password must be at least 8 - 16 characters long",
        type: "error",
      });

    if (!email || !validatedEmail(email))
      toasts.push({ message: "A valid Email is required", type: "error" });

    if (toasts.length > 0) return res.status(400).json(toasts);

    let user = await User.findOne({ email });

    if (!user)
      return res
        .status(400)
        .json([{ message: "User does not exist", type: "error" }]);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res
        .status(400)
        .json([{ message: "Invalid credentials", type: "error" }]);

    const payload = {
      id: user._id,
    };

    jwt.sign(
      payload,
      "SkyGoal_api",
      {
        expiresIn: "7d",
      },
      (err, token) => {
        if (err) throw err;
        res.json(token);
      }
    );
  } catch (err) {
    console.error(`ERROR: ${err.message}`);
    res.status(500).send("Server Error");
  }
};



const getProfile = async (req, res) => {

  try {
    const user = await User.findOne({
      _id: req.user.id
    }, {
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
      password: 0,
      email: 0,
      _id: 0
    })



    if (!user) return res.status(404).json([{ message: 'User does not exist', type: 'error' }]);

    res.status(200).json(user);
  } catch (error) {
    console.error(`ERROR: ${err.message}`);
    res.status(500).send('Server Error');
  }
}

const updateUser = async (req, res) => {
  try {


    if (!req.user.id) {
      return res.status(401).json([{ message: 'Unauthorized Action', type: 'error' }]);
    }

    let user = await User.findOneAndUpdate({ _id: req.user.id }, req.body, { new: true });



    if (!user) return res.status(404).json([{ message: 'User does not exist', type: 'error' }]);
    let data = {
      fullName: user.fullName,
      location: user.location,
      About: user.About

    };


    res.status(200).json(data);

  } catch (err) {
    console.error(`ERROR: ${err.message}`);
    res.status(500).send('Server Error');
  }
}
function validatedEmail(email) {
  const regex = /\S+@\S+\.\S+/;

  //validemail@mail.com returns true whereas validemail.mail.com returns false
  return regex.test(email);
}
module.exports = {
  registerUser,
  loginUser,
  getProfile,
  updateUser
};