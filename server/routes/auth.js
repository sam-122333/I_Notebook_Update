const express = require("express");
const router = express.Router();
const User = require("../models/User");
// const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_KEY = "sameer";
const fetchuser = require("../middleware/fetchuser");

// ROUTE 1 :creating a user using :POST "/api/auth/createuser" no login required
router.post(
  "/createuser",
  // [
  //   body("name", "please enter minimum 3 character").isLength({ min: 3 }),
  //   body("email", "please enter a valid email").isEmail(),
  //   body("password", "please enter minimum 6 character").isLength({ min: 6 }),
  // ],
  async (req, res) => {
    // console.log(req.header);
    let success = false;
    // const errors = validationResult(req);
    // console.log(errors.isEmpty());
    // if (!errors.isEmpty()) {
    //   res.status(400).json({ success, errors: errors.array() });
    // }
    // res.send(req.body);
    // console.log(req.body);

    //checking user's email is exist or not\
    try {
      let user = await User.findOne({ email: req.body.email });
      console.log(user, "after");
      if (user) {
        return res
          .status(400)
          .json({ success, error: "this email is already exist" });
      }
      success = true;
      const salt = await bcrypt.genSalt(10);
      let secPass = await bcrypt.hash(req.body.password, salt);

      //create a new user
      const createuser = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      success = true;
      res.json({ success, createuser });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("some error happen");
    }

    // const user = new User(req.body);
    // user.save();
    // res.send(req.body);
    // res.json({ message: "success", file: "auth" });
  }
);

//ROUTE 2 : authenticate a user using :POST "/api/auth/login" no login required
router.post(
  "/login",
  // [
  //   body("email", "please enter a valid email").isEmail(),
  //   body("password", "please enter minimum 3 character").isLength({ min: 6 }),
  // ],
  async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "sorry user doesn't exist" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(404)
          .json({ error: "please enter the correct password" });
      }
      console.log(user.id, user.email);
      const data = { user: { id: user.id } };
      const jwtToken = jwt.sign(data, JWT_KEY);
      console.log(passwordCompare, "data");
      success = true;
      res.status(200).json({ success, jwtToken });
    } catch (error) {
      res
        .status(404)
        .json({ error: "internal server error", message: error.message });
    }
  }
);
//ROUTE 3 : authenticate a user using :POST "/api/auth/getuser". Login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    res
      .status(404)
      .json({ error: "internal server error", message: error.message });
  }
});
module.exports = router;
