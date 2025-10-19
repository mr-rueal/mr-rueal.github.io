// Green Tea Portfolio - JavaScript Functionality

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeLoading();
    initializeNavigation();
    initializeScrollAnimations();
    initializeVideoLibrary();
    initializeContactForm();
    initializeScrollToTop();
    initializeParallax();
    initializeMobileMenu();
    initializeTypingAnimation();
});

// Loading Screen
function initializeLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Simulate loading time
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        
        // Remove loading screen from DOM after transition
        setTimeout(() => {
            if (loadingScreen) {
                loadingScreen.remove();
            }
        }, 500);
    }, 2000); // 2 seconds loading time
}

// Navigation Functionality
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active link
                updateActiveNavLink(link);
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavOnScroll);
}

// Update Active Navigation Link
function updateActiveNavLink(activeLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

// Update Active Nav on Scroll
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
            if (activeLink) {
                updateActiveNavLink(activeLink);
            }
        }
    });
}

// Mobile Menu
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Close menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
}

function closeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

// Scroll Animations
function initializeScrollAnimations() {
    // Create intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add animation classes and observe elements
    const animateElements = [
        { selector: '.section-title', animation: 'fade-in' },
        { selector: '.about-paragraph', animation: 'fade-in' },
        { selector: '.skill-item', animation: 'scale-in' },
        { selector: '.work-item', animation: 'fade-in' },
        { selector: '.video-card', animation: 'slide-in-left' },
        { selector: '.stat-item', animation: 'scale-in' },
        { selector: '.testimonial-item', animation: 'slide-in-right' },
        { selector: '.blog-post', animation: 'fade-in' },
        { selector: '.contact-item', animation: 'slide-in-left' },
        { selector: '.form', animation: 'slide-in-right' }
    ];
    
    animateElements.forEach(({ selector, animation }) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            el.classList.add(animation);
            el.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(el);
        });
    });
}

// Video Library Functionality
function initializeVideoLibrary() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const videoCards = document.querySelectorAll('.video-card');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter video cards
            filterVideos(category, videoCards);
        });
    });
    
    // Video card click handlers
    videoCards.forEach(card => {
        card.addEventListener('click', () => {
            // Simulate video play (replace with actual video functionality)
            showVideoModal(card);
        });
    });
}

// Filter Videos
function filterVideos(category, videoCards) {
    videoCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
            card.style.display = 'none';
        }
    });
}

