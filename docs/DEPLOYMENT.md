# Deployment Guide

## 🚀 Deployment Overview

The DataTribe Collective website is a static site optimized for various hosting platforms. This guide covers deployment options, configuration, and maintenance.

## 📋 Pre-Deployment Checklist

### Code Quality
- [ ] All files committed to version control
- [ ] No console errors or warnings
- [ ] All images optimized and compressed
- [ ] CSS and JavaScript minified (if needed)
- [ ] Cross-browser testing completed
- [ ] Mobile responsiveness verified
- [ ] Performance testing passed

### Content Verification
- [ ] All content is current and accurate
- [ ] Contact information is correct
- [ ] Event dates and times are updated
- [ ] Links are working and pointing to correct URLs
- [ ] Meta tags and SEO elements are complete
- [ ] Sitemap.xml is current
- [ ] Robots.txt is configured

### Security
- [ ] No sensitive information in code
- [ ] HTTPS is configured
- [ ] Security headers are set
- [ ] Content Security Policy is implemented
- [ ] No hardcoded credentials

## 🌐 Hosting Options

### GitHub Pages
**Best for**: Open source projects, simple deployment
**Cost**: Free
**Setup Time**: 5 minutes

```bash
# 1. Create repository
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/datatribe-collective.git
git push -u origin main

# 2. Enable GitHub Pages
# Go to repository Settings > Pages
# Select source: Deploy from a branch
# Select branch: main
# Select folder: / (root)
```

**Configuration**:
- Custom domain: Add CNAME file
- HTTPS: Automatically enabled
- Build: Not required (static site)

### Netlify
**Best for**: Advanced features, CI/CD
**Cost**: Free tier available
**Setup Time**: 10 minutes

```bash
# 1. Connect repository
# Go to netlify.com
# Click "New site from Git"
# Connect GitHub repository

# 2. Configure build settings
# Build command: (leave empty for static site)
# Publish directory: ./
# Branch: main

# 3. Deploy
# Site will automatically deploy on push
```

**Netlify Features**:
- Automatic HTTPS
- Custom domains
- Form handling
- Serverless functions
- Branch previews
- Analytics

### Vercel
**Best for**: Next.js projects, edge functions
**Cost**: Free tier available
**Setup Time**: 5 minutes

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy
vercel

# 3. Follow prompts
# Project name: datatribe-collective
# Framework: Other
# Build command: (leave empty)
# Output directory: ./
```

**Vercel Features**:
- Global CDN
- Automatic HTTPS
- Custom domains
- Edge functions
- Analytics
- Preview deployments

### AWS S3 + CloudFront
**Best for**: Enterprise, high traffic
**Cost**: Pay-per-use
**Setup Time**: 30 minutes

```bash
# 1. Create S3 bucket
aws s3 mb s3://datatribe-collective

# 2. Upload files
aws s3 sync . s3://datatribe-collective --delete

# 3. Configure static website hosting
aws s3 website s3://datatribe-collective --index-document index.html

# 4. Create CloudFront distribution
# Origin: S3 bucket
# Default root object: index.html
# Price class: Use all edge locations
```

## ⚙️ Configuration Files

### .htaccess (Apache)
```apache
# Enable GZIP compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Browser caching
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>

# Security headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
```

### netlify.toml
```toml
[build]
  publish = "."
  command = ""

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000"

[[headers]]
  for = "*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000"
```

### vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "**/*",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

## 🔧 Environment Configuration

### Development
```bash
# Local development server
python3 -m http.server 8000

# Or with Node.js
npx serve .

# Or with PHP
php -S localhost:8000
```

### Production
```bash
# No build process required for static site
# Files are served directly from repository
```

## 📊 Performance Optimization

### Image Optimization
```bash
# Optimize images before deployment
# Using ImageOptim (macOS) or similar tool
# Target: < 100KB per image
# Format: WebP when possible, fallback to JPEG/PNG
```

### CSS/JS Minification
```bash
# Optional: Minify CSS and JS
# Using tools like UglifyJS, CleanCSS
# Or online tools like minifier.org
```

### CDN Configuration
```html
<!-- Use CDN for external resources -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/intersection-observer/0.12.2/intersection-observer.min.js"></script>
```

## 🔒 Security Configuration

### HTTPS Setup
```bash
# Most hosting platforms provide automatic HTTPS
# For custom domains, ensure SSL certificate is installed
# Redirect HTTP to HTTPS
```

### Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' https://images.unsplash.com;
  connect-src 'self';
">
```

### Security Headers
```apache
# Additional security headers
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
Header always set Content-Security-Policy "default-src 'self'"
Header always set Permissions-Policy "geolocation=(), microphone=(), camera=()"
```

## 📈 Monitoring & Analytics

### Google Analytics
```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Performance Monitoring
```html
<!-- Web Vitals monitoring -->
<script>
  function sendToAnalytics(metric) {
    gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.value),
      non_interaction: true,
    });
  }
</script>
```

### Error Tracking
```javascript
// Global error handling
window.addEventListener('error', (event) => {
  // Send to error tracking service
  console.error('Error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  // Send to error tracking service
  console.error('Unhandled promise rejection:', event.reason);
});
```

## 🔄 CI/CD Pipeline

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm install
    
    - name: Build
      run: npm run build
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
```

### Netlify Build Hooks
```bash
# Trigger deployment via webhook
curl -X POST -d {} https://api.netlify.com/build_hooks/YOUR_BUILD_HOOK_ID
```

## 🚨 Troubleshooting

### Common Issues

**404 Errors**
- Check file paths and case sensitivity
- Verify .htaccess redirects
- Check SPA routing configuration

**CSS/JS Not Loading**
- Verify file paths
- Check MIME types
- Clear browser cache

**Performance Issues**
- Optimize images
- Enable GZIP compression
- Use CDN for static assets

**SSL Certificate Issues**
- Verify certificate installation
- Check domain configuration
- Renew certificate if expired

### Debug Tools
```bash
# Check site performance
npx lighthouse https://your-domain.com

# Test mobile responsiveness
npx pa11y https://your-domain.com

# Check security headers
curl -I https://your-domain.com
```

## 📋 Maintenance

### Regular Tasks
- [ ] Update content monthly
- [ ] Check for broken links
- [ ] Monitor performance metrics
- [ ] Update dependencies
- [ ] Backup site data
- [ ] Review security logs

### Monitoring
- **Uptime**: Use services like UptimeRobot
- **Performance**: Google PageSpeed Insights
- **Security**: Regular security scans
- **Analytics**: Monitor user behavior

---

**Deployment Guide Version**: 1.0  
**Last Updated**: December 2024  
**Maintained by**: DataTribe Collective DevOps Team
