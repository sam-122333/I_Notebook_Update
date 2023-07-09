const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_KEY = "sameer";
const fetchuser = require("../middleware/fetchuser");

// ROUTE 1 :creating a user using :POST "/api/auth/createuser" no login required
router.post("/createuser", async (req, res) => {
  let success = false;
  //checking user's email is already exist or not\
  try {
    const { name, email, password, cpassword } = req.body;
    if (!name || !email || !password || !cpassword) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    let userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return res
        .status(400)
        .json({ success, message: "this email is already exist" });
    } else if (password !== cpassword) {
      return res.status(402).json({ message: "Password doesn't match" });
    } else {
      success = true;
      //create a new user
      const createuser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        cpassword: req.body.cpassword,
      });
      success = true;
      res.json({ success, createuser });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("some error happen");
  }
});

//ROUTE 2 : authenticate a user using :POST "/api/auth/login" no login required

router.post("/login", async (req, res) => {
  let success = false;

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    let userExist = await User.findOne({ email });
    if (userExist) {
      const passwordCompare = await bcrypt.compare(
        password,
        userExist.password
      );
      if (!passwordCompare) {
        return res
          .status(404)
          .json({ error: "please enter the correct password" });
      } else {
        success = true;
        const token = jwt.sign(
          { _id: userExist._id, email: userExist.email },
          JWT_KEY
        );
        res
          .cookie("token", token, {
            expires: new Date(Date.now() + 2000000000),
            httpOnly: true,
            secure: true,
          })
          .status(201)
          .json({ success, token });
      }
    } else {
      return res.status(404).json({ error: "sorry user doesn't exist" });
    }
  } catch (error) {
    res
      .status(404)
      .json({ error: "internal server error", message: error.message });
  }
});

//ROUTE 3 : authenticate a user using :POST "/api/auth/getuser". Login required
// router.post("/getuser", fetchuser, async (req, res) => {
//   console.log("getuser working");
//   try {
//     res.send(req.rootUser);
//   } catch (error) {
//     res
//       .status(404)
//       .json({ error: "internal server error", message: error.message });
//   }
// });
module.exports = router;
