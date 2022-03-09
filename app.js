require("dotenv").config();
require("./config/database").connect();

const express = require("express");
const User = require("./model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");

const app = express();

const { TOKEN_KEY } = process.env;

app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    //get input
    const { first_name, last_name, email, password } = req.body;

    //validate input
    if (!(first_name && last_name && email && password)) {
      return res.status(400).send("all input is required");
    }

    // if use exist -> validate in db
    const oldUser = await User.findOne({ email: email.toLowerCase() });
    if (oldUser) {
      return res.status(409).send("User already exists. Please login");
    }

    // encrypt password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    // create token
    const token = jwt.sign({ user_id: user._id, email }, TOKEN_KEY, {
      expiresIn: "2h",
    });

    // save user tokens
    user.token = token;
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});
app.get("/login", async (req, res) => {
  try {
    // get input
    const { email, password } = req.body;

    // validate input
    if (!(password && email)) {
      return res.status(400).send("all input are require");
    }

    // validation user in db
    const user = await User.findOne({ email: email.toLowerCase() });
    if (user && (await bcrypt.compare(password, user.password))) {
      // create token
      const token = jwt.sign({ user_id: user._id, email }, TOKEN_KEY, {
        expiresIn: "2h",
      });
      user.token = token;
      return res.status(200).json(user);
    }
    return res.status(400).send("invalid credential");
  } catch (err) {
    console.log(err);
  }
});
app.post("/welcome", auth, (req, res) => {
  res.status(200).send("welcome <3");
});

module.exports = app;
