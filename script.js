// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });
});

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

// Observer les éléments à animer
document.querySelectorAll('.section-title, .section-subtitle, .service-card:not(:has(.coming-soon-badge)), .commitment, .portfolio-card, .testimonial-card, .option-card, .extra-card, .quote-options, .quote-extras, .quote-cta').forEach((el) => {
    observer.observe(el);
});

// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            console.log('Formulaire soumis');

            // Récupérer le bouton
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Récupérer les valeurs du formulaire
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            console.log('Données du formulaire:', { name, email, message });

            // Mettre à jour le bouton
            submitButton.textContent = 'Envoi en cours...';
            submitButton.disabled = true;

            // Préparer les paramètres pour la réception du message
            const messageParams = {
                from_name: name,
                from_email: email,
                message: message,
                to_email: "ugophong@gmail.com"  // Pour s'assurer que vous recevez le message
            };

            // Préparer les paramètres pour la confirmation
            const confirmationParams = {
                from_name: name,
                from_email: email,
                message: message,
                email: email  // Pour envoyer la confirmation à l'expéditeur
            };

            // D'abord envoyer le message à l'administrateur (vous)
            emailjs.send('service_zq3cxyk', 'template_gokpstk', messageParams)
                .then(function(response) {
                    console.log('Message reçu:', response);
                    // Puis envoyer la confirmation à l'utilisateur
                    return emailjs.send('service_zq3cxyk', 'template_zxrlkgc', confirmationParams);
                })
                .then(function(response) {
                    console.log('Confirmation envoyée:', response);
                    submitButton.textContent = 'Message envoyé !';
                    contactForm.reset();
                    setTimeout(() => {
                        submitButton.textContent = originalText;
                        submitButton.disabled = false;
                    }, 3000);
                })
                .catch(function(error) {
                    console.error('Erreur détaillée:', error);
                    submitButton.textContent = 'Erreur d\'envoi';
                    alert('Erreur lors de l\'envoi du message. Veuillez réessayer.');
                    setTimeout(() => {
                        submitButton.textContent = originalText;
                        submitButton.disabled = false;
                    }, 3000);
                });
        });
    } else {
        console.error('Le formulaire de contact n\'a pas été trouvé');
    }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'var(--white)';
        navbar.style.backdropFilter = 'none';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour vérifier si un élément est visible
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }

    // Fonction pour gérer le défilement
    function handleScroll() {
        const elements = document.querySelectorAll('.section-title, .section-subtitle, .service-card, .portfolio-card, .testimonial-card, .option-card, .extra-card');
        
        elements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('visible');
            }
        });
    }

    // Écouter l'événement de défilement
    window.addEventListener('scroll', handleScroll);

    // Vérifier les éléments au chargement initial
    handleScroll();
});

// Menu mobile
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu .nav-links a');

    // Toggle menu
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Fermer le menu quand on clique sur un lien
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // Fermer le menu quand on clique en dehors
    document.addEventListener('click', function(event) {
        if (!mobileMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
}); 