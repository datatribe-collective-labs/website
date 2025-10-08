# DataTribe Collective - Project Documentation

## 📋 Overview

This repository contains the official website for DataTribe Collective, a Finland-based community that connects data professionals with companies through verified project work and mentorship.

## 🎯 Mission

DataTribe Collective exists to give data professionals a way to demonstrate ability through real work and to give companies a way to evaluate people safely before hiring. It runs on three simple mechanisms:

1. **Short projects** with defined outcomes
2. **Public review** of the work by mentors and peers  
3. **Visible track records** that companies can verify

## 🏗️ Project Structure

```
sites-main/
├── index.html              # Main landing page
├── events.html             # Events and meetups
├── mentors.html            # Mentorship information
├── partners.html           # Company partnership info
├── css/
│   └── modern.css          # Main stylesheet
├── js/
│   └── modern.js           # Interactive functionality
├── docs/                   # Documentation
├── .htaccess              # Server configuration
├── robots.txt             # SEO configuration
├── sitemap.xml            # Site structure
└── favicon.*              # Site icons
```

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sites-main
   ```

2. **Start local server**
   ```bash
   python3 -m http.server 8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

### Production Deployment

The site is configured for static hosting with:
- GZIP compression
- Browser caching
- Security headers
- SEO optimization

## 🎨 Design System

### Color Palette
- **Primary**: `#6366f1` (Indigo)
- **Secondary**: `#a855f7` (Purple)  
- **Accent**: `#06b6d4` (Cyan)
- **Success**: `#10b981` (Emerald)
- **Warning**: `#f59e0b` (Amber)
- **Error**: `#ef4444` (Red)

### Typography
- **Font Family**: Inter (primary), Poppins (headings), Manrope (accent)
- **Responsive Sizing**: Uses `clamp()` for fluid typography
- **Scale**: 0.875rem to 4rem with consistent line heights

### Spacing System
- **Base Unit**: 8px grid system
- **Scale**: `--space-1` (4px) to `--space-48` (384px)
- **Responsive**: Adjusts for mobile devices

## 📱 Features

### Core Functionality
- ✅ Responsive design (mobile-first)
- ✅ Dark mode toggle
- ✅ Search functionality
- ✅ Newsletter signup
- ✅ Event management
- ✅ Mentor profiles
- ✅ Company partnerships

### Technical Features
- ✅ Modern CSS with custom properties
- ✅ ES6+ JavaScript with modules
- ✅ Intersection Observer animations
- ✅ Form validation and handling
- ✅ Local storage for preferences
- ✅ SEO optimization
- ✅ Performance optimization

## 🔧 Development

### CSS Architecture
- **Custom Properties**: Centralized design tokens
- **BEM Methodology**: Consistent class naming
- **Mobile-First**: Responsive breakpoints
- **Component-Based**: Modular stylesheet organization

### JavaScript Structure
- **Modular Functions**: Separated concerns
- **Event Handling**: Clean event management
- **Performance**: Debounced and throttled functions
- **Accessibility**: ARIA labels and keyboard navigation

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📊 Performance

### Optimization Features
- GZIP compression
- Browser caching
- Optimized images
- Minified CSS/JS
- Lazy loading
- Critical CSS inlining

### Metrics
- **Lighthouse Score**: 95+ (Performance)
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1

## 🚀 Deployment

### Static Hosting
The site is optimized for static hosting platforms:
- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront

### Environment Variables
No environment variables required for basic functionality.

### Build Process
No build process required - static HTML/CSS/JS files.

## 📈 Analytics & SEO

### SEO Features
- Semantic HTML structure
- Meta tags and Open Graph
- Structured data (JSON-LD)
- XML sitemap
- Robots.txt

### Analytics Integration
Ready for Google Analytics, Plausible, or other analytics platforms.

## 🤝 Contributing

### Code Style
- Use Prettier for formatting
- Follow existing CSS architecture
- Maintain responsive design principles
- Test across devices and browsers

### Pull Request Process
1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## 📞 Support

For technical issues or questions:
- Create an issue in the repository
- Contact the development team
- Check existing documentation

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**DataTribe Collective** - Connecting data professionals through verified work and mentorship.
