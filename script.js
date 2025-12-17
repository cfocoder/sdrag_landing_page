// SDRAG Landing Page JavaScript

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Contact Form Handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submit-btn');
            const formMessage = document.getElementById('form-message');
            const originalBtnText = submitBtn.textContent;
            
            // Disable button and show loading
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            formMessage.classList.add('hidden');
            
            // Get form data
            const formData = new FormData(contactForm);
            
            try {
                // Send to our API endpoint
                const response = await fetch('https://resend.sdrag.com/api/contact', {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    // Success
                    formMessage.textContent = 'Message sent successfully! We\'ll get back to you soon.';
                    formMessage.className = 'p-4 rounded-lg mb-4 bg-green-500/20 border border-green-500 text-green-200';
                    contactForm.reset();
                } else {
                    throw new Error('Failed to send message');
                }
            } catch (error) {
                // Error
                formMessage.textContent = 'Failed to send message. Please try again or email us directly at hector@sdrag.com';
                formMessage.className = 'p-4 rounded-lg mb-4 bg-red-500/20 border border-red-500 text-red-200';
            } finally {
                // Re-enable button
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        });
    }
});
