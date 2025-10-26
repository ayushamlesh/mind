// Atmaniti Website - Complete JavaScript with Landing Page Fix

// App State (In-Memory)
const appState = {
    currentPage: 'landing',
    isLoggedIn: false,
    user: null,
    navVisible: false,
    currentTestimonial: 0,
    retreats: [
        {
            id: 1,
            name: "Himalayan Awakening",
            location: "Rishikesh, Uttarakhand",
            duration: "7 Days",
            type: "wellness",
            price: "₹45,000",
            tagline: "Transform in the foothills of the Himalayas",
            description: "A transformative 7-day journey in the spiritual heart of India. Experience yoga, meditation, Ayurveda treatments, and nature excursions in the serene Himalayan foothills.",
            inclusions: ["Luxury Accommodation", "All Meals", "Daily Yoga", "Meditation Sessions", "Ayurveda Treatments", "Nature Excursions", "Sound Healing"],
            dates: ["Dec 15-22, 2025", "Jan 10-17, 2026", "Feb 5-12, 2026"]
        },
        {
            id: 2,
            name: "Executive Mastery Retreat",
            location: "Kerala Backwaters",
            duration: "5 Days",
            type: "leadership",
            price: "₹65,000",
            tagline: "Strategic thinking meets self-mastery",
            description: "Exclusive 5-day retreat for executives blending leadership development with wellness practices in Kerala's serene backwaters. Designed for C-suite professionals.",
            inclusions: ["Premium Accommodation", "Gourmet Meals", "Leadership Workshops", "Mindfulness Training", "Personal Coaching", "Strategic Planning Sessions"],
            dates: ["Jan 20-25, 2026", "Mar 10-15, 2026"]
        },
        {
            id: 3,
            name: "Sacred Silence",
            location: "Goa",
            duration: "3 Days",
            type: "meditation",
            price: "₹28,000",
            tagline: "Deep meditation and inner exploration",
            description: "An intensive 3-day silent meditation retreat on Goa's peaceful beaches. Dive deep into your inner world through guided meditation, breathwork, and contemplative practices.",
            inclusions: ["Beachfront Stay", "Vegetarian Meals", "Silent Meditation", "Breathwork", "Sound Healing", "Yoga Nidra"],
            dates: ["Dec 5-8, 2025", "Feb 15-18, 2026", "Apr 1-4, 2026"]
        }
    ]
};

// Initialize app on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set body class for landing
    document.body.classList.add('on-landing');

    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
        // Start on landing page - navbar hidden
        navigateTo('landing');
    }, 1500);

    // Auto-rotate testimonials
    setInterval(() => {
        appState.currentTestimonial = (appState.currentTestimonial + 1) % 3;
        showTestimonial(appState.currentTestimonial);
    }, 5000);

    // Password strength indicator
    const passwordInput = document.getElementById('regPassword');
    if (passwordInput) {
        passwordInput.addEventListener('input', updatePasswordStrength);
    }
});

// Navigation Functions
function navigateTo(page) {
    // Hide all pages
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show target page
    const targetPage = document.getElementById(page + 'Page');
    if (targetPage) {
        targetPage.classList.add('active');
        appState.currentPage = page;
    }

    // Manage body class based on page
    if (page === 'landing') {
        document.body.classList.add('on-landing');
        document.body.classList.remove('landing-complete');
    } else {
        document.body.classList.remove('on-landing');
        document.body.classList.add('landing-complete');
    }

    // Update active nav link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
    });

    // Scroll to top
    window.scrollTo({top: 0, behavior: 'smooth'});

    // Close mobile menu if open
    const navMenu = document.getElementById('navMenu');
    if (navMenu) {
        navMenu.classList.remove('active');
    }
}

function revealNavAndNavigate(page) {
    // Remove landing body class
    document.body.classList.remove('on-landing');
    document.body.classList.add('landing-complete');

    // Show navigation
    const navbar = document.getElementById('navbar');
    navbar.classList.add('visible');
    appState.navVisible = true;

    // Navigate to home
    setTimeout(() => {
        navigateTo(page);
    }, 300);
}

