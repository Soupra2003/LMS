// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()


// Auto-dismiss after 3 seconds
setTimeout(() => {
  const successAlert = document.getElementById("flash-success");
  const errorAlert = document.getElementById("flash-error");
  if (successAlert) {
    successAlert.classList.remove("show");
    successAlert.classList.add("hide");
  }
  if (errorAlert) {
    errorAlert.classList.remove("show");
    errorAlert.classList.add("hide");
  }
}, 3000);


//razorpay paymet 


async function payNow(courseId) {
  const res = await fetch("/payment/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ courseId: courseId })
  });

  const data = await res.json();
  const order = data.order;
  const course = data.course;

  console.log(course.price)

  const options = {
    key: RAZORPAY_KEY,
    amount: order.amount,
    currency: order.currency,
    name: course.title,
    description: "Course Enrollment",
    order_id: order.id,
    handler: async function (response) {
      response.courseId = courseId;
      const verifyRes = await fetch("/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(response)
      });

      const result = await verifyRes.json();

      if (result.success) {
        window.location.href =`/course/${courseId}`;
      } else {
        window.location.href = "/eduraft";
      }
    },
    prefill: {
      name: `${curUser.name}`,
      email: "<%= curUser.email %>"
    },
    theme: { color: "#3399cc" }
  };

  const rzp = new Razorpay(options);
  rzp.open();
}


