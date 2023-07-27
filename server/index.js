const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const path = require("path");
// setup express app
const app = express();

//setup config path
dotenv.config({ path: "./config.env" });

// connect the server to the database
require("./db");

// middleware
app.use(express.json());
app.use(cors());

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      scriptSrc: ["'self'", "cdn.jsdelivr.net"],
    },
  })
);

// app.use(
//   cors({
//     origin: true,
//     credentials: true,
//   })
// );

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// let’s you use the cookieParser in your application
app.use(cookieParser());
app.use(helmet());

//Available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

//server the front end
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html")),
    function (err) {
      res.status(err);
    };
});

const port = process.env.PORT || 7000;

app.listen(port, "localhost", () => {
  console.log(`server listen on port ${port}`);
});
