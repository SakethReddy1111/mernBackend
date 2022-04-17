const mongoose = require("mongoose");

module.exports = () => {
  return mongoose.connect(
    "mongodb+srv://sakethreddy:saketh143@cluster0.3dkmp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
};
