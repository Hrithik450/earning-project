const express = require("express");
const {
  createNewUser,
  loginUser,
  Myprofile,
  Logout,
  updateCoin,
} = require("../controllers/user");
// const { ForgotPassword, ResetPassword } = require("../controllers/PassReset");
const { verifyToken, RefreshToken } = require("../middlewares/userAuth");

const router = express.Router();

router.get("/", (req, res) => {
  return res.end("Hello World");
});
router.post("/signup", createNewUser);
router.post("/login", loginUser);
router.get("/me", verifyToken, Myprofile);
router.get("/logout", Logout);
router.post("/Updatecoin", verifyToken, updateCoin);
// router.patch("/users/forgetpassword", checkIsEmptyEmail(), ForgotPassword);
// router.post("/users/password/reset/:id", checkIsEmptyPassword(), ResetPassword);
// router.get("/refresh", RefreshToken, verifyToken, Myprofile);

module.exports = router;
