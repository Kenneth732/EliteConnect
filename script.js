
// Enhanced Mobile Menu Toggle
    document.addEventListener('DOMContentLoaded', function () {
      const mobileMenuBtn = document.getElementById('mobileMenuBtn');
      const mobileNav = document.getElementById('mobileNav');
      const body = document.body;
      let lastScroll = 0;
      const header = document.querySelector('header');

      // Mobile menu toggle
      mobileMenuBtn.addEventListener('click', function () {
        mobileNav.classList.toggle('active');
        this.classList.toggle('active');

        const icon = this.querySelector('i');
        if (mobileNav.classList.contains('active')) {
          icon.classList.replace('fa-bars', 'fa-times');
          body.style.overflow = 'hidden';
        } else {
          icon.classList.replace('fa-times', 'fa-bars');
          body.style.overflow = '';
        }
      });

      // Close mobile menu when clicking a link
      mobileNav.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') {
          this.classList.remove('active');
          mobileMenuBtn.classList.remove('active');
          mobileMenuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
          body.style.overflow = '';
        }
      });

      // Smooth scroll for anchor links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth'
            });
          }
        });
      });

      // Optimized scroll event handler
      let isScrolling;
      window.addEventListener('scroll', function () {
        window.clearTimeout(isScrolling);

        isScrolling = setTimeout(function () {
          const currentScroll = window.pageYOffset;

          if (currentScroll <= 0) {
            header.style.transform = 'translateY(0)';
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.25)';
            return;
          }

          if (currentScroll > lastScroll && !mobileNav.classList.contains('active')) {
            header.style.transform = 'translateY(-100%)';
          } else {
            header.style.transform = 'translateY(0)';
            header.style.boxShadow = '0 6px 30px rgba(0, 0, 0, 0.3)';
          }

          lastScroll = currentScroll;
        }, 66);
      }, { passive: true });
    });


// Carousel functionality
document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.querySelector('.elite-creators-carousel');
  const cards = document.querySelectorAll('.elite-creator-card');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const dotsContainer = document.querySelector('.carousel-dots');

  // Create dots
  cards.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      goToSlide(index);
    });
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.carousel-dot');

  let currentIndex = 0;
  const cardWidth = cards[0].offsetWidth + 32; // width + gap

  function updateCarousel() {
    carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });

    // Hide/show buttons based on position
    prevBtn.style.display = currentIndex === 0 ? 'none' : 'flex';
    nextBtn.style.display = currentIndex >= cards.length - 3 ? 'none' : 'flex';
  }

  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
  }

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentIndex < cards.length - 3) { currentIndex++; updateCarousel(); }
  }); // Handle touch events for mobile let
  touchStartX = 0; let touchEndX = 0; carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    if (touchEndX < touchStartX - 50 && currentIndex < cards.length - 3) { // Swipe left currentIndex++;
      updateCarousel();
    } if (touchEndX > touchStartX + 50 && currentIndex > 0) {
      // Swipe right
      currentIndex--;
      updateCarousel();
    }
  }

  // Initialize
  updateCarousel();

  // Responsive adjustments
  window.addEventListener('resize', () => {
    cardWidth = cards[0].offsetWidth + 32;
    updateCarousel();
  });
});