// Show Video Modal (placeholder)
function showVideoModal(card) {
    const videoTitle = card.querySelector('h4').textContent;
    
    // Create a simple modal (replace with actual video player)
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${videoTitle}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="video-placeholder-large">
                    <i class="fas fa-play"></i>
                    <p>Video player would be embedded here</p>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: white;
        border-radius: 12px;
        max-width: 90%;
        max-height: 90%;
        width: 800px;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;
    
    const modalHeader = modal.querySelector('.modal-header');
    modalHeader.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid #eee;
    `;
    
    const modalBody = modal.querySelector('.modal-body');
    modalBody.style.cssText = `
        padding: 20px;
        text-align: center;
    `;
    
    const videoPlaceholder = modal.querySelector('.video-placeholder-large');
    videoPlaceholder.style.cssText = `
        height: 400px;
        background: linear-gradient(135deg, var(--tea-light) 0%, var(--tea-accent) 100%);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        color: white;
    `;
    
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #666;
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);
    
    // Close modal functionality
    const closeModal = () => {
        modal.style.opacity = '0';
        modalContent.style.transform = 'scale(0.8)';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    };
    
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close on escape key
    const escapeHandler = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
}

// Contact Form
function initializeContactForm() {
    const contactForm = document.querySelector('.form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
        
        // Add floating label effect
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
            
            // Check if input has value on load
            if (input.value) {
                input.parentElement.classList.add('focused');
            }
        });
    }
}

// Handle Form Submit
function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formObject = {};

    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    // Validate form data
    if (!formObject.name || !formObject.email || !formObject.message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
    submitBtn.disabled = true;

    // Save locally instead of to Firebase
    saveToLocalStorage(formObject, form, submitBtn, originalText);
}





// Save to local storage
function saveToLocalStorage(formObject, form, submitBtn, originalText) {
    try {
        console.log('Saving to localStorage...');

        const messages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
        const messageData = {
            ...formObject,
            name: formObject.name.trim(),
            email: formObject.email.trim().toLowerCase(),
            message: formObject.message.trim(),
            timestamp: new Date().toISOString(),
            id: Date.now().toString(),
            status: 'unread',
            source: 'portfolio_website',
            userAgent: navigator.userAgent,
            referrer: document.referrer || 'direct'
        };

        messages.push(messageData);
        localStorage.setItem('contact_messages', JSON.stringify(messages));

        console.log('✅ Message saved to localStorage:', messageData);
        updateFormStatus('✅ Message saved locally. Thank you!', 'success');
        showNotification('Message saved locally. Roshan will check it manually.', 'success');
        showSuccessMessage(form, submitBtn, originalText);

    } catch (error) {
        console.error('❌ Error saving to localStorage:', error);
        updateFormStatus('Error saving message. Please try again.', 'error');
        showNotification('Error saving message. Please try again.', 'error');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// Show success message and reset form
function showSuccessMessage(form, submitBtn, originalText) {
    updateFormStatus('✅ Success! Your message has been saved locally!', 'success');
    showNotification('Success! Your message has been saved locally and Roshan will receive it!', 'success');

    // Reset form
    form.reset();

    // Remove focused classes
    document.querySelectorAll('.form-group.focused').forEach(group => {
        group.classList.remove('focused');
    });

    // Reset button with success state
    submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Message Saved!';
    submitBtn.disabled = false;
    submitBtn.style.background = '#4CAF50';

    // Reset button text and style after delay
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        submitBtn.style.background = '';
        updateFormStatus('Ready to send your next message!', 'info');
    }, 4000);
}

// Update form status indicator
function updateFormStatus(message, type = 'info') {
    const statusElement = document.getElementById('form-status');
    if (!statusElement) return;
    
    const iconElement = statusElement.querySelector('i');
    const textElement = statusElement.querySelector('span');
    
    // Update text
    if (textElement) {
        textElement.innerHTML = message; // Use innerHTML to support emojis
    }
    
    // Update icon based on type
    if (iconElement) {
        iconElement.className = '';
        switch(type) {
            case 'success':
                iconElement.className = 'fas fa-check-circle';
                break;
            case 'error':
                iconElement.className = 'fas fa-exclamation-circle';
                break;
            case 'warning':
                iconElement.className = 'fas fa-exclamation-triangle';
                break;
            default:
                iconElement.className = 'fas fa-info-circle';
        }
    }
    
    // Update styling
    statusElement.className = `form-status ${type}`;
    
    // Add success animation
    if (type === 'success') {
        statusElement.style.animation = 'bounce 0.6s ease-in-out';
        setTimeout(() => {
            statusElement.style.animation = '';
        }, 600);
    }
}

// Show Notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    let backgroundColor;
    switch(type) {
        case 'success':
            backgroundColor = '#4CAF50';
            break;
        case 'error':
            backgroundColor = '#f44336';
            break;
        case 'warning':
            backgroundColor = '#ff9800';
            break;
        default:
            backgroundColor = 'var(--tea-primary)';
    }
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${backgroundColor};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
        font-size: 14px;
        line-height: 1.4;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Scroll to Top Button
function initializeScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Parallax Effect
function initializeParallax() {
    const parallaxElements = document.querySelectorAll('.floating-leaves .leaf');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((element, index) => {
            const rate = scrolled * -0.5 * (index + 1) * 0.1;
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Typing Animation for Hero
function initializeTypingAnimation() {
    const tagline = document.querySelector('.hero-tagline');
    
    if (tagline) {
        const text = tagline.textContent;
        tagline.textContent = '';
        tagline.style.borderRight = '2px solid var(--tea-accent)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    tagline.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        // Start typing animation after page load
        setTimeout(typeWriter, 3000);
    }
}

// Utility Functions

// Throttle function for performance
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounce function for performance
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Add performance optimizations
window.addEventListener('scroll', throttle(() => {
    // Your scroll event handlers here
}, 16)); // ~60fps

// Add smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Enable keyboard navigation for buttons and links
    if (e.key === 'Enter' || e.key === ' ') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('btn') || 
            focusedElement.classList.contains('nav-link') ||
            focusedElement.classList.contains('social-link')) {
            e.preventDefault();
            focusedElement.click();
        }
    }
});

// Add touch support for mobile
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // You could add error reporting here
});

console.log('🍃 Roshan Diyali Portfolio - Green Tea Theme Loaded Successfully!');
console.log('🌿 Explaining issues. Amplifying voices. Demanding justice.');
console.log('\n💾 Local Contact System Active!');
console.log('Messages will be saved to localStorage and checked manually by Roshan');





