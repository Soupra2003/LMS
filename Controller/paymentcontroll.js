const razorpay = require("../razorpay");
const Course = require("../models/course"); // adjust based on your project
const Enrollment = require("../models/Enrollment");
const crypto = require("crypto");

exports.createOrder = async (req, res) => {
    try {
      const { courseId } = req.body;
  
      const course = await Course.findById(courseId);
      if (!course) return res.status(404).json({ error: 'Course not found' });
  
      const amount = course.price * 100; // ₹ to paise
  
      const order = await razorpay.orders.create({
        amount,
        currency: "INR",
        receipt: `receipt_${Date.now()}`
      });
  
      res.json({ success: true, order, course });
    } catch (err) {
      console.error("Create order error:", err);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  };

  
exports.verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const secret = process.env.RAZORPAY_SECRET_KEY;
  console.log("Secret is:", secret); 

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    console.log("✅ Verified payment:", razorpay_payment_id);

    await Enrollment.create({
      user: req.user._id, // assuming you have user logged in
      course: req.body.courseId, // send this from frontend
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      paymentStatus: 'Paid'
    });

    return res.json({ success: true });
  } else {
    console.log("❌ Verification failed.");
    return res.json({ success: false });
  }
};