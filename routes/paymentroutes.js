const express = require("express");
const router = express.Router();
const paymentController = require("../Controller/paymentcontroll");

router.post("/create-order", paymentController.createOrder);

module.exports = router;
