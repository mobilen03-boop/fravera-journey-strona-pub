/**
 * FraVeRa Journey — Main Application Script
 */

(function() {
  'use strict';

  // ========================================
  // Mobile Menu - POPRAWIONY
  // ========================================
  function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (!menuBtn || !mobileMenu) {
      console.log('Menu elements not found - will retry when partial loads');
      return false;
    }
    
    if (menuBtn.dataset.initialized === 'true') {
      return true;
    }
    
    menuBtn.dataset.initialized = 'true';
    
    menuBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const isOpen = mobileMenu.classList.contains('open');
      
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });
    
    function openMenu() {
      mobileMenu.classList.add('open');
      menuBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      
      const svg = menuBtn.querySelector('svg');
      if (svg) {
        svg.innerHTML = `
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        `;
      }
    }
    
    function closeMenu() {
      mobileMenu.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      
      const svg = menuBtn.querySelector('svg');
      if (svg) {
        svg.innerHTML = `
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        `;
      }
    }
    
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });
    
    document.addEventListener('click', (e) => {
      if (mobileMenu.classList.contains('open') && 
          !mobileMenu.contains(e.target) && 
          !menuBtn.contains(e.target)) {
        closeMenu();
      }
    });
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        closeMenu();
      }
    });
    
    console.log('Mobile menu initialized successfully');
    return true;
  }

  // ========================================
  // FAQ Accordion
  // ========================================
  function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        
        faqItems.forEach(other => other.classList.remove('open'));
        
        item.classList.toggle('open', !isOpen);
      });
    });
  }

  // ========================================
  // Google Analytics (placeholder)
  // ========================================
  function initAnalytics() {
    console.log('Analytics initialized (placeholder)');
  }

  // ========================================
  // Form Validation
  // ========================================
  function initForms() {
    const forms = document.querySelectorAll('form[data-validate]');
    
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        let isValid = true;
        
        form.querySelectorAll('[required]').forEach(field => {
          if (!field.value.trim()) {
            isValid = false;
            showFieldError(field, 'This field is required');
          } else {
            clearFieldError(field);
          }
        });
        
        form.querySelectorAll('input[type="email"]').forEach(field => {
          if (field.value && !isValidEmail(field.value)) {
            isValid = false;
            showFieldError(field, 'Please enter a valid email address');
          }
        });
        
        form.querySelectorAll('input[type="tel"]').forEach(field => {
          if (field.value && !isValidPhone(field.value)) {
            isValid = false;
            showFieldError(field, 'Please enter a valid phone number');
          }
        });
        
        const consentCheck = form.querySelector('input[name="consent"]');
        if (consentCheck && !consentCheck.checked) {
          isValid = false;
          showToast('Please accept the privacy policy', 'error');
        }
        
        if (!isValid) {
          e.preventDefault();
        } else {
          form.classList.add('loading');
          const submitBtn = form.querySelector('button[type="submit"]');
          if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.dataset.originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
          }
        }
      });
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidPhone(phone) {
    return /^[\d\s\+\-\(\)]{8,}$/.test(phone);
  }

  function showFieldError(field, message) {
    clearFieldError(field);
    field.classList.add('error');
    const error = document.createElement('span');
    error.className = 'form-error';
    error.textContent = message;
    field.parentNode.appendChild(error);
  }

  function clearFieldError(field) {
    field.classList.remove('error');
    const error = field.parentNode.querySelector('.form-error');
    if (error) error.remove();
  }

  // ========================================
  // Toast Notifications
  // ========================================
  function showToast(message, type = 'info') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    requestAnimationFrame(() => toast.classList.add('show'));
    
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // ========================================
  // Smooth Scroll for Anchor Links
  // ========================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // ========================================
  // Lazy Loading Images
  // ========================================
  function initLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });
      
      document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  // ========================================
  // Header Scroll Effect
  // ========================================
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    }, { passive: true });
  }

  // ========================================
  // Service Paths Carousel (Mobile)
  // ========================================
  function initPathsCarousel() {
    const scrollContainer = document.querySelector('.paths-scroll');
    const dots = document.querySelectorAll('.paths-dots .dot');
    
    if (!scrollContainer || !dots.length) return;
    
    scrollContainer.addEventListener('scroll', () => {
      const scrollLeft = scrollContainer.scrollLeft;
      const cardWidth = scrollContainer.querySelector('.path-card-mobile').offsetWidth + 16;
      const activeIndex = Math.round(scrollLeft / cardWidth);
      
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
      });
    });
    
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        const cardWidth = scrollContainer.querySelector('.path-card-mobile').offsetWidth + 16;
        scrollContainer.scrollTo({
          left: cardWidth * index,
          behavior: 'smooth'
        });
      });
    });
  }

  // ========================================
  // PEARLS CAROUSEL - Breathing Animation
  // ========================================
  function initPearlsCarousel() {
    const carousel = document.getElementById('pearlsCarousel');
    if (!carousel) return;
    
    const slides = carousel.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    const progressBar = document.getElementById('pearlsProgressBar');
    
    if (!slides.length || !progressBar) return;
    
    let currentSlide = 0;
    const slideDuration = 6000;
    let progressInterval;
    let isPaused = false;
    
    function updateSlide() {
      slides.forEach((slide, index) => {
        slide.classList.remove('active');
        void slide.offsetWidth;
      });
      
      slides[currentSlide].classList.add('active');
      updateCounter();
    }
    
    function updateCounter() {
      const counters = carousel.querySelectorAll('.slide-counter');
      counters.forEach(counter => {
        counter.textContent = `${currentSlide + 1} / ${totalSlides}`;
      });
    }
    
    function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlide();
      resetProgress();
    }
    
    function prevSlide() {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateSlide();
      resetProgress();
    }
    
    function startProgress() {
      let progress = 0;
      const step = 100 / (slideDuration / 50);
      
      clearInterval(progressInterval);
      progressBar.style.width = '0%';
      
      progressInterval = setInterval(() => {
        if (!isPaused && document.visibilityState === 'visible') {
          progress += step;
          progressBar.style.width = progress + '%';
          
          if (progress >= 100) {
            nextSlide();
          }
        }
      }, 50);
    }
    
    function resetProgress() {
      clearInterval(progressInterval);
      progressBar.style.width = '0%';
      startProgress();
    }
    
    carousel.querySelectorAll('.nav-prev').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        prevSlide();
      });
    });
    
    carousel.querySelectorAll('.nav-next').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        nextSlide();
      });
    });
    
    carousel.addEventListener('mouseenter', () => {
      isPaused = true;
    });
    
    carousel.addEventListener('mouseleave', () => {
      isPaused = false;
    });
    
    document.addEventListener('keydown', (e) => {
      if (!carousel.matches(':hover')) return;
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
      }
    });
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      isPaused = true;
    }, { passive: true });
    
    carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      isPaused = false;
      
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    }, { passive: true });
    
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        isPaused = true;
      } else {
        isPaused = false;
      }
    });
    
    updateCounter();
    startProgress();
    
    console.log('Pearls carousel initialized');
  }

  // ========================================
  // Initialize Everything
  // ========================================
  function init() {
    console.log('FraVeRa App initializing...');
    
    // Inicjalizuj wszystko co nie zależy od partiali
    initFAQ();
    // initCookieConsent();
    initForms();
    initSmoothScroll();
    initLazyLoading();
    initHeaderScroll();
    initPathsCarousel();
    initPearlsCarousel(); // <-- KARUZELA PERŁY REGENERACJI
    
    // Spróbuj zainicjalizować menu (jeśli partial już jest)
    initMobileMenu();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Nasłuchuj na partialLoaded i reinicjalizuj menu
  document.addEventListener('partialLoaded', function(e) {
    console.log('Partial loaded:', e.detail);
    
    if (e.detail && e.detail.target === '#header-placeholder') {
      console.log('Header loaded, reinitializing mobile menu...');
      setTimeout(() => {
        initMobileMenu();
      }, 50);
    }
  });

  // Expose global utilities
  window.FraVeRa = {
    showToast,
    initAnalytics
  };

  /* ================================
   META PIXEL – GLOBAL CTA TRACKING
================================ */

document.addEventListener("click", function(e) {

  const cta = e.target.closest(".btn-primary");

  if (!cta) return;

  if (typeof fbq !== "undefined") {
    fbq("track", "Lead");
  }

});

/* ================================
   META PIXEL – FORM VIEW
================================ */

if (window.location.pathname.includes("journey-form")) {

  if (typeof fbq !== "undefined") {
    fbq("track", "ViewContent");
  }

}

})();