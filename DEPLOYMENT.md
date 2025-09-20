# Deployment Guide - TechFest 2024 Event Management System

## 🚀 Quick Deployment to GitHub Pages

### Step 1: Prepare Your Repository
1. **Create a new GitHub repository** named `event-manager` (or any name you prefer)
2. **Upload all files** to the repository:
   - `main-page/` folder
   - `registration/` folder  
   - `admin/` folder
   - `README.md` file

### Step 2: Enable GitHub Pages
1. **Go to your repository** on GitHub
2. **Click on "Settings"** tab
3. **Scroll down to "Pages"** section in the left sidebar
4. **Under "Source"**, select "Deploy from a branch"
5. **Choose "main"** (or "master") branch
6. **Select "/ (root)"** folder
7. **Click "Save"**

### Step 3: Access Your Live Site
1. **Wait 2-3 minutes** for GitHub to build and deploy your site
2. **Your site will be available at:**
   ```
   https://yourusername.github.io/event-manager
   ```
3. **Replace `yourusername`** with your actual GitHub username
4. **Replace `event-manager`** with your repository name if different

## 🔧 Alternative Deployment Methods

### Method 1: Netlify (Recommended for beginners)
1. **Go to [netlify.com](https://netlify.com)**
2. **Sign up/Login** with GitHub
3. **Click "New site from Git"**
4. **Connect your GitHub repository**
5. **Deploy settings:**
   - Build command: (leave empty)
   - Publish directory: `/` (root)
6. **Click "Deploy site"**
7. **Your site will be live** at a random URL (you can customize it)

### Method 2: Vercel
1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up/Login** with GitHub
3. **Click "New Project"**
4. **Import your GitHub repository**
5. **Deploy settings:**
   - Framework Preset: Other
   - Root Directory: `/`
6. **Click "Deploy"**

### Method 3: Firebase Hosting
1. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```
2. **Login to Firebase:**
   ```bash
   firebase login
   ```
3. **Initialize Firebase in your project:**
   ```bash
   firebase init hosting
   ```
4. **Deploy:**
   ```bash
   firebase deploy
   ```

## 📱 Testing Your Deployment

### Before Going Live
1. **Test locally** using a web server
2. **Check all pages** load correctly
3. **Test registration form** functionality
4. **Test admin dashboard** features
5. **Test on mobile devices**

### After Deployment
1. **Visit your live URL**
2. **Test registration process** end-to-end
3. **Verify data persistence** (refresh page, check if data remains)
4. **Test admin features** (search, filter, export)
5. **Test on different devices** and browsers

## 🔒 Important Notes

### Security Considerations
- **This is a client-side only application**
- **No server-side validation** (all validation is in JavaScript)
- **Data is stored in browser localStorage** (not secure for sensitive data)
- **Suitable for demo/educational purposes**

### Data Management
- **Data persists** only in the user's browser
- **Data is not shared** between different browsers/devices
- **Admin can export data** to JSON files for backup
- **Clearing browser data** will remove all registrations

### Browser Requirements
- **Modern browsers only** (Chrome, Firefox, Safari, Edge)
- **JavaScript must be enabled**
- **localStorage must be supported**

## 🐛 Troubleshooting Deployment

### Common Issues

#### 1. Pages Not Loading
- **Check file paths** - ensure all links use correct relative paths
- **Check console errors** - open browser developer tools
- **Verify all files uploaded** - check repository has all necessary files

#### 2. Styling Not Working
- **Check CSS file paths** - ensure stylesheets are linked correctly
- **Clear browser cache** - hard refresh (Ctrl+F5 or Cmd+Shift+R)
- **Check for typos** in CSS class names

#### 3. JavaScript Not Working
- **Check console for errors** - open browser developer tools
- **Verify JavaScript files** are uploaded and accessible
- **Check for syntax errors** in JavaScript code

#### 4. Countdown Timer Issues
- **Check system time** - ensure device time is correct
- **Verify JavaScript execution** - check if scripts are loading
- **Test in different browsers** - some browsers may have issues

### Getting Help
1. **Check browser console** for error messages
2. **Test in incognito/private mode** to rule out cache issues
3. **Try different browsers** to isolate browser-specific problems
4. **Verify all files** are present in your repository

## 📊 Post-Deployment Checklist

- [ ] **Home page loads** with countdown timer
- [ ] **Registration form** works and validates input
- [ ] **Admin dashboard** displays participant data
- [ ] **Search and filter** functions work correctly
- [ ] **Export functionality** downloads JSON file
- [ ] **Mobile responsive** design works on phones/tablets
- [ ] **Navigation** between pages works smoothly
- [ ] **Data persistence** works (data survives page refresh)

## 🎉 Success!

Once everything is working, you'll have a fully functional event management system that can:
- ✅ Collect participant registrations
- ✅ Store data locally in the browser
- ✅ Provide admin tools for management
- ✅ Work on all modern devices
- ✅ Handle multiple participants efficiently

**Your TechFest 2024 Event Management System is now live! 🚀**
