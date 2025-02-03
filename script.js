document.addEventListener("DOMContentLoaded", function () {
    const header = document.getElementById("header");
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const body = document.body;

    // Dark mode toggle
    darkModeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-mode");
        header.classList.toggle("dark-mode");

        document.querySelectorAll(".project").forEach(project => {
            project.classList.toggle("dark-mode");
        });

        // Save preference to local storage
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
            darkModeToggle.innerText = "☀️ Light Mode";
        } else {
            localStorage.setItem("darkMode", "disabled");
            darkModeToggle.innerText = "🌙 Dark Mode";
        }
    });

    // Load dark mode preference
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
        header.classList.add("dark-mode");
        document.querySelectorAll(".project").forEach(project => {
            project.classList.add("dark-mode");
        });
        darkModeToggle.innerText = "☀️ Light Mode";
    }

    // Smooth scroll effect
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    // Change header background color on scroll
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

