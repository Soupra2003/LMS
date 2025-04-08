const express = require("express");
const router = express.Router();
const paymentController = require("../Controller/paymentcontroll");

router.post("/create-order", paymentController.createOrder);
router.post("/verify", paymentController.verifyPayment);

module.exports = router;
