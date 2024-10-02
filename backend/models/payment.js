const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userID: {
    type: String,
    require: true,
  },
  paymentID: [
    {
      type: String,
      require: true,
    },
  ],
  plan: {
    type: String,
    require: true,
    default: "NONE",
  },
});

const payment = mongoose.model("payment", paymentSchema);

module.exports = payment;
