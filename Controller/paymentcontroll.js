const razorpay = require("../razorpay");
const Course = require("../models/course"); // adjust based on your project

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