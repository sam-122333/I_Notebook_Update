const JWT_KEY = "sameer";
const jwt = require("jsonwebtoken");
const fetchuser = (req, res, next) => {
  //get the user from the jwt token and add it to req object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "please authenticate using a valid token1" });
  }
  try {
    const data = jwt.verify(token, JWT_KEY);
    req.user = data.user;
    // console.log(req.user);
    next();
  } catch (error) {
    res.status(401).send({
      error: "please authenticate using a valid token2",
      message: error.message,
    });
  }
};
module.exports = fetchuser;
