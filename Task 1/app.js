document.addEventListener('DOMContentLoaded', () => {
    
    // -----------------------------------------------------------------
    // FEATURE 1: Smooth Scrolling for Navigation Links
    // -----------------------------------------------------------------
    // Selects all anchor tags in the nav that link to an ID (starts with #)
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); 

            const targetId = this.getAttribute('href'); 
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Smooth scroll to the element
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });


    // -----------------------------------------------------------------
    // FEATURE 2: Simple Modal for the CTA Button
    // -----------------------------------------------------------------
    // Get the elements by their class/ID
    const ctaButton = document.querySelector('.cta-button'); // The button in the Hero section
    const modal = document.getElementById('modal'); // The hidden modal container
    const closeButton = document.querySelector('.close-button'); // The 'X' inside the modal

    if (ctaButton && modal && closeButton) {
        // 1. Open the modal when the CTA button is clicked
        ctaButton.addEventListener('click', () => {
            modal.style.display = 'block';
        });

        // 2. Close the modal when the 'X' button is clicked
        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // 3. Close the modal when the user clicks anywhere outside of it
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    } else {
        // If any element is missing, log an error to the browser console
        console.error("Missing HTML elements required for JavaScript (CTA button or Modal).");
    }
});