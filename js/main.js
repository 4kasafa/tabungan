document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    hamburger.addEventListener('click', () => {
        // Toggle menu visibility
        navMenu.classList.toggle('open');
        
        // Toggle hamburger icon between "hamburger" and "X"
        if (navMenu.classList.contains('open')) {
            hamburger.innerHTML = '&#10005;'; // Unicode for "X"
        } else {
            hamburger.innerHTML = '&#9776;'; // Unicode for hamburger
        }
    });
});
