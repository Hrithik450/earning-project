const express = require("express");
// const { Checkout, verifyPayment } = require("../controllers/payment");
const { Checkout, Storepayment } = require("../controllers/payment");
const { verifyToken } = require("../middlewares/userAuth");

const router = express.Router();

router.post("/checkout", verifyToken, Checkout);
router.post("/:paymentid", verifyToken, Storepayment);

module.exports = router;
