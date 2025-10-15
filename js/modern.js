/* DataTribe Collective - Optimized JavaScript */

// Performance monitoring
const perfStart = performance.now();

// Core functionality
class DataTribeApp {
  constructor() {
    this.init();
  }

  init() {
    this.initNavigation();
    this.initForms();
    this.initAccessibility();
    this.initPerformance();
    this.logPerformance();
  }

  // Navigation
  initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
      });
    }

    // Direct scroll for anchor links (no smooth scrolling to prevent flashing)
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
          const targetPosition = targetElement.offsetTop - headerHeight - 20;
          
          // Use requestAnimationFrame for smooth rendering without CSS transitions
          requestAnimationFrame(() => {
            window.scrollTo({
              top: targetPosition,
              behavior: 'auto'
            });
          });
        }
      });
    });
  }

  // Form handling with error management
  initForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn?.textContent;
        
        try {
          // Show loading state
          if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';
          }

          // Simulate form submission (replace with actual API call)
          await this.submitForm(form);
          
          // Show success
          this.showNotification('Form submitted successfully!', 'success');
          form.reset();
          
        } catch (error) {
          console.error('Form submission error:', error);
          this.showNotification('Error submitting form. Please try again.', 'error');
        } finally {
          // Reset button
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
          }
        }
      });
    });
  }

  // Accessibility enhancements
  initAccessibility() {
    // Skip links
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Focus management
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });

    // ARIA live region for announcements
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    document.body.appendChild(liveRegion);
  }

  // Performance optimizations
  initPerformance() {
    // Lazy load images
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }

    // Preload critical resources
    this.preloadCriticalResources();
  }

  // Form submission (placeholder for API integration)
  async submitForm(form) {
    try {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      
      // Clear previous errors
      this.clearFormErrors(form);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validate required fields
      const requiredFields = form.querySelectorAll('[required]');
      let hasErrors = false;
      
      for (const field of requiredFields) {
        if (!field.value.trim()) {
          this.showFieldError(field, `${field.name || field.placeholder || 'This field'} is required`);
          hasErrors = true;
        }
      }
      
      // Email validation
      const emailFields = form.querySelectorAll('input[type="email"]');
      for (const field of emailFields) {
        if (field.value && !this.isValidEmail(field.value)) {
          this.showFieldError(field, 'Please enter a valid email address');
          hasErrors = true;
        }
      }
      
      if (hasErrors) {
        throw new Error('Please fix the form errors');
      }
      
      console.log('Form data:', data);
      return data;
    } catch (error) {
      console.error('Form submission error:', error);
      throw error;
    }
  }

  // Email validation
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Show field error
  showFieldError(field, message) {
    field.classList.add('error');
    field.setAttribute('aria-invalid', 'true');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
      existingError.remove();
    }
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.setAttribute('role', 'alert');
    errorDiv.style.cssText = 'color: var(--error); font-size: var(--text-sm); margin-top: var(--space-1);';
    
    field.parentNode.insertBefore(errorDiv, field.nextSibling);
  }

  // Clear form errors
  clearFormErrors(form) {
    const errorFields = form.querySelectorAll('.error');
    errorFields.forEach(field => {
      field.classList.remove('error');
      field.removeAttribute('aria-invalid');
    });
    
    const errorMessages = form.querySelectorAll('.field-error');
    errorMessages.forEach(msg => msg.remove());
  }

  // Notification system
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'assertive');
    
    // Styles
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '12px 16px',
      borderRadius: '8px',
      color: 'white',
      fontWeight: '500',
      zIndex: '1000',
      maxWidth: '300px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      transform: 'translateX(100%)',
      transition: 'transform 0.3s ease'
    });

    // Type-specific styling
    const colors = {
      success: '#10b981',
      error: '#ef4444',
      info: '#3b82f6',
      warning: '#f59e0b'
    };
    notification.style.backgroundColor = colors[type] || colors.info;

    document.body.appendChild(notification);

    // Animate in
    requestAnimationFrame(() => {
      notification.style.transform = 'translateX(0)';
    });

    // Auto remove
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 5000);
  }

  // Preload critical resources
  preloadCriticalResources() {
    try {
      const criticalResources = [
        '/css/modern.css',
        '/js/modern.js'
      ];

      criticalResources.forEach(resource => {
        try {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.href = resource;
          link.as = resource.endsWith('.css') ? 'style' : 'script';
          document.head.appendChild(link);
        } catch (error) {
          console.warn('Failed to preload resource:', resource, error);
        }
      });
    } catch (error) {
      console.error('Error preloading critical resources:', error);
    }
  }

  // Performance logging
  logPerformance() {
    const perfEnd = performance.now();
    const loadTime = perfEnd - perfStart;
    
    console.log(`DataTribe App initialized in ${loadTime.toFixed(2)}ms`);
    
    // Log Core Web Vitals if available
    if ('web-vital' in window) {
      // This would be implemented with web-vitals library
      console.log('Core Web Vitals monitoring enabled');
    }
  }
}

