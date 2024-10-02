const jwt = require("jsonwebtoken");
const user = require("../models/user");
const ErrorHandler = require("../utility/error");
const { CatchAsyncError } = require("./asyncerror");

const Authentication = CatchAsyncError(async (req, res, next) => {
  const { MID } = req.cookies;
  req.user = null;

  if (!MID) {
    return next();
  }
  const { id } = jwt.verify(MID, process.env.JWTSECRET);
  const User = await user.findOne({ _id: id });

  if (!User) {
    return next();
  }

  req.user = User;
  console.log(req.user);
  next();
});

const verifyToken = CatchAsyncError(async (req, res, next) => {
  const token = await req.cookies?.MID; //type Error and //undefined error

  if (!token) return next(new ErrorHandler("You are not Authorized", 404));

  jwt.verify(String(token), process.env.JWTSECRET, async (err, User) => {
    if (err) {
      return next(new ErrorHandler("Invalid Token", 400));
    }

    req.user = User;
  });
  next();
});

const RefreshToken = CatchAsyncError(async (req, res, next) => {
  const prevtoken = await req.cookies?.MID;

  if (!prevtoken) {
    return next(new ErrorHandler("token not found!!", 404));
  }

  jwt.verify(prevtoken, process.env.JWTSECRET, (err, User) => {
    if (err) {
      return next(new ErrorHandler("Invalid Token!! ", 400));
    }

    res.clearCookie(`MID`);
    req.cookies[`MID`] = "";

    const token = jwt.sign(
      {
        id: User.id,
      },
      process.env.JWTSECRET,
      {
        expiresIn: "7d",
      }
    );

    req.user = User;

    res.cookie(String(`${User.id}`), token, {
      path: "/",
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
  });

  next();
});

module.exports = {
  Authentication,
  verifyToken,
  RefreshToken,
};
