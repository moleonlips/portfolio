document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector("header");
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            header.style.background = "#005bb5";
        } else {
            header.style.background = "#0073e6";
        }
    });
});
