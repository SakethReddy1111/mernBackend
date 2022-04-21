const express = require("express");
var cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const connect = require("./configs/db");

const userController = require("./controllers/user.controller");
const flatController = require("./controllers/flats.controller");
const residentController = require("./controllers/resident.controller");

app.use("/users", userController);
app.use("/flats", flatController);
app.use("/residents", residentController);

app.listen(8000, async () => {
  try {
    await connect();
    console.log("listening at port 8000");
  } catch (er) {
    console.log("ERROR : " + er);
  }
});