// Interactive Hero Section JavaScript
document.addEventListener('DOMContentLoaded', function () {
  // Animate stats counting up
  const statValues = document.querySelectorAll('.stat-value');

  const animateStats = () => {
    statValues.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-count'));
      const suffix = stat.textContent.includes('+') ? '+' : '';
      const duration = 2000;
      const start = 0;
      const increment = target / (duration / 16);

      let current = start;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          clearInterval(timer);
          current = target;
        }
        stat.textContent = Math.floor(current).toLocaleString() + suffix;
      }, 16);
    });
  };

  // Intersection Observer for animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(document.querySelector('.hero-stats'));

  // Mouse move parallax effect
  const hero = document.querySelector('.hero');
  const shapes = document.querySelectorAll('.shape');

  if (window.innerWidth > 768) {
    hero.addEventListener('mousemove', (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      shapes.forEach((shape, index) => {
        const speed = 0.05 + (index * 0.01);
        const xOffset = (x - 0.5) * 50 * speed;
        const yOffset = (y - 0.5) * 50 * speed;

        shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
      });
    });
  }

  // Button ripple effect
  const buttons = document.querySelectorAll('.btn-hero');

  buttons.forEach(button => {
    button.addEventListener('click', function (e) {
      const x = e.clientX - e.target.getBoundingClientRect().left;
      const y = e.clientY - e.target.getBoundingClientRect().top;

      const ripple = document.createElement('span');
      ripple.classList.add('ripple-effect');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 1000);
    });
  });

  // Add ripple effect styles dynamically
  const style = document.createElement('style');
  style.textContent = `
    .ripple-effect {
      position: absolute;
      transform: translate(-50%, -50%);
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      animation: ripple 0.8s ease-out;
      pointer-events: none;
    }
    
    @keyframes ripple {
      0% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
      }
      100% {
        transform: translate(-50%, -50%) scale(20);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // Profile card hover tilt effect
  const profileCards = document.querySelectorAll('.profile-card');

  profileCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const x = e.clientX - card.getBoundingClientRect().left;
      const y = e.clientY - card.getBoundingClientRect().top;

      const centerX = card.offsetWidth / 2;
      const centerY = card.offsetHeight / 2;

      const angleX = (y - centerY) / 10;
      const angleY = (centerX - x) / 10;

      card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  });

  // Scroll indicator click handler
  const scrollIndicator = document.querySelector('.scroll-indicator');

  scrollIndicator.addEventListener('click', () => {
    window.scrollBy({
      top: window.innerHeight - 100,
      behavior: 'smooth'
    });
  });

  // Dynamic background intensity based on scroll
  let lastScrollPosition = 0;
  const gradientOverlay = document.querySelector('.gradient-overlay');

  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const intensity = Math.min(0.3 + (scrollPosition * 0.0005), 0.8);

    if (Math.abs(scrollPosition - lastScrollPosition) > 10) {
      gradientOverlay.style.opacity = intensity;
      lastScrollPosition = scrollPosition;
    }
  });

  // Pulse elements animation on view
  const pulseObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        pulseObserver.unobserve(entry.target);
      }
    });
  });

  document.querySelectorAll('.pulse').forEach(pulse => {
    pulse.style.animationPlayState = 'paused';
    pulseObserver.observe(pulse);
  });

  // Initialize GSAP animations if available
  if (typeof gsap !== 'undefined') {
    gsap.from('.hero-title .title-line', {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out'
    });

    gsap.from('.hero-subtitle', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.4,
      ease: 'power2.out'
    });

    gsap.from('.hero-buttons', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.6,
      ease: 'power2.out'
    });

    gsap.from('.hero-featured', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.8,
      ease: 'power2.out'
    });

    gsap.from('.hero-stats', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 1,
      ease: 'power2.out'
    });

    gsap.from('.scroll-indicator', {
      opacity: 0,
      duration: 1,
      delay: 1.2,
      ease: 'power2.out'
    });
  }
});
// Feature Cards and Pricing Cards Animation and Interaction


document.addEventListener('DOMContentLoaded', function() {
  // Feature Cards Animation and Interaction
  const featureCards = document.querySelectorAll('.feature-card');
  
  // Animate feature cards on scroll
  const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        gsap.to(entry.target, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          delay: index * 0.1
        });
        featureObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  featureCards.forEach(card => {
    gsap.set(card, { opacity: 0, y: 30 });
    featureObserver.observe(card);
    
    // Add tilt effect on mouse move
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const angleX = (y - centerY) / 20;
      const angleY = (centerX - x) / 20;
      
      gsap.to(card, {
        rotationX: angleX,
        rotationY: angleY,
        transformPerspective: 1000,
        transformOrigin: "center center",
        duration: 0.5,
        ease: 'power2.out'
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)'
      });
    });
  });

  // Pricing Cards Functionality
  const pricingCards = document.querySelectorAll('.pricing-card');
  const popularCard = document.querySelector('.pricing-card.popular');
  
  // Highlight popular card with pulse animation
  if (popularCard) {
    setInterval(() => {
      gsap.to(popularCard, {
        boxShadow: '0 0 20px rgba(255, 215, 0, 0.6)',
        duration: 1.5,
        yoyo: true,
        repeat: 1,
        ease: 'power1.inOut'
      });
    }, 8000);
  }
  
  // Pricing card hover effects
  pricingCards.forEach(card => {
    // Initial animation setup
    gsap.set(card, { opacity: 0, y: 40 });
    gsap.to(card, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.2,
      ease: 'back.out(1.7)'
    });
    
    // Glow effect on hover
    card.addEventListener('mouseenter', () => {
      const btnClass = card.querySelector('.btn').classList;
      let glowColor;
      
      if (btnClass.contains('btn-premium')) {
        glowColor = 'rgba(255, 215, 0, 0.3)';
      } else if (btnClass.contains('btn-primary')) {
        glowColor = 'rgba(255, 45, 85, 0.3)';
      } else {
        glowColor = 'rgba(0, 204, 255, 0.3)';
      }
      
      gsap.to(card, {
        boxShadow: `0 0 30px ${glowColor}`,
        duration: 0.3
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
        duration: 0.3
      });
    });
    
    // Click effect
    card.addEventListener('click', function(e) {
      if (e.target.tagName !== 'BUTTON') {
        const btn = this.querySelector('.btn');
        btn.classList.add('btn-clicked');
        
        // Ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        btn.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
          ripple.remove();
          btn.classList.remove('btn-clicked');
        }, 600);
      }
    });
  });

  // Plan Selection Functionality
  const planButtons = document.querySelectorAll('.pricing-card .btn');
  
  planButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation();
      
      // Visual feedback
      gsap.to(this, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
      });
      
      // Get plan details
      const plan = this.closest('.pricing-card').querySelector('h3').textContent;
      const price = this.closest('.pricing-card').querySelector('.price-amount').textContent;
      
      // Show modal or proceed to checkout
      showPlanModal(plan, price);
    });
  });

  // Feature Comparison Tooltip
  const pricingFeatures = document.querySelectorAll('.pricing-features li');
  
  pricingFeatures.forEach(feature => {
    feature.addEventListener('mouseenter', function() {
      const tooltip = document.createElement('div');
      tooltip.className = 'feature-tooltip';
      tooltip.textContent = this.textContent;
      
      document.body.appendChild(tooltip);
      
      gsap.set(tooltip, {
        opacity: 0,
        y: 10
      });
      
      gsap.to(tooltip, {
        opacity: 1,
        y: 0,
        duration: 0.2
      });
      
      positionTooltip(tooltip, this);
    });
    
    feature.addEventListener('mouseleave', function() {
      const tooltip = document.querySelector('.feature-tooltip');
      if (tooltip) {
        gsap.to(tooltip, {
          opacity: 0,
          y: -10,
          duration: 0.2,
          onComplete: () => tooltip.remove()
        });
      }
    });
    
    feature.addEventListener('mousemove', function() {
      const tooltip = document.querySelector('.feature-tooltip');
      if (tooltip) positionTooltip(tooltip, this);
    });
  });

  // Helper function to position tooltip
  function positionTooltip(tooltip, element) {
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    gsap.set(tooltip, {
      x: rect.left + rect.width / 2,
      y: rect.top + scrollTop - 40,
      xPercent: -50
    });
  }

  // Plan Selection Modal
  function showPlanModal(plan, price) {
    const modalHTML = `
      <div class="plan-modal">
        <div class="modal-content">
          <span class="close-modal">&times;</span>
          <h3>Join ${plan}</h3>
          <p>You've selected the ${plan} plan at ${price}</p>
          
          <div class="payment-options">
            <div class="payment-method active" data-method="mpesa">
              <i class="fas fa-mobile-alt"></i>
              <span>M-Pesa</span>
            </div>
            <div class="payment-method" data-method="card">
              <i class="fas fa-credit-card"></i>
              <span>Credit Card</span>
            </div>
            <div class="payment-method" data-method="bank">
              <i class="fas fa-university"></i>
              <span>Bank Transfer</span>
            </div>
          </div>
          
          <div class="payment-details">
            <div class="payment-form mpesa-form">
              <p>You will receive an M-Pesa push notification to complete payment</p>
              <button class="btn btn-primary">Proceed with M-Pesa</button>
            </div>
            
            <div class="payment-form card-form" style="display: none;">
              <div class="form-group">
                <label>Card Number</label>
                <input type="text" placeholder="1234 5678 9012 3456">
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Expiry Date</label>
                  <input type="text" placeholder="MM/YY">
                </div>
                <div class="form-group">
                  <label>CVV</label>
                  <input type="text" placeholder="123">
                </div>
              </div>
              <button class="btn btn-primary">Pay with Card</button>
            </div>
            
            <div class="payment-form bank-form" style="display: none;">
              <p>Make payment to:</p>
              <div class="bank-details">
                <p><strong>Bank:</strong> EliteConnect Payments</p>
                <p><strong>Account:</strong> 1234567890</p>
                <p><strong>Branch:</strong> Nairobi CBD</p>
                <p><strong>Code:</strong> 123</p>
              </div>
              <button class="btn btn-primary">I've Made Payment</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.querySelector('.plan-modal');
    const closeBtn = document.querySelector('.close-modal');
    const paymentMethods = document.querySelectorAll('.payment-method');
    const paymentForms = document.querySelectorAll('.payment-form');
    
    // Show modal with animation
    gsap.set(modal, { opacity: 0 });
    gsap.to(modal, {
      opacity: 1,
      duration: 0.3
    });
    
    // Close modal
    closeBtn.addEventListener('click', () => {
      gsap.to(modal, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => modal.remove()
      });
    });
    
    // Payment method selection
    paymentMethods.forEach(method => {
      method.addEventListener('click', function() {
        const methodType = this.getAttribute('data-method');
        
        // Update active state
        paymentMethods.forEach(m => m.classList.remove('active'));
        this.classList.add('active');
        
        // Show corresponding form
        paymentForms.forEach(form => form.style.display = 'none');
        document.querySelector(`.${methodType}-form`).style.display = 'block';
      });
    });
    
    // Close when clicking outside
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        gsap.to(modal, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => modal.remove()
        });
      }
    });
  }

  // Add dynamic styles
  const dynamicStyles = document.createElement('style');
  dynamicStyles.textContent = `
    /* Feature Cards */
    .feature-card {
      perspective: 1000px;
      transform-style: preserve-3d;
    }
    
    /* Pricing Cards */
    .pricing-card {
      perspective: 1000px;
      transform-style: preserve-3d;
      cursor: pointer;
    }
    
    .pricing-card .btn {
      position: relative;
      overflow: hidden;
    }
    
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    }
    
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    
    /* Modal Styles */
    .plan-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
    
    .modal-content {
      background: var(--dark);
      padding: 2rem;
      border-radius: 10px;
      max-width: 500px;
      width: 90%;
      position: relative;
    }
    
    .close-modal {
      position: absolute;
      top: 15px;
      right: 15px;
      font-size: 1.5rem;
      cursor: pointer;
    }
    
    .payment-options {
      display: flex;
      justify-content: space-between;
      margin: 1.5rem 0;
    }
    
    .payment-method {
      padding: 1rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 5px;
      text-align: center;
      flex: 1;
      margin: 0 5px;
      cursor: pointer;
      transition: all 0.3s;
    }
    
    .payment-method.active {
      border-color: var(--primary);
      background: rgba(255, 45, 85, 0.1);
    }
    
    .payment-method i {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
      display: block;
    }
    
    .payment-details {
      margin-top: 1.5rem;
    }
    
    .form-group {
      margin-bottom: 1rem;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      opacity: 0.8;
    }
    
    .form-group input {
      width: 100%;
      padding: 0.8rem;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 5px;
      color: white;
    }
    
    .form-row {
      display: flex;
      gap: 1rem;
    }
    
    .form-row .form-group {
      flex: 1;
    }
    
    .bank-details {
      background: rgba(255, 255, 255, 0.05);
      padding: 1rem;
      border-radius: 5px;
      margin-bottom: 1.5rem;
    }
    
    /* Tooltip */
    .feature-tooltip {
      position: absolute;
      background: var(--gray);
      padding: 0.5rem 1rem;
      border-radius: 5px;
      font-size: 0.9rem;
      pointer-events: none;
      z-index: 100;
      white-space: nowrap;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }
    
    .feature-tooltip:after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 50%;
      transform: translateX(-50%);
      border-width: 5px 5px 0;
      border-style: solid;
      border-color: var(--gray) transparent transparent;
    }
  `;
  document.head.appendChild(dynamicStyles);
});

