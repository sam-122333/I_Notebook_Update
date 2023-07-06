const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");

// connect the server to the database
require("./db");

const app = express();
const port = 7000;
app.use(express.json());
app.use(cors());

//Available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, "localhost", () => {
  console.log(`server listen on port ${port}`);
});
