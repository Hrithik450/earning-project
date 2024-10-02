const jwt = require("jsonwebtoken");
const user = require("../models/user");
const axios = require("axios");
const Otp = require("../models/otp");
const TwoFA = require("../models/2FA");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
const ErrorHandler = require("../utils/Error");
const { CatchAsyncError } = require("../middlewares/asyncerror");

const verifyEmail = CatchAsyncError(async (req, res, next) => {
  const { vtoken } = req.params;

  const gotUser = jwt.verify(vtoken, process.env.SECRET);
  const User = await user.findById(gotUser.user.id);

  if (User) {
    User.verified = true;
    await User.save();
    res.status(200).json({ msg: "success , you're verified" });
  } else {
    return next(new ErrorHandler("Invalid verification link", 400));
  }
});

const SendOtp = CatchAsyncError(async (req, res, next) => {
  const { MobileNumber } = req.body;
  const User = await Otp.create({
    MobileNumber,
  });

  const otp = Math.floor(1000 + Math.random() * 9000);

  const response = await axios.get("https://www.fast2sms.com/dev/bulkV2", {
    params: {
      authorization: process.env.FAST2_API,
      sender_id: "FSTSMS",
      message: `Your One time Otp is ${otp}`,
      language: "english",
      route: "q",
      numbers: MobileNumber,
    },
  });

  console.log(response);
  if (response.data.return) {
    const User = await Otp.findOne({ MobileNumber });

    if (User) {
      User.otp = otp;
      await User.save();
      return res.status(200).json({ msg: "otp sent succesgully", otp: otp });
    } else {
      return next(new ErrorHandler("User not found!!", 404));
    }
  }
});

const VerifyOtp = CatchAsyncError(async (req, res, next) => {
  const { otp } = req.body;

  const User = await Otp.findOne({ otp: otp });

  if (User && User.otp === otp) {
    User.otp = undefined;
    await User.save();
    return res.status(200).json({ msg: "otp verified successfully" });
  } else {
    return next(new ErrorHandler("Invalid Otp", 400));
  }
});

const generateQR = CatchAsyncError(async (req, res, next) => {
  const { username } = req.body;
  const user = await TwoFA.findOne({ username: username });

  if (user) {
    return next(new ErrorHandler("fail , User already exists ", 400));
  } else {
    await TwoFA.create({
      username,
    });
  }

  const tempSecret = speakeasy.generateSecret();
  const User = await TwoFA.findOneAndUpdate(
    { username },
    { tempSecret: tempSecret.base32 }
  );

  const OtpAuthUrl = `otpauth://totp/${username}?secret=${tempSecret.base32}&issuer=YourAppName`;

  qrcode.toDataURL(OtpAuthUrl, async (err, dataURL) => {
    if (err) {
      return next(new ErrorHandler("Failed to generate qr-code", 500));
    }

    User.dataURL = dataURL;
    await User.save();

    res.status(201).json({
      msg: "success",
      dataURL: dataURL,
      tempSecret: tempSecret.base32,
    });
  });
});

const verifyQR = CatchAsyncError(async (req, res, next) => {
  const { username, code } = req.body;

  const User = await TwoFA.findOne({ username });
  if (!User || !User.tempSecret)
    return next(new ErrorHandler("User not found!!", 404));

  const base32secret = User.tempSecret;

  const verified = speakeasy.totp.verify({
    secret: base32secret,
    encoding: "base32",
    token: code,
    window: 6,
  });

  if (verified) {
    User.secret = User.tempSecret;
    User.tempSecret = undefined;
    User.is2FAEnabled = true;
    await User.save();

    return res.status(200).json({ msg: "Successfully 2FA Enabled" });
  } else {
    return next(new ErrorHandler("Invalid Code , Try again", 400));
  }
});

const TwoFAverified = CatchAsyncError(async (req, res, next) => {
  const { username } = req.body;

  const User = await TwoFA.findOne({ username });

  if (User && User.is2FAEnabled === true) {
    return res.status(200).json({ msg: "verified" });
  }

  return next(new ErrorHandler("Not verfied", 400));
});

module.exports = {
  verifyEmail,
  SendOtp,
  VerifyOtp,
  generateQR,
  verifyQR,
  TwoFAverified,
};
