// Variables
const header = document.querySelector('header');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');
const registerInterestBtn = document.getElementById('register-interest');
const projectOverviewRegisterBtn = document.getElementById('project-overview-register');
const downloadBrochureBtn = document.getElementById('download-brochure');
const Reg3bhkBtn = document.getElementById('3bhk-register');
const Reg4bhkBtn = document.getElementById('4bhk-register');
const modal = document.getElementById('interest-modal');
const closeModal = document.querySelector('.close-modal');
const interestForm = document.getElementById('interest-form');
const inquiryForm = document.getElementById('inquiry-form');
const contactFormApiUrl = 'https://p7hjkeqa74.execute-api.eu-north-1.amazonaws.com/prod/contactform';


// Toggle mobile menu
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Close mobile menu when link is clicked
function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

// Open modal
function openModal() {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Close modal
function closeModalFunction() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Allow scrolling
}

// Handle scroll events
function handleScroll() {
    // Add shadow to header on scroll
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    // Highlight active menu item based on scroll position
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (sectionId && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Smooth scroll for navigation links
function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    
    if (targetId === '#home') {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } else {
        const targetSection = document.querySelector(targetId);
        const headerHeight = header.offsetHeight;
        
        window.scrollTo({
            top: targetSection.offsetTop - headerHeight,
            behavior: 'smooth'
        });
    }
    
    closeMobileMenu();
}

// Form submission handlers

function handleFormSubmission(event, formId) {
    event.preventDefault();
    const formData = new FormData(document.getElementById(formId));
    const formDataObj = {};

    // Convert FormData to object
    for (const [key, value] of formData.entries()) {
        formDataObj[key] = value;
    }

    // Send data to server
    fetch(contactFormApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataObj),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Form submitted successfully:', data);
        alert('Thank you for your submission! We will contact you shortly.');
        
        // Reset form and close modal
        if (formId === 'interest-form') {
            interestForm.reset();
        } else if (formId === 'inquiry-form') {
            inquiryForm.reset();
        }
        closeModalFunction();
    })
    .catch(error => {
        console.error('Error submitting form:', error);
        alert('There was an error submitting your form. Please try again later.');
    });
}

// function handleInterestForm(e) {
//     e.preventDefault();
//     const formData = new FormData(interestForm);
//     const formDataObj = {};
    
    
//     for (const [key, value] of formData.entries()) {
//         formDataObj[key] = value;
//     }
    
   
//     console.log('Interest form submitted:', formDataObj);
    
  
//     alert('Thank you for your interest! We will contact you shortly.');
    

//     interestForm.reset();
//     closeModalFunction();
// }

// function handleInquiryForm(e) {
//     e.preventDefault();
//     const formData = new FormData(inquiryForm);
//     const formDataObj = {};
   
//     for (const [key, value] of formData.entries()) {
//         formDataObj[key] = value;
//     }
    
   
//     console.log('Inquiry form submitted:', formDataObj);
    
    
//     alert('Thank you for your inquiry! We will get back to you soon.');
    
//     inquiryForm.reset();
// }

// Handle brochure download
// function handleBrochureDownload() {
//     alert('Brochure download initiated. If the download doesn\'t start automatically, please contact us.');
// }

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize
    handleScroll();
    
    // Mobile menu
    hamburger.addEventListener('click', toggleMobileMenu);
    navLinks.forEach(link => link.addEventListener('click', smoothScroll));
    
    // Modal
    registerInterestBtn.addEventListener('click', openModal);
    projectOverviewRegisterBtn.addEventListener('click', openModal);
    downloadBrochureBtn.addEventListener('click', openModal);
    Reg3bhkBtn.addEventListener('click', openModal);
    Reg4bhkBtn.addEventListener('click',openModal);
    closeModal.addEventListener('click', closeModalFunction);
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModalFunction();
    });
    
    // Forms
    interestForm.addEventListener('submit', (e) => handleFormSubmission(e, 'interest-form'));
    inquiryForm.addEventListener('submit', (e) => handleFormSubmission(e, 'inquiry-form'));
    
    // Brochure download
    // downloadBrochureBtn.addEventListener('click', handleBrochureDownload);
    
    // Scroll events
    window.addEventListener('scroll', handleScroll);
    
    // Back to top functionality for the logo
    document.querySelector('.logo').addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Animation for cards on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const animateElements = document.querySelectorAll('.typology-card, .eoi-card, .highlights-image, .highlights-details');
    animateElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
    
    // Testimonial slider functionality
    // const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    // const prevBtn = document.querySelector('.prev-btn');
    // const nextBtn = document.querySelector('.next-btn');
    // let currentSlide = 0;
    
    // function showSlide(index) {
    //     testimonialSlides.forEach((slide, i) => {
    //         slide.style.display = i === index ? 'block' : 'none';
    //     });
    // }
    
    // function nextSlide() {
    //     currentSlide = (currentSlide + 1) % testimonialSlides.length;
    //     showSlide(currentSlide);
    // }
    
    // function prevSlide() {
    //     currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
    //     showSlide(currentSlide);
    // }
    
    // Initialize testimonial slider
    // if (testimonialSlides.length > 0) {
    //     showSlide(0);
    //     prevBtn.addEventListener('click', prevSlide);
    //     nextBtn.addEventListener('click', nextSlide);
        
    //     // Auto-advance slides every 5 seconds
    //     setInterval(nextSlide, 5000);
    // }
    
    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
            
            // Close all items first
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            // If the clicked item was not open, open it
            if (!isOpen) {
                item.classList.add('active');
            }
        });
    });
    
    // Initialize AOS (Animate On Scroll) if it's being used
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }
    
    // Gallery/property image functionality
    const propertyImages = document.querySelectorAll('.property-gallery img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    if (propertyImages.length > 0 && lightbox) {
        propertyImages.forEach(img => {
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightbox.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });
        
        lightboxClose.addEventListener('click', () => {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Form validation functions
    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };
    
    const validatePhone = (phone) => {
        const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        return re.test(String(phone));
    };
    
    // Add form validation if needed
    if (interestForm) {
        const emailInput = interestForm.querySelector('input[type="email"]');
        const phoneInput = interestForm.querySelector('input[type="tel"]');
        
        if (emailInput) {
            emailInput.addEventListener('blur', () => {
                if (emailInput.value && !validateEmail(emailInput.value)) {
                    emailInput.classList.add('invalid');
                } else {
                    emailInput.classList.remove('invalid');
                }
            });
        }
        
        if (phoneInput) {
            phoneInput.addEventListener('blur', () => {
                if (phoneInput.value && !validatePhone(phoneInput.value)) {
                    phoneInput.classList.add('invalid');
                } else {
                    phoneInput.classList.remove('invalid');
                }
            });
        }
    }
    
    // Same validation for inquiry form
    if (inquiryForm) {
        const emailInput = inquiryForm.querySelector('input[type="email"]');
        const phoneInput = inquiryForm.querySelector('input[type="tel"]');
        
        if (emailInput) {
            emailInput.addEventListener('blur', () => {
                if (emailInput.value && !validateEmail(emailInput.value)) {
                    emailInput.classList.add('invalid');
                } else {
                    emailInput.classList.remove('invalid');
                }
            });
        }
        
        if (phoneInput) {
            phoneInput.addEventListener('blur', () => {
                if (phoneInput.value && !validatePhone(phoneInput.value)) {
                    phoneInput.classList.add('invalid');
                } else {
                    phoneInput.classList.remove('invalid');
                }
            });
        }
    }
});