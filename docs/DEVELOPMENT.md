# Development Guide

## 🛠️ Development Environment Setup

### Prerequisites
- Python 3.7+ (for local server)
- Modern web browser
- Code editor (VS Code recommended)
- Git

### Local Development Server

```bash
# Start development server
python3 -m http.server 8000

# Alternative: Node.js server
npx serve .

# Alternative: PHP server
php -S localhost:8000
```

### File Structure

```
sites-main/
├── index.html              # Main landing page
├── events.html             # Events listing
├── mentors.html            # Mentorship info
├── partners.html           # Partnership info
├── css/
│   └── modern.css          # Main stylesheet (1071 lines)
├── js/
│   └── modern.js           # Interactive features (787 lines)
├── docs/                   # Documentation
│   ├── README.md
│   ├── DEVELOPMENT.md
│   ├── DESIGN.md
│   └── CONTENT.md
└── assets/                 # Static assets
```

## 🎨 CSS Architecture

### Custom Properties System

```css
:root {
  /* Colors */
  --primary: #6366f1;
  --secondary: #a855f7;
  --accent: #06b6d4;
  
  /* Spacing Scale */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-24: 6rem;     /* 96px */
  --space-48: 12rem;    /* 192px */
  
  /* Typography */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  --text-5xl: 3rem;
  --text-6xl: 3.75rem;
}
```

### Component Structure

```css
/* Component: Card */
.card {
  /* Base styles */
  background: var(--bg-primary);
  border-radius: 20px;
  padding: var(--space-10);
  
  /* Hover effects */
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  transform: translateY(-12px) scale(1.02);
  box-shadow: var(--shadow-xl);
}
```

### Responsive Design

```css
/* Mobile First Approach */
.section {
  padding: var(--space-24) 0;
}

@media (max-width: 768px) {
  .section {
    padding: var(--space-20) 0;
  }
}
```

## ⚡ JavaScript Architecture

### Module Structure

```javascript
// Main initialization
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollEffects();
  initAnimations();
  initForms();
  initDarkMode();
  initSearch();
  initNewsletter();
});
```

### Key Functions

```javascript
// Dark mode toggle
function initDarkMode() {
  const toggle = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme') || 'light';
  
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  toggle?.addEventListener('click', () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}
```

### Performance Optimizations

```javascript
// Debounced scroll handler
const debouncedScroll = debounce(() => {
  // Scroll handling logic
}, 16);

window.addEventListener('scroll', debouncedScroll);

// Throttled resize handler
const throttledResize = throttle(() => {
  // Resize handling logic
}, 100);

window.addEventListener('resize', throttledResize);
```

## 🎯 Component Development

### Creating New Components

1. **HTML Structure**
   ```html
   <div class="component-name">
     <div class="component-header">
       <h3 class="component-title">Title</h3>
     </div>
     <div class="component-content">
       <!-- Content -->
     </div>
   </div>
   ```

2. **CSS Styling**
   ```css
   .component-name {
     /* Base styles using design tokens */
     background: var(--bg-primary);
     padding: var(--space-6);
     border-radius: var(--radius-lg);
   }
   ```

3. **JavaScript Functionality**
   ```javascript
   function initComponent() {
     const components = document.querySelectorAll('.component-name');
     components.forEach(component => {
       // Component logic
     });
   }
   ```

### Responsive Components

```css
/* Mobile-first responsive component */
.responsive-grid {
  display: grid;
  gap: var(--space-6);
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .responsive-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .responsive-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] **Responsive Design**
  - [ ] Mobile (320px - 768px)
  - [ ] Tablet (768px - 1024px)
  - [ ] Desktop (1024px+)

- [ ] **Browser Compatibility**
  - [ ] Chrome (latest)
  - [ ] Firefox (latest)
  - [ ] Safari (latest)
  - [ ] Edge (latest)

- [ ] **Functionality**
  - [ ] Navigation menu
  - [ ] Dark mode toggle
  - [ ] Search functionality
  - [ ] Form submissions
  - [ ] Animations and transitions

- [ ] **Performance**
  - [ ] Page load speed
  - [ ] Smooth animations
  - [ ] No console errors
  - [ ] Accessibility compliance

### Performance Testing

```bash
# Lighthouse CLI
npx lighthouse http://localhost:8000 --output html --output-path ./lighthouse-report.html

# WebPageTest
# Visit webpagetest.org and test the live site
```

## 🚀 Deployment Process

### Pre-deployment Checklist

- [ ] All images optimized
- [ ] CSS minified (if needed)
- [ ] JavaScript minified (if needed)
- [ ] Meta tags updated
- [ ] Sitemap.xml current
- [ ] Robots.txt configured
- [ ] Analytics tracking added
- [ ] Cross-browser testing complete

### Deployment Steps

1. **Test locally**
   ```bash
   python3 -m http.server 8000
   # Test all functionality
   ```

2. **Commit changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   git push origin main
   ```

3. **Deploy to hosting platform**
   - GitHub Pages: Automatic on push
   - Netlify: Connect repository
   - Vercel: Import project

## 🔧 Troubleshooting

### Common Issues

**CSS not loading**
- Check file paths
- Verify server is running
- Check browser console for errors

**JavaScript not working**
- Check for syntax errors
- Verify DOM elements exist
- Check browser console

**Responsive issues**
- Test on actual devices
- Use browser dev tools
- Check CSS media queries

**Performance issues**
- Optimize images
- Minify CSS/JS
- Enable GZIP compression
- Check network tab in dev tools

### Debug Tools

```javascript
// Console debugging
console.log('Debug info:', variable);

// Performance monitoring
console.time('Function name');
// Function code
console.timeEnd('Function name');

// Element inspection
console.log(document.querySelector('.element'));
```

## 📚 Resources

### Documentation
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [JavaScript ES6+](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

### Tools
- [VS Code](https://code.visualstudio.com/)
- [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- [Prettier](https://prettier.io/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

---

**Happy coding!** 🚀
