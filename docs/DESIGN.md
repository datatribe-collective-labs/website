# Design System Documentation

## 🎨 Visual Identity

### Brand Overview
DataTribe Collective is a Finland-based community that connects data professionals with companies through verified project work. The design reflects the technical, professional, and collaborative nature of the data industry.

### Design Principles
- **Professional**: Clean, modern aesthetic that builds trust
- **Technical**: Data-focused visual elements and iconography
- **Collaborative**: Warm, approachable design that encourages participation
- **Accessible**: High contrast, readable typography, and intuitive navigation

## 🎨 Color Palette

### Primary Colors
```css
:root {
  --primary: #6366f1;        /* Indigo - Professional, trustworthy */
  --primary-dark: #4f46e5;   /* Darker indigo for hover states */
  --secondary: #a855f7;      /* Purple - Creative, innovative */
  --accent: #06b6d4;         /* Cyan - Fresh, modern */
}
```

### Semantic Colors
```css
:root {
  --success: #10b981;        /* Emerald - Success states */
  --warning: #f59e0b;        /* Amber - Warning states */
  --error: #ef4444;          /* Red - Error states */
  --info: #3b82f6;           /* Blue - Information */
}
```

### Neutral Colors
```css
:root {
  --text-primary: #1e293b;   /* Dark slate - Primary text */
  --text-secondary: #64748b; /* Slate - Secondary text */
  --text-muted: #94a3b8;     /* Light slate - Muted text */
  --bg-primary: #ffffff;     /* White - Primary background */
  --bg-secondary: #f8fafc;   /* Light gray - Secondary background */
  --border: #e2e8f0;         /* Light gray - Borders */
}
```

### Dark Mode Colors
```css
[data-theme="dark"] {
  --text-primary: #f1f5f9;   /* Light slate - Primary text */
  --text-secondary: #cbd5e1; /* Medium slate - Secondary text */
  --text-muted: #94a3b8;     /* Light slate - Muted text */
  --bg-primary: #0f172a;     /* Dark slate - Primary background */
  --bg-secondary: #1e293b;   /* Medium slate - Secondary background */
  --border: #334155;         /* Dark slate - Borders */
}
```

## 📝 Typography

### Font Families
```css
:root {
  --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-heading: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-accent: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

### Type Scale
```css
:root {
  --text-xs: 0.75rem;        /* 12px - Small labels */
  --text-sm: 0.875rem;       /* 14px - Body small */
  --text-base: 1rem;         /* 16px - Body text */
  --text-lg: 1.125rem;       /* 18px - Body large */
  --text-xl: 1.25rem;        /* 20px - Small headings */
  --text-2xl: 1.5rem;        /* 24px - Medium headings */
  --text-3xl: 1.875rem;      /* 30px - Large headings */
  --text-4xl: 2.25rem;       /* 36px - Extra large headings */
  --text-5xl: 3rem;          /* 48px - Hero headings */
  --text-6xl: 3.75rem;       /* 60px - Display headings */
}
```

### Responsive Typography
```css
/* Hero heading with responsive sizing */
.hero h1 {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.03em;
}

/* Section titles with responsive sizing */
.section-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.01em;
}
```

### Font Weights
- **300**: Light - Subtle text, captions
- **400**: Regular - Body text
- **500**: Medium - Emphasized text
- **600**: Semibold - Small headings
- **700**: Bold - Medium headings
- **800**: Extrabold - Large headings
- **900**: Black - Display headings

## 📐 Spacing System

### Base Unit
The design system uses an 8px base unit for consistent spacing throughout the interface.

### Spacing Scale
```css
:root {
  --space-1: 0.25rem;        /* 4px */
  --space-2: 0.5rem;         /* 8px */
  --space-3: 0.75rem;        /* 12px */
  --space-4: 1rem;           /* 16px */
  --space-5: 1.25rem;        /* 20px */
  --space-6: 1.5rem;         /* 24px */
  --space-8: 2rem;           /* 32px */
  --space-10: 2.5rem;        /* 40px */
  --space-12: 3rem;          /* 48px */
  --space-16: 4rem;          /* 64px */
  --space-20: 5rem;          /* 80px */
  --space-24: 6rem;          /* 96px */
  --space-32: 8rem;          /* 128px */
  --space-40: 10rem;         /* 160px */
  --space-48: 12rem;         /* 192px */
}
```

### Usage Guidelines
- **Micro spacing** (1-4): Tight spacing for related elements
- **Small spacing** (6-8): Standard spacing between elements
- **Medium spacing** (12-16): Section spacing
- **Large spacing** (24-32): Major section spacing
- **Extra large spacing** (40-48): Hero and footer spacing

## 🎯 Layout System

### Grid System
```css
/* Responsive grid with CSS Grid */
.grid {
  display: grid;
  gap: var(--space-6);
}

