const { CatchAsyncError } = require("../middlewares/asyncerror");
const Razorpay = require("razorpay");
const ErrorHandler = require("../utility/error");
const payment = require("../models/payment");
const user = require("../models/user");

const Checkout = CatchAsyncError(async (req, res, next) => {
  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
  });

  const { amount } = req.body;

  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: "#receopy",
    payment_capture: 1,
  };

  const order = await instance.orders.create(options);

  return res.status(200).json({ order });
});

const Storepayment = CatchAsyncError(async (req, res, next) => {
  const { paymentid } = req.params;
  const { email, plan } = req.body;

  const User = await user.findOne({ email });
  if (!User) return next(new ErrorHandler("Invalid User", 400));

  const UserExist = await payment.findOne({ userID: User._id });

  if (UserExist) {
    UserExist.paymentID.push(paymentid);
    await UserExist.save();
  }

  await payment.create({
    userID: User._id,
    paymentID: paymentid,
    plan: plan,
  });

  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
  });

  const Payment = await instance.payments.fetch(paymentid);

  if (!Payment) return next(new ErrorHandler("Razorpay error", 500));

  const refercode = User.refferdBy;

  if (refercode) {
    const referUser = await user.findOne({ refferalCode: refercode });
    if (referUser) {
      referUser.points = referUser.points + 4000;
      await referUser.save();
    }
    return res.status(200).json({ message: "Succesfully paid and refered" });
  } else {
    return res.status(200).json({ message: "Successfully logged", payment });
  }
});

module.exports = {
  Checkout,
  Storepayment,
};
