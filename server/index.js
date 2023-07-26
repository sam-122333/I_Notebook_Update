const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");

// setup express app
const app = express();

//setup config path
dotenv.config({ path: "./config.env" });

// connect the server to the database
require("./db");

// middleware
app.use(express.json());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// let’s you use the cookieParser in your application
app.use(cookieParser());
app.use(helmet());

//Available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

const port = process.env.PORT || 7000;

app.listen(port, "localhost", () => {
  console.log(`server listen on port ${port}`);
});
