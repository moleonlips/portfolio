document.addEventListener("DOMContentLoaded", function () {
    const header = document.getElementById("header");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            header.style.background = "#005bb5";
        } else {
            header.style.background = "#0073e6";
        }
    });

    // Fetch secrets from the environment (GitHub Actions will inject them)
    const emailUserId = process.env.EMAILJS_USER_ID;
    const emailServiceId = process.env.EMAILJS_SERVICE_ID;
    const emailTemplateId = process.env.EMAILJS_TEMPLATE_ID;

    emailjs.init(emailUserId);

    document.getElementById("contact-form").addEventListener("submit", function (event) {
        event.preventDefault();

        emailjs.send(emailServiceId, emailTemplateId, {
            from_name: document.getElementById("name").value,
            from_email: document.getElementById("email").value,
            message: document.getElementById("message").value
        })
            .then(response => {
                console.log("Message sent successfully!");
            })
            .catch(error => {
                console.log("Error sending message.");
            });
    });
});