function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.getElementById('hamburger');
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Testimonial Functions
function showTestimonial(index) {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dots .dot');

    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

// Service Booking Functions
function bookService(serviceName) {
    if (!appState.isLoggedIn) {
        showToast('Please login to book services');
        setTimeout(() => navigateTo('login'), 1500);
    } else {
        showToast(`Booking ${serviceName}... Feature coming soon!`);
    }
}

function selectPlan(planName) {
    if (!appState.isLoggedIn) {
        showToast('Please login to select a plan');
        setTimeout(() => navigateTo('login'), 1500);
    } else {
        showToast(`${planName} plan selected! Proceeding to checkout...`);
    }
}

// Organization Functions
function showOrgDetails(serviceName) {
    alert(`${serviceName}\n\nWe'll create customized programs based on your organization's needs. Please contact us or schedule a consultation to discuss details.`);
}

// Retreat Functions
function filterRetreats(type) {
    const cards = document.querySelectorAll('.retreat-card');
    const buttons = document.querySelectorAll('.filter-btn');

    // Update active button
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Filter cards
    cards.forEach(card => {
        if (type === 'all' || card.dataset.type === type) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function showRetreatDetails(retreatId) {
    const retreat = appState.retreats.find(r => r.id === retreatId);
    if (!retreat) return;

    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <h2>${retreat.name}</h2>
        <div class="retreat-image gradient-${retreatId}" style="height: 200px; border-radius: 15px; margin: 1rem 0;"></div>
        <p><strong>Location:</strong> ${retreat.location}</p>
        <p><strong>Duration:</strong> ${retreat.duration}</p>
        <p><strong>Price:</strong> ${retreat.price}</p>
        <p style="margin: 1rem 0;">${retreat.description}</p>
        <h3>What's Included:</h3>
        <ul style="text-align: left; margin: 1rem 0;">
            ${retreat.inclusions.map(item => `<li>${item}</li>`).join('')}
        </ul>
        <h3>Available Dates:</h3>
        <ul style="text-align: left; margin: 1rem 0;">
            ${retreat.dates.map(date => `<li>${date}</li>`).join('')}
        </ul>
        <button class="cta-button full-width" onclick="bookRetreat(${retreatId})">Book This Retreat</button>
    `;

    document.getElementById('retreatModal').style.display = 'block';
}

function bookRetreat(retreatId) {
    closeModal();
    if (!appState.isLoggedIn) {
        showToast('Please login to book retreats');
        setTimeout(() => navigateTo('login'), 1500);
    } else {
        showToast('Booking initiated! Redirecting to payment...');
    }
}

function closeModal() {
    document.getElementById('retreatModal').style.display = 'none';
}

// Click outside modal to close
window.onclick = function(event) {
    const modal = document.getElementById('retreatModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Contact Form
function handleContactSubmit(event) {
    event.preventDefault();
    showToast('Message sent successfully! We\'ll get back to you soon.');
    event.target.reset();
}

// Authentication Functions
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Simple validation (in real app, this would be server-side)
    if (email && password) {
        appState.isLoggedIn = true;
        appState.user = {
            name: email.split('@')[0],
            email: email
        };

        // Update UI
        updateAuthUI();

        // Show success and redirect
        showToast('Login successful! Welcome back.');
        setTimeout(() => navigateTo('dashboard'), 1500);
    } else {
        showToast('Please enter valid credentials');
    }
}

function handleRegister(event) {
    event.preventDefault();
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;

    // Validation
    if (password !== confirmPassword) {
        showToast('Passwords do not match!');
        return;
    }

    if (password.length < 6) {
        showToast('Password must be at least 6 characters');
        return;
    }

    // Create user
    appState.isLoggedIn = true;
    appState.user = {
        name: name,
        email: email
    };

    // Update UI
    updateAuthUI();

    // Show success and redirect
    showToast('Account created successfully! Welcome to Atmaniti.');
    setTimeout(() => navigateTo('dashboard'), 1500);
}

function logout() {
    appState.isLoggedIn = false;
    appState.user = null;
    updateAuthUI();
    showToast('Logged out successfully');
    navigateTo('home');
}

function updateAuthUI() {
    const authLinks = document.getElementById('authLinks');
    const userSection = document.getElementById('userSection');
    const dashboardUserName = document.getElementById('dashboardUserName');

    if (appState.isLoggedIn) {
        authLinks.classList.add('hidden');
        userSection.classList.remove('hidden');
        document.getElementById('userName').textContent = appState.user.name;
        if (dashboardUserName) {
            dashboardUserName.textContent = appState.user.name;
        }
    } else {
        authLinks.classList.remove('hidden');
        userSection.classList.add('hidden');
    }
}

// Password Strength Indicator
function updatePasswordStrength() {
    const password = document.getElementById('regPassword').value;
    const strengthBar = document.getElementById('passwordStrength');

    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const colors = ['#FF6B6B', '#FFE66D', '#A8E6CF', '#4ECDC4'];
    const widths = ['20%', '40%', '60%', '80%', '100%'];

    strengthBar.style.width = widths[strength] || '0%';
    strengthBar.style.background = colors[strength - 1] || '#FF6B6B';
}

// Toast Notification
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.display = 'block';

    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

// Utility Functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(amount);
}

console.log('Atmaniti Website Loaded Successfully! 🪷');
console.log('Landing page: Menu hidden, full-screen, no scroll');
console.log('Current State:', appState);