.grid-cols-1 { grid-template-columns: 1fr; }
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }

/* Mobile-first responsive breakpoints */
@media (max-width: 768px) {
  .grid-cols-2,
  .grid-cols-3,
  .grid-cols-4 {
    grid-template-columns: 1fr;
  }
}
```

### Container System
```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-8);
}

.container-fluid {
  width: 100%;
  padding: 0 var(--space-8);
}

@media (max-width: 768px) {
  .container,
  .container-fluid {
    padding: 0 var(--space-4);
  }
}
```

## 🎨 Component Design

### Cards
```css
.card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: var(--space-10);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.card:hover {
  transform: translateY(-12px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}
```

### Buttons
```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-3) var(--space-6);
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: white;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4);
}
```

### Navigation
```css
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4) 0;
  min-height: 80px;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: var(--space-6);
  margin: 0;
  padding: 0;
  align-items: center;
}

.nav-link {
  font-weight: 500;
  color: var(--text-primary);
  text-decoration: none;
  padding: var(--space-2) var(--space-3);
  border-radius: 8px;
  font-size: var(--text-sm);
  transition: all 0.3s ease;
}
```

## 🎭 Animations & Interactions

### Transition Timing
```css
:root {
  --transition-fast: 0.15s ease;
  --transition-normal: 0.3s ease;
  --transition-slow: 0.5s ease;
}
```

### Hover Effects
```css
.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}
```

### Loading States
```css
@keyframes shimmer {
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
}

.loading {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: shimmer 1.5s infinite;
}
```

## 📱 Responsive Design

### Breakpoints
```css
/* Mobile First Approach */
/* Base styles for mobile (320px+) */

@media (min-width: 640px) {
  /* Small tablets */
}

@media (min-width: 768px) {
  /* Tablets */
}

@media (min-width: 1024px) {
  /* Desktop */
}

@media (min-width: 1280px) {
  /* Large desktop */
}
```

### Mobile Considerations
- Touch targets minimum 44px
- Readable text sizes (minimum 16px)
- Adequate spacing for touch interaction
- Simplified navigation for small screens

## ♿ Accessibility

### Color Contrast
- **AA Standard**: 4.5:1 for normal text
- **AAA Standard**: 7:1 for large text
- **Interactive Elements**: 3:1 minimum

### Focus States
```css
.focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

.btn:focus-visible,
.nav-link:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}
```

### Screen Reader Support
```html
<!-- Proper semantic structure -->
<nav aria-label="Main navigation">
  <ul role="menubar">
    <li role="none">
      <a href="/" role="menuitem">Home</a>
    </li>
  </ul>
</nav>
```

## 🎨 Visual Hierarchy

### Heading Structure
1. **H1**: Page titles (hero sections)
2. **H2**: Section titles
3. **H3**: Card titles, subsection headings
4. **H4**: Form labels, small headings
5. **H5-H6**: Rarely used, for very specific content

### Content Hierarchy
- **Primary**: Most important information
- **Secondary**: Supporting information
- **Tertiary**: Additional details, metadata

## 🎯 Brand Guidelines

### Logo Usage
- Minimum size: 24px height
- Clear space: 1x logo height on all sides
- Never distort or modify the logo
- Use on light or dark backgrounds as appropriate

### Photography Style
- Professional, clean imagery
- Data-focused subjects when possible
- Diverse, inclusive representation
- High quality, well-lit photos

### Icon Style
- Consistent stroke width (2px)
- Rounded corners (2px radius)
- 24px base size for UI icons
- Monochrome with brand colors for accents

---

**Design System Version**: 1.0  
**Last Updated**: December 2024  
**Maintained by**: DataTribe Collective Design Team
