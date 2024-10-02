const user = require("../models/user");
const crypto = require("crypto");
const bcryptjs = require("bcryptjs");
const SendResetMail = require("../utils/PassReset");
const { validationResult } = require("express-validator");
const ErrorHandler = require("../utils/Error");
const { CatchAsyncError } = require("../middlewares/asyncerror");
// const { validate } = require("../middlewares/auth");

const ForgotPassword = CatchAsyncError(async (req, res, next) => {
  const { email } = req.body;

  let User = await user.findOne({ email });
  if (!User) return next(new ErrorHandler("User not found!!", 404));

  const token = crypto.randomBytes(20).toString("hex");

  const Token = crypto.createHash("sha256").update(token).digest("hex");
  User.resetPasswordToken = Token;
  User.resetPasswordExpires = Date.now() + 3600000;

  await User.save();

  const resetUrl = `${req.protocol}://localhost:5173/users/password/reset/${Token}`;
  const message = `To reset the password , please click the link below ${resetUrl} \n\n If you not requested for the password reset url, \n please ignore this mail`;

  try {
    await SendResetMail({
      to: User.email,
      subject: "Password recovery email",
      text: message,
    });

    return res.status(200).json({
      success: "true",
      msg: `Your password reset link has been sent to ${User.email} successfully`,
    });
  } catch (err) {
    User.resetPasswordToken = undefined;
    User.resetPasswordExpires = undefined;

    await User.save();

    return res.status(500).json({
      success: "fail",
      msg: "Internal server error",
      error: err,
    });
  }
});

const ResetPassword = CatchAsyncError(async (req, res, next) => {
  const { newPassword, ConfirmPassword } = req.body;
  const id = req.params.id;

  const User = await user.findOne({
    resetPasswordToken: id,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!User)
    return next(
      new ErrorHandler("Link has been expired , please try again later", 400)
    );

  if (newPassword !== ConfirmPassword)
    return next(
      new ErrorHandler(`password doesn't match , please try again`, 400)
    );

  const salt = await bcrypt.genSalt(10);
  User.password = await bcrypt.hash(newPassword, salt);

  User.resetPasswordToken = undefined;
  User.resetPasswordExpires = undefined;

  await User.save();

  return res
    .status(200)
    .json({ msg: "success , password updated successfully" });
});

module.exports = {
  ForgotPassword,
  ResetPassword,
};
