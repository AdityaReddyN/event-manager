# TechFest 2024 - Event Management System

A comprehensive web-based event management application built for managing technical festival registrations. This system allows participants to register for events and provides administrators with powerful tools to manage registrations.

## 🚀 Features

### For Participants
- **Registration Form** with comprehensive validation
- **Real-time Form Validation** with helpful error messages
- **Countdown Timer** showing registration deadline
- **Responsive Design** that works on all devices
- **Event Selection** from multiple technical events
- **Academic Information** collection (Year, Branch, Experience Level)

### For Administrators
- **Admin Dashboard** with comprehensive participant management
- **Search & Filter** participants by name, email, branch, event, or year
- **Sort Functionality** by various criteria (name, year, branch, event, date)
- **Pagination** for easy navigation through large participant lists
- **Statistics Dashboard** showing registration metrics
- **Export Data** functionality to download participant data
- **Delete Participants** with confirmation dialogs
- **Real-time Updates** of registration counts

### Technical Features
- **localStorage Persistence** - Data persists across browser sessions
- **JSON Data Storage** - All participant data stored in structured JSON format
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Modern UI/UX** - Clean, professional interface with smooth animations
- **Form Validation** - Comprehensive client-side validation
- **Countdown Timer** - Live countdown to registration deadline
- **Multi-page Navigation** - Seamless navigation between different sections

## 📁 Project Structure

```
event-manager/
├── main-page/
│   ├── index.html          # Landing page with countdown timer
│   ├── style.css           # Main page styling
│   └── script.js           # Countdown timer and navigation logic
├── registration/
│   ├── regi.html           # Registration form page
│   ├── style.css           # Registration page styling
│   └── front.js            # Form validation and data management
├── admin/
│   ├── admin.html          # Admin dashboard
│   ├── style.css           # Admin page styling
│   └── admin.js            # Admin functionality and data management
└── README.md               # This file
```

## 🛠️ Technologies Used

- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with Flexbox and Grid
- **JavaScript (ES6+)** - Modern JavaScript with classes and modules
- **Font Awesome** - Icons for enhanced UI
- **localStorage API** - Client-side data persistence
- **Responsive Design** - Mobile-first approach

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software installation required

### Installation
1. Clone or download this repository
2. Open the project folder in your file explorer
3. Navigate to `main-page/index.html`
4. Open the file in your web browser

### Local Development
1. Use a local web server (recommended):
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```
2. Open `http://localhost:8000/main-page/` in your browser

## 📱 Usage

### For Participants
1. **Visit the Home Page** - See the countdown timer and event information
2. **Click "Register Now"** - Navigate to the registration form
3. **Fill Out the Form** - Complete all required fields with valid information
4. **Submit Registration** - Your data will be saved and you'll receive confirmation

### For Administrators
1. **Navigate to Admin Page** - Click "Admin" in the navigation
2. **View Statistics** - See total participants, today's registrations, etc.
3. **Search & Filter** - Use the search box and filter dropdowns to find specific participants
4. **Sort Data** - Sort participants by name, year, branch, event, or registration date
5. **Manage Participants** - View details, edit, or delete participant records
6. **Export Data** - Download participant data as JSON file

## 🎯 Key Features Explained

### Countdown Timer
- Shows live countdown to registration deadline
- Automatically disables registration when deadline passes
- Updates every second for real-time accuracy

### Form Validation
- **Real-time validation** as users type
- **Email format validation** using regex patterns
- **Phone number validation** for proper format
- **Required field validation** with clear error messages
- **Duplicate email prevention** to avoid multiple registrations

### Data Management
- **JSON Storage** - All data stored in structured JSON format
- **localStorage Persistence** - Data survives browser refreshes
- **Unique IDs** - Each participant gets a unique timestamp-based ID
- **Registration Timestamps** - Track when each participant registered

### Admin Dashboard
- **Search Functionality** - Search across all participant fields
- **Advanced Filtering** - Filter by branch, event, year, and more
- **Sorting Options** - Multiple sorting criteria with ascending/descending
- **Pagination** - Handle large numbers of participants efficiently
- **Export Capability** - Download data for external analysis

## 🎨 Design Features

### Responsive Design
- **Mobile-first approach** - Optimized for mobile devices
- **Flexible layouts** - Adapts to different screen sizes
- **Touch-friendly** - Large buttons and touch targets for mobile
- **Hamburger menu** - Collapsible navigation for mobile devices

### Modern UI/UX
- **Gradient backgrounds** - Eye-catching visual design
- **Smooth animations** - Hover effects and transitions
- **Card-based layout** - Clean, organized information display
- **Consistent color scheme** - Professional blue and purple theme
- **Font Awesome icons** - Visual enhancement throughout the interface

## 🔧 Customization

### Changing Events
Edit the event options in `registration/regi.html`:
```html
<option value="Your Event Name">Your Event Name</option>
```

### Modifying Countdown Timer
Update the deadline in `main-page/script.js`:
```javascript
deadline.setDate(deadline.getDate() + 7); // Change 7 to desired days
```

### Styling Customization
- Modify CSS variables in the style files
- Update color schemes in the gradient backgrounds
- Adjust spacing and typography as needed

## 📊 Data Structure

Participants are stored in localStorage with the following structure:
```json
{
  "id": "timestamp",
  "name": "Participant Name",
  "email": "email@example.com",
  "phone": "1234567890",
  "year": "2nd Year",
  "branch": "Computer Science",
  "event": "Coding Competition",
  "experience": "Intermediate",
  "comments": "Additional comments",
  "registrationDate": "2024-01-01T12:00:00.000Z"
}
```

## 🚀 Deployment

### GitHub Pages Deployment
1. **Create a GitHub repository** and push your code
2. **Go to repository Settings** → Pages
3. **Select source branch** (usually `main` or `master`)
4. **Choose folder** (usually `/` for root)
5. **Save and wait** for deployment (usually takes a few minutes)
6. **Access your site** at `https://yourusername.github.io/repository-name`

### Alternative Deployment Options
- **Netlify** - Drag and drop deployment
- **Vercel** - Connect GitHub repository for automatic deployments
- **Firebase Hosting** - Google's hosting platform
- **Any web hosting service** - Upload files via FTP

## 🐛 Troubleshooting

### Common Issues
1. **Countdown timer not working** - Check browser console for JavaScript errors
2. **Data not saving** - Ensure localStorage is enabled in your browser
3. **Styling issues** - Clear browser cache and reload
4. **Mobile navigation not working** - Check if JavaScript is enabled

### Browser Compatibility
- **Chrome** 60+ ✅
- **Firefox** 55+ ✅
- **Safari** 12+ ✅
- **Edge** 79+ ✅
- **Internet Explorer** Not supported ❌

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support or questions, please open an issue in the GitHub repository.

## 🎉 Acknowledgments

- Font Awesome for the amazing icons
- Modern CSS techniques for responsive design
- JavaScript ES6+ features for clean, maintainable code

---

**Built with ❤️ for TechFest 2024**
