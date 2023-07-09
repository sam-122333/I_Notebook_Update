const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// connect the server to the database
require("./db");

const app = express();
const port = 7000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// let’s you use the cookieParser in your application
app.use(cookieParser());

// cross origin middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

//Available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, "localhost", () => {
  console.log(`server listen on port ${port}`);
});
