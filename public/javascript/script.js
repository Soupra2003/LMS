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

//for comment and review 

// document.addEventListener("DOMContentLoaded", () => {
//   // Select all "More" toggle links
//   const toggleLinks = document.querySelectorAll(".toggle-comment");

//   toggleLinks.forEach(link => {
//     link.addEventListener("click", (event) => {
//       event.preventDefault(); // Prevent default link behavior
//       const id = link.getAttribute("data-id");

//       // Get short and full comment elements
//       const shortComment = document.getElementById(`short-${id}`);
//       const fullComment = document.getElementById(`full-${id}`);

//       // Check if short comment is currently hidden
//       if (shortComment.style.display === "none") {
//         // Show short comment, hide full comment
//         shortComment.style.display = "inline";
//         fullComment.style.display = "none";
//         link.textContent = "More"; // Change link text to "More"
//       } else {
//         // Show full comment, hide short comment
//         shortComment.style.display = "none";
//         fullComment.style.display = "inline";
//         link.textContent = "Less"; // Change link text to "Less"
//       }
//     });
//   });
// });



// flash message


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
      const verifyRes = await fetch("/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(response)
      });

      const result = await verifyRes.json();

      if (result.success) {
        window.location.href = "/success";
      } else {
        window.location.href = "/course";
      }
    },
    prefill: {
      name: username,
      email: "<%= curUser.email %>"
    },
    theme: { color: "#3399cc" }
  };

  const rzp = new Razorpay(options);
  rzp.open();
}


