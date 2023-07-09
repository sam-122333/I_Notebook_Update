const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
const DB =
  "mongodb+srv://mdsameer122333:Md%26%40meer2@cluster0.ueaykrg.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(DB, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false,
  })
  // .connect(DB)
  .then(() => {
    console.log("saved complete!");
  })
  .catch((err) => {
    console.log("error catch", err);
  });
