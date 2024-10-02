const express = require("express");

const {
  verifyEmail,
  SendOtp,
  VerifyOtp,
  generateQR,
  verifyQR,
  TwoFAverified,
} = require("../controllers/verifyEmail");

const router = express.Router();

router.get("/:vtoken", verifyEmail);
router.post("/send-otp", SendOtp);
router.post("/otp", VerifyOtp);
router.post("/generate-qr", generateQR);
router.post("/code", verifyQR);
router.post("/verified", TwoFAverified);

module.exports = router;
