// script.js - Mr Sagari Portfolio Interactivity

// Typing Animation Text
const typingTexts = [
  'Full Stack Developer',
  'AI Builder',
  'Future Engineer'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

// DOM Elements
const typingElement = document.querySelector('.typing-text');
const cursorElement = document.querySelector('.typing-cursor');
const navbar = document.querySelector('.navbar');
const navMenu = document.querySelector('.nav-menu');
const hamburger = document.querySelector('.hamburger');
const progressBar = document.getElementById('progress-bar');
const cursor = document.getElementById('cursor');
const scrollTopBtn = document.getElementById('scrollTop');
const yearSpan = document.getElementById('year');
const contactForm = document.getElementById('contactForm');
const progressBars = document.querySelectorAll('.progress');
const sections = document.querySelectorAll('.section, .hero, .navbar');

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  hamburger.classList.toggle('active');
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
  // Navbar scroll
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Scroll Progress
  const progress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  progressBar.style.width = progress + '%';

  // Scroll Top Button
  if (window.scrollY > 500) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }

  // Active Nav Link
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// Smooth Scroll for Nav Links
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
    navMenu.classList.remove('active');
  });
});

// Typing Animation
function typeWriter() {
  const currentText = typingTexts[textIndex];

  if (isDeleting) {
    typingElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 50 : 150;

  if (!isDeleting && charIndex === currentText.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % typingTexts.length;
    typeSpeed = 500;
  }

  setTimeout(typeWriter, typeSpeed);
}

// Cursor Animation
document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  
  // Trail effect
  const trail = document.getElementById('cursor-trail');
  trail.style.left = e.clientX + 10 + 'px';
  trail.style.top = e.clientY + 10 + 'px';
});

// Cursor hover effects
document.querySelectorAll('a, button, .project-card, .skill').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(2)';
    cursor.style.background = 'var(--neon-purple)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    cursor.style.background = 'var(--neon-blue)';
  });
});

// Particles Background
window.addEventListener('load', () => {
  tsParticles.load('particles-js', {
    preset: 'stars',
    particles: {
      number: { value: 80 },
      color: { value: ['#00d4ff', '#7c3aed', '#ff00ff'] },
      shape: { type: 'circle' },
      opacity: { value: 0.5, random: true },
      size: { value: 2, random: true },
      move: {
        enable: true,
        speed: 1,
        direction: 'none',
        random: true,
        straight: false,
        outModes: 'out'
      }
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'repulse' },
        onClick: { enable: true, mode: 'push' }
      },
      modes: {
        repulse: { distance: 100, duration: 0.4 },
        push: { quantity: 4 }
      }
    },
    retina_detect: true
  });
});

// Scroll Animations with Intersection Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // Animate progress bars
      if (entry.target.querySelector('.progress')) {
        const progress = entry.target.querySelector('.progress');
        const width = progress.getAttribute('data-width');
        setTimeout(() => {
          progress.style.width = width + '%';
        }, 500);
      }
    }
  });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.section, .project-card, .skill, .hire-item, .mindset-item, .tech-item').forEach(el => {
  el.classList.add('animate');
  observer.observe(el);
});

// Scroll to Top
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Dynamic Year
yearSpan.textContent = new Date().getFullYear();

// Contact Form
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // Simple form handling (production would send to server)
  alert('Thank you! Your message has been sent. I\'ll get back to you soon 🚀');
  contactForm.reset();
});

// Initialize Typing
document.addEventListener('DOMContentLoaded', () => {
  typeWriter();
});

// Window Load - Final touches
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s';
  document.body.style.opacity = '1';
});

// Prevent overscroll
window.addEventListener('wheel', (e) => {
  if (window.scrollY === 0 && e.deltaY < 0) {
    e.preventDefault();
  }
}, { passive: false });