// Utility functions
const utils = {
  // Debounce function
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function
  throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Check if element is in viewport
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
};

// Error handling
window.addEventListener('error', (event) => {
  console.error('JavaScript error:', event.error);
  // In production, send to error tracking service
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  // In production, send to error tracking service
});

// Modal Functions - Integrated with DataTribeApp
function openJoinForm() {
    const modal = document.getElementById('joinModal');
    if (modal) {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        
        // Focus on first input
        const firstInput = modal.querySelector('input');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }
}

function closeJoinForm() {
    const modal = document.getElementById('joinModal');
    if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
}

// Handle form submission
function handleJoinForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Collect form data
    const userData = {
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        userType: formData.get('userType'),
        experience: formData.get('experience'),
        interests: formData.getAll('interests'),
        goals: formData.get('goals'),
        newsletter: formData.get('newsletter') === 'yes'
    };
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Joining...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Store user data (in real app, send to server)
        localStorage.setItem('userData', JSON.stringify(userData));
        
        // Route based on user type
        let redirectUrl = '';
        let successMessage = '';
        
        switch(userData.userType) {
            case 'community-member':
                successMessage = 'Welcome to DataTribe Collective! Redirecting to Discord...';
                redirectUrl = 'https://discord.gg/datatribe';
                break;
            case 'mentor':
                successMessage = 'Thank you for your interest in mentoring! Redirecting to mentor application...';
                redirectUrl = 'https://forms.gle/T44d1rVgFbK3Kb2A6';
                break;
            case 'partner':
                successMessage = 'Thank you for your interest in partnering! Redirecting to partnership application...';
                redirectUrl = 'https://forms.gle/vstXCHjHLiZBQxg56';
                break;
            case 'learning-path':
                successMessage = 'Welcome to DataTribe Collective! Redirecting to Discord to start your learning journey...';
                redirectUrl = 'https://discord.gg/datatribe';
                break;
            default:
                successMessage = 'Welcome to DataTribe Collective! Redirecting to Discord...';
                redirectUrl = 'https://discord.gg/datatribe';
        }
        
        // Show success message
        alert(successMessage);
        
        // Redirect based on user type
        window.open(redirectUrl, '_blank');
        
        // Close modal
        closeJoinForm();
        
        // Reset form
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new DataTribeApp();
    
    // Initialize join form
    const joinForm = document.getElementById('joinForm');
    if (joinForm) {
        joinForm.addEventListener('submit', handleJoinForm);
    }
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeJoinForm();
        }
    });
  });
} else {
  new DataTribeApp();
  
  // Initialize join form
  const joinForm = document.getElementById('joinForm');
  if (joinForm) {
      joinForm.addEventListener('submit', handleJoinForm);
  }
  
  // Close modal on Escape key
  document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
          closeJoinForm();
      }
  });
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DataTribeApp, utils };
}