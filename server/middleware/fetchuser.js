const JWT_KEY = "sameer";
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const fetchuser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const verifyToken = jwt.verify(token, JWT_KEY);
    const rootUser = await User.findById({
      _id: verifyToken._id,
      email: verifyToken.email,
    }).select("-password -cpassword");
    // console.log(rootUser, "this is rootuser");
    if (!rootUser) {
      res.status(401).send({
        error: "please authenticate using a valid token1",
      });
    }
    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser.id;
    next();
  } catch (error) {
    console.log(req.cookies.token);
    res.status(401).send({
      error: "please authenticate using a valid token2",
      message: error.message,
    });
  }
};
module.exports = fetchuser;
