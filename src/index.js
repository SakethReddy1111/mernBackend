const express = require("express");

const app = express();
app.use(express.json());

const connect = require("./configs/db");

const userController = require("./controllers/user.controller");

app.use("/users", userController);

app.listen(8000, async () => {
  try {
    await connect();
    console.log("listening at port 8000");
  } catch (er) {
    console.log("ERROR : " + er);
  }
});
