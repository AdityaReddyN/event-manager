// Registration Form Management
class RegistrationManager {
    constructor() {
        this.form = document.getElementById('registrationForm');
        this.participants = JSON.parse(localStorage.getItem('participants')) || [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateRegistrationCount();
        this.updateDeadlineInfo();
        this.checkRegistrationDeadline();
    }

    setupEventListeners() {
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Clear form button
        document.getElementById('clearBtn').addEventListener('click', () => this.clearForm());
        
        // Real-time validation
        const inputs = this.form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        
        if (this.isRegistrationClosed()) {
            this.showMessage('Registration is now closed!', 'error');
            return;
        }

        if (this.validateForm()) {
            const formData = this.getFormData();
            
            // Check for duplicate email
            if (this.isDuplicateEmail(formData.email)) {
                this.showMessage('This email is already registered!', 'error');
                return;
            }

            this.saveParticipant(formData);
            this.showMessage('Registration successful! Welcome to TechFest 2024!', 'success');
            this.clearForm();
            this.updateRegistrationCount();
        }
    }

    getFormData() {
        return {
            id: Date.now().toString(),
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            year: document.getElementById('year').value,
            branch: document.getElementById('branch').value,
            event: document.getElementById('event').value,
            experience: document.getElementById('experience').value || 'Not specified',
            comments: document.getElementById('comments').value.trim(),
            registrationDate: new Date().toISOString()
        };
    }

    validateForm() {
        let isValid = true;
        const requiredFields = ['name', 'email', 'phone', 'year', 'branch', 'event'];
        
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        const errorElement = document.getElementById(`${fieldName}-error`);
        
        // Clear previous error
        this.clearFieldError(field);

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            this.showFieldError(field, `${this.getFieldLabel(fieldName)} is required`);
            return false;
        }

        // Email validation
        if (fieldName === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showFieldError(field, 'Please enter a valid email address');
                return false;
            }
        }

        // Phone validation
        if (fieldName === 'phone' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                this.showFieldError(field, 'Please enter a valid phone number');
                return false;
            }
        }

        // Name validation
        if (fieldName === 'name' && value) {
            if (value.length < 2) {
                this.showFieldError(field, 'Name must be at least 2 characters long');
                return false;
            }
        }

        return true;
    }

    showFieldError(field, message) {
        const errorElement = document.getElementById(`${field.name}-error`);
        errorElement.textContent = message;
        errorElement.classList.add('show');
        field.style.borderColor = '#e74c3c';
    }

    clearFieldError(field) {
        const errorElement = document.getElementById(`${field.name}-error`);
        errorElement.textContent = '';
        errorElement.classList.remove('show');
        field.style.borderColor = '#e1e5e9';
    }

    getFieldLabel(fieldName) {
        const labels = {
            name: 'Full Name',
            email: 'Email Address',
            phone: 'Phone Number',
            year: 'Academic Year',
            branch: 'Branch/Department',
            event: 'Event Selection'
        };
        return labels[fieldName] || fieldName;
    }

    isDuplicateEmail(email) {
        return this.participants.some(participant => 
            participant.email.toLowerCase() === email.toLowerCase()
        );
    }

    saveParticipant(participantData) {
        this.participants.push(participantData);
        localStorage.setItem('participants', JSON.stringify(this.participants));
    }

    clearForm() {
        this.form.reset();
        this.clearAllFieldErrors();
        this.hideMessage();
    }

    clearAllFieldErrors() {
        const errorElements = this.form.querySelectorAll('.error-message');
        errorElements.forEach(error => {
            error.textContent = '';
            error.classList.remove('show');
        });
        
        const inputs = this.form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.style.borderColor = '#e1e5e9';
        });
    }

    showMessage(message, type) {
        const messageElement = document.getElementById('formMessage');
        messageElement.textContent = message;
        messageElement.className = `form-message ${type}`;
        
        // Auto-hide success messages
        if (type === 'success') {
            setTimeout(() => this.hideMessage(), 5000);
        }
    }

    hideMessage() {
        const messageElement = document.getElementById('formMessage');
        messageElement.textContent = '';
        messageElement.className = 'form-message';
    }

    updateRegistrationCount() {
        const countElement = document.getElementById('totalRegistrations');
        if (countElement) {
            countElement.textContent = this.participants.length;
        }
    }

    updateDeadlineInfo() {
        const deadline = new Date();
        deadline.setDate(deadline.getDate() + 7);
        deadline.setHours(23, 59, 59, 999);
        
        const now = new Date();
        const timeLeft = deadline.getTime() - now.getTime();
        
        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            document.getElementById('deadlineInfo').textContent = `${days} days, ${hours} hours remaining`;
        } else {
            document.getElementById('deadlineInfo').textContent = 'Registration Closed';
        }
    }

    checkRegistrationDeadline() {
        const deadline = new Date();
        deadline.setDate(deadline.getDate() + 7);
        deadline.setHours(23, 59, 59, 999);
        
        const now = new Date();
        if (now.getTime() > deadline.getTime()) {
            this.disableRegistration();
        }
    }

    isRegistrationClosed() {
        const deadline = new Date();
        deadline.setDate(deadline.getDate() + 7);
        deadline.setHours(23, 59, 59, 999);
        
        return new Date().getTime() > deadline.getTime();
    }

    disableRegistration() {
        const submitBtn = document.getElementById('submitBtn');
        const formInputs = this.form.querySelectorAll('input, select, textarea');
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Registration Closed';
        submitBtn.style.opacity = '0.5';
        submitBtn.style.cursor = 'not-allowed';
        
        formInputs.forEach(input => {
            input.disabled = true;
            input.style.opacity = '0.5';
        });
    }
}

// Mobile Navigation
class MobileNavigation {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.init();
    }

    init() {
        if (this.hamburger && this.navMenu) {
            this.hamburger.addEventListener('click', () => this.toggleMenu());
            
            // Close menu when clicking on a link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => this.closeMenu());
            });
        }
    }

    toggleMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
    }

    closeMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new RegistrationManager();
    new MobileNavigation();
});

// Update deadline info every minute
setInterval(() => {
    const registrationManager = new RegistrationManager();
    registrationManager.updateDeadlineInfo();
    registrationManager.checkRegistrationDeadline();
}, 60000);
