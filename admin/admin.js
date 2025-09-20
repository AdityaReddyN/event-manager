// Admin Dashboard Management
class AdminDashboard {
    constructor() {
        this.participants = JSON.parse(localStorage.getItem('participants')) || [];
        this.filteredParticipants = [...this.participants];
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.sortBy = 'name';
        this.sortOrder = 'asc';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateStatistics();
        this.renderTable();
        this.updatePagination();
    }

    setupEventListeners() {
        // Search functionality
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchParticipants(e.target.value);
        });

        // Filter functionality
        document.getElementById('branchFilter').addEventListener('change', (e) => {
            this.applyFilters();
        });

        document.getElementById('eventFilter').addEventListener('change', (e) => {
            this.applyFilters();
        });

        document.getElementById('yearFilter').addEventListener('change', (e) => {
            this.applyFilters();
        });

        // Sort functionality
        document.getElementById('sortBy').addEventListener('change', (e) => {
            this.sortBy = e.target.value.split('-')[0];
            this.sortOrder = e.target.value.includes('-desc') ? 'desc' : 'asc';
            this.sortParticipants();
            this.renderTable();
        });

        // Export functionality
        document.getElementById('exportBtn').addEventListener('click', () => {
            this.exportData();
        });

        // Clear all data
        document.getElementById('clearAllBtn').addEventListener('click', () => {
            this.showConfirmationModal(
                'Clear All Data',
                'Are you sure you want to clear all participant data? This action cannot be undone.',
                () => this.clearAllData()
            );
        });

        // Pagination
        document.getElementById('prevPage').addEventListener('click', () => {
            this.goToPage(this.currentPage - 1);
        });

        document.getElementById('nextPage').addEventListener('click', () => {
            this.goToPage(this.currentPage + 1);
        });

        // Modal functionality
        this.setupModalEventListeners();
    }

    setupModalEventListeners() {
        const modal = document.getElementById('confirmationModal');
        const closeBtn = document.getElementById('closeModal');
        const cancelBtn = document.getElementById('cancelAction');
        const confirmBtn = document.getElementById('confirmAction');

        closeBtn.addEventListener('click', () => this.hideModal());
        cancelBtn.addEventListener('click', () => this.hideModal());
        confirmBtn.addEventListener('click', () => {
            if (this.pendingAction) {
                this.pendingAction();
                this.hideModal();
            }
        });

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.hideModal();
            }
        });
    }

    searchParticipants(searchTerm) {
        const term = searchTerm.toLowerCase();
        this.filteredParticipants = this.participants.filter(participant => 
            participant.name.toLowerCase().includes(term) ||
            participant.email.toLowerCase().includes(term) ||
            participant.phone.includes(term) ||
            participant.branch.toLowerCase().includes(term) ||
            participant.event.toLowerCase().includes(term)
        );
        this.currentPage = 1;
        this.renderTable();
        this.updatePagination();
    }

    applyFilters() {
        const branchFilter = document.getElementById('branchFilter').value;
        const eventFilter = document.getElementById('eventFilter').value;
        const yearFilter = document.getElementById('yearFilter').value;
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();

        this.filteredParticipants = this.participants.filter(participant => {
            const matchesSearch = !searchTerm || 
                participant.name.toLowerCase().includes(searchTerm) ||
                participant.email.toLowerCase().includes(searchTerm) ||
                participant.phone.includes(searchTerm) ||
                participant.branch.toLowerCase().includes(searchTerm) ||
                participant.event.toLowerCase().includes(searchTerm);

            const matchesBranch = !branchFilter || participant.branch === branchFilter;
            const matchesEvent = !eventFilter || participant.event === eventFilter;
            const matchesYear = !yearFilter || participant.year === yearFilter;

            return matchesSearch && matchesBranch && matchesEvent && matchesYear;
        });

        this.currentPage = 1;
        this.sortParticipants();
        this.renderTable();
        this.updatePagination();
    }

    sortParticipants() {
        this.filteredParticipants.sort((a, b) => {
            let aValue, bValue;

            switch (this.sortBy) {
                case 'name':
                    aValue = a.name.toLowerCase();
                    bValue = b.name.toLowerCase();
                    break;
                case 'year':
                    const yearOrder = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate', 'Other'];
                    aValue = yearOrder.indexOf(a.year);
                    bValue = yearOrder.indexOf(b.year);
                    break;
                case 'branch':
                    aValue = a.branch.toLowerCase();
                    bValue = b.branch.toLowerCase();
                    break;
                case 'event':
                    aValue = a.event.toLowerCase();
                    bValue = b.event.toLowerCase();
                    break;
                case 'date':
                    aValue = new Date(a.registrationDate);
                    bValue = new Date(b.registrationDate);
                    break;
                default:
                    aValue = a.name.toLowerCase();
                    bValue = b.name.toLowerCase();
            }

            if (aValue < bValue) return this.sortOrder === 'asc' ? -1 : 1;
            if (aValue > bValue) return this.sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
    }

    renderTable() {
        const tbody = document.getElementById('participantsTableBody');
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const pageParticipants = this.filteredParticipants.slice(startIndex, endIndex);

        if (pageParticipants.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="9" style="text-align: center; padding: 40px; color: #666;">
                        <i class="fas fa-users" style="font-size: 2rem; margin-bottom: 10px; display: block;"></i>
                        No participants found
                    </td>
                </tr>
            `;
        } else {
            tbody.innerHTML = pageParticipants.map(participant => `
                <tr>
                    <td>${participant.name}</td>
                    <td>${participant.email}</td>
                    <td>${participant.phone}</td>
                    <td>${participant.year}</td>
                    <td>${participant.branch}</td>
                    <td>${participant.event}</td>
                    <td>${participant.experience}</td>
                    <td>${this.formatDate(participant.registrationDate)}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="action-btn view" onclick="adminDashboard.viewParticipant('${participant.id}')" title="View Details">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="action-btn edit" onclick="adminDashboard.editParticipant('${participant.id}')" title="Edit">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="action-btn delete" onclick="adminDashboard.deleteParticipant('${participant.id}')" title="Delete">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `).join('');
        }

        this.updateResultsCount();
    }

    updatePagination() {
        const totalPages = Math.ceil(this.filteredParticipants.length / this.itemsPerPage);
        const prevBtn = document.getElementById('prevPage');
        const nextBtn = document.getElementById('nextPage');
        const pageNumbers = document.getElementById('pageNumbers');
        const paginationInfo = document.getElementById('paginationInfo');

        // Update pagination info
        const startIndex = (this.currentPage - 1) * this.itemsPerPage + 1;
        const endIndex = Math.min(this.currentPage * this.itemsPerPage, this.filteredParticipants.length);
        paginationInfo.textContent = `Showing ${startIndex}-${endIndex} of ${this.filteredParticipants.length} participants`;

        // Update button states
        prevBtn.disabled = this.currentPage === 1;
        nextBtn.disabled = this.currentPage === totalPages || totalPages === 0;

        // Generate page numbers
        pageNumbers.innerHTML = '';
        const maxVisiblePages = 5;
        let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `page-number ${i === this.currentPage ? 'active' : ''}`;
            pageBtn.textContent = i;
            pageBtn.addEventListener('click', () => this.goToPage(i));
            pageNumbers.appendChild(pageBtn);
        }
    }

    goToPage(page) {
        const totalPages = Math.ceil(this.filteredParticipants.length / this.itemsPerPage);
        if (page >= 1 && page <= totalPages) {
            this.currentPage = page;
            this.renderTable();
            this.updatePagination();
        }
    }

    updateStatistics() {
        const totalParticipants = this.participants.length;
        const today = new Date().toDateString();
        const todayRegistrations = this.participants.filter(p => 
            new Date(p.registrationDate).toDateString() === today
        ).length;

        // Calculate days remaining
        const deadline = new Date();
        deadline.setDate(deadline.getDate() + 7);
        deadline.setHours(23, 59, 59, 999);
        const now = new Date();
        const daysRemaining = Math.max(0, Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

        document.getElementById('totalParticipants').textContent = totalParticipants;
        document.getElementById('todayRegistrations').textContent = todayRegistrations;
        document.getElementById('deadlineStatus').textContent = `${daysRemaining} days`;
    }

    updateResultsCount() {
        const count = this.filteredParticipants.length;
        document.getElementById('resultsCount').textContent = `${count} participant${count !== 1 ? 's' : ''} found`;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    viewParticipant(id) {
        const participant = this.participants.find(p => p.id === id);
        if (participant) {
            const details = `
                <strong>Name:</strong> ${participant.name}<br>
                <strong>Email:</strong> ${participant.email}<br>
                <strong>Phone:</strong> ${participant.phone}<br>
                <strong>Year:</strong> ${participant.year}<br>
                <strong>Branch:</strong> ${participant.branch}<br>
                <strong>Event:</strong> ${participant.event}<br>
                <strong>Experience:</strong> ${participant.experience}<br>
                <strong>Comments:</strong> ${participant.comments || 'None'}<br>
                <strong>Registration Date:</strong> ${this.formatDate(participant.registrationDate)}
            `;
            this.showConfirmationModal(
                'Participant Details',
                details,
                null,
                'Close'
            );
        }
    }

    editParticipant(id) {
        // For now, just show a message. In a real application, this would open an edit form
        alert('Edit functionality would be implemented here. For now, you can delete and re-register the participant.');
    }

    deleteParticipant(id) {
        const participant = this.participants.find(p => p.id === id);
        if (participant) {
            this.showConfirmationModal(
                'Delete Participant',
                `Are you sure you want to delete ${participant.name}? This action cannot be undone.`,
                () => {
                    this.participants = this.participants.filter(p => p.id !== id);
                    localStorage.setItem('participants', JSON.stringify(this.participants));
                    this.filteredParticipants = this.filteredParticipants.filter(p => p.id !== id);
                    this.updateStatistics();
                    this.renderTable();
                    this.updatePagination();
                }
            );
        }
    }

    exportData() {
        const dataStr = JSON.stringify(this.participants, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `techfest-participants-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    clearAllData() {
        this.participants = [];
        this.filteredParticipants = [];
        localStorage.removeItem('participants');
        this.updateStatistics();
        this.renderTable();
        this.updatePagination();
    }

    showConfirmationModal(title, message, onConfirm, confirmText = 'Confirm') {
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalMessage').innerHTML = message;
        document.getElementById('confirmAction').textContent = confirmText;
        
        if (onConfirm) {
            this.pendingAction = onConfirm;
            document.getElementById('confirmAction').style.display = 'inline-flex';
        } else {
            this.pendingAction = null;
            document.getElementById('confirmAction').style.display = 'none';
        }

        document.getElementById('confirmationModal').classList.add('show');
    }

    hideModal() {
        document.getElementById('confirmationModal').classList.remove('show');
        this.pendingAction = null;
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
let adminDashboard;
document.addEventListener('DOMContentLoaded', () => {
    adminDashboard = new AdminDashboard();
    new MobileNavigation();
});

// Refresh data every 30 seconds to keep statistics updated
setInterval(() => {
    if (adminDashboard) {
        adminDashboard.participants = JSON.parse(localStorage.getItem('participants')) || [];
        adminDashboard.updateStatistics();
    }
}, 30000);
