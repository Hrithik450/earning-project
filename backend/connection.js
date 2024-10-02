const mongoose = require("mongoose");

const connectDB = (url) => {
  mongoose.connect(url).then(() => console.log("mongoose connected"));
};

module.exports = {
  connectDB,
};
