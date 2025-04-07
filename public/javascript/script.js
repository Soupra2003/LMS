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

    document.addEventListener("DOMContentLoaded", () => {
        // Select all "More" toggle links
        const toggleLinks = document.querySelectorAll(".toggle-comment");

        toggleLinks.forEach(link => {
            link.addEventListener("click", (event) => {
                event.preventDefault(); // Prevent default link behavior
                const id = link.getAttribute("data-id");

                // Get short and full comment elements
                const shortComment = document.getElementById(`short-${id}`);
                const fullComment = document.getElementById(`full-${id}`);

                // Check if short comment is currently hidden
                if (shortComment.style.display === "none") {
                    // Show short comment, hide full comment
                    shortComment.style.display = "inline";
                    fullComment.style.display = "none";
                    link.textContent = "More"; // Change link text to "More"
                } else {
                    // Show full comment, hide short comment
                    shortComment.style.display = "none";
                    fullComment.style.display = "inline";
                    link.textContent = "Less"; // Change link text to "Less"
                }
            });
        });
    });



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



