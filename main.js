// SCROLL REVEAL 
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => {
    revealObserver.observe(el);
});

//  HEADER SCROLL SHADOW 
const header = document.getElementById('site-header');
if (header) {
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
}

//  HAMBURGER MENU
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.toggle('open');
        mobileNav.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen);
        mobileNav.setAttribute('aria-hidden', !isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    document.querySelectorAll('.mobile-link').forEach((link) => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            mobileNav.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
            mobileNav.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        });
    });
}

// ACTIVE NAV HIGHLIGHT 
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

if (sections.length && navLinks.length) {
    const navObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach((link) => {
                        link.classList.toggle(
                            'active',
                            link.getAttribute('href') === `#${id}`
                        );
                    });
                }
            });
        },
        { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((sec) => navObserver.observe(sec));
}

// SLOW-MO Close image
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const galleryImages = document.querySelectorAll('.gallery-img-box img');

if (lightbox) {
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            // 1. Show the flex container first
            lightbox.style.display = 'flex';
            
            // 2. Use a timeout so the browser register the display change 
            setTimeout(() => {
                lightbox.classList.add('open');
                lightboxImg.src = img.src;
                document.body.style.overflow = 'hidden';
            }, 10);
        });
    });

    const closeLightbox = () => {
        // 1. Remove the open class to trigger the 0.8s CSS transition
        lightbox.classList.remove('open');
        document.body.style.overflow = 'auto';

        // 2. CSS transition (800ms) to finish before hiding the div
        setTimeout(() => {
            if (!lightbox.classList.contains('open')) {
                lightbox.style.display = 'none';
            }
        }, 800); // This matches the 0.8s in your CSS
    };

    lightbox.addEventListener('click', closeLightbox);
}
