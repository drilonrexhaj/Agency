// Mock Data - 8 sample contact messages
const mockData = [
    {
        id: 1,
        name: "Arben Duka",
        email: "arben.duka@email.com",
        phone: "+355 69 123 4567",
        message: "Intereson më të dëgjoj më shumë për shërbimin e Web Development. A mund të organizohet një takim?",
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        read: false,
        ip_address: "192.168.1.101",
        user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
    },
    {
        id: 2,
        name: "Lena Saliaj",
        email: "lena.saliaj@company.com",
        phone: "+355 68 987 6543",
        message: "Ne jemi startup në fushen e tech dhe na nevojitet strategji marketing. Cili është çmimi për paketën Branding?",
        created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        read: true,
        ip_address: "192.168.1.102",
        user_agent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X)"
    },
    {
        id: 3,
        name: "Gent Roci",
        email: "gent@business.al",
        phone: "+355 67 234 5678",
        message: "Dua të rrisin presencën time në social media. Si mund të fillojmë?",
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        read: false,
        ip_address: "192.168.1.103",
        user_agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"
    },
    {
        id: 4,
        name: "Vera Krasniqi",
        email: "vera.krasniqi@marketing.com",
        phone: "+355 69 555 8901",
        message: "Kërkojmë partner për videography për produktin tonë të ri. Çfarë është procesi?",
        created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        read: true,
        ip_address: "192.168.1.104",
        user_agent: "Mozilla/5.0 (X11; Linux x86_64)"
    },
    {
        id: 5,
        name: "Ilir Hasani",
        email: "ilir.hasani@shop.al",
        phone: "+355 68 765 4321",
        message: "Ndirmjet se produktet tona janë në e-commerce. A kemi nevojë për security audit?",
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        read: false,
        ip_address: "192.168.1.105",
        user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
    },
    {
        id: 6,
        name: "Fiona Doda",
        email: "fiona@design.com",
        phone: "+355 67 890 1234",
        message: "Supruese të dizajnit të ri të website. Mund të shikojmë portfolio tuaj?",
        created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        read: false,
        ip_address: "192.168.1.106",
        user_agent: "Mozilla/5.0 (iPhone; CPU iPhone OS 15_1 like Mac OS X)"
    },
    {
        id: 7,
        name: "Niko Prifti",
        email: "niko@enterprise.al",
        phone: "+355 69 432 1098",
        message: "Drejtori i shitjeve në kompani të madhe. Duam të diskutojmë package B-to-B. Kur mund të takohemi?",
        created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        read: true,
        ip_address: "192.168.1.107",
        user_agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"
    },
    {
        id: 8,
        name: "Arta Mehllapi",
        email: "arta@nonprofit.org",
        phone: "+355 68 321 0987",
        message: "ONG-ja jonë ka një event të madh. Na nevojitet help me social media coverage për dy ditë.",
        created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        read: false,
        ip_address: "192.168.1.108",
        user_agent: "Mozilla/5.0 (Android 11; Mobile; rv:88.0)"
    }
];

// State Management
let messages = [];
let currentFilter = 'all';
let currentMessageId = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadMessages();
    renderMessages();
    setupEventListeners();
});

// Load messages from localStorage or use mock data
function loadMessages() {
    const stored = localStorage.getItem('adminMessages');
    if (stored) {
        messages = JSON.parse(stored);
    } else {
        messages = JSON.parse(JSON.stringify(mockData));
        saveMessages();
    }
}

// Save messages to localStorage
function saveMessages() {
    localStorage.setItem('adminMessages', JSON.stringify(messages));
}

// Get filtered messages
function getFilteredMessages() {
    if (currentFilter === 'all') {
        return messages;
    }
    return messages.filter(msg => 
        currentFilter === 'read' ? msg.read : !msg.read
    );
}

// Render all messages
function renderMessages() {
    const messagesList = document.getElementById('messagesList');
    const emptyState = document.getElementById('emptyState');
    
    const filtered = getFilteredMessages();
    
    if (filtered.length === 0) {
        messagesList.innerHTML = '';
        emptyState.style.display = 'flex';
        return;
    }
    
    emptyState.style.display = 'none';
    messagesList.innerHTML = filtered.map(msg => createMessageCard(msg)).join('');
    
    // Add click listeners to cards
    document.querySelectorAll('.message-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = parseInt(card.dataset.id);
            openMessageModal(id);
        });
    });
}

// Create message card HTML
function createMessageCard(msg) {
    const date = formatDate(msg.created_at);
    const status = msg.read ? 'Lexuar' : 'E Reja';
    const badgeClass = msg.read ? 'read' : 'unread';
    
    return `
        <div class="message-card ${badgeClass}" data-id="${msg.id}">
            <div class="message-card-status">
                <i class="hi hi-inbox"></i>
            </div>
            <div class="message-card-content">
                <div class="message-card-header">
                    <span class="message-card-name">${escapeHtml(msg.name)}</span>
                    <span class="message-card-date">${date}</span>
                </div>
                <div class="message-card-email">${escapeHtml(msg.email)}</div>
                <div class="message-card-preview">${escapeHtml(msg.message)}</div>
                <span class="message-card-badge">${status}</span>
            </div>
        </div>
    `;
}

// Open message modal with details
function openMessageModal(id) {
    const msg = messages.find(m => m.id === id);
    if (!msg) return;
    
    currentMessageId = id;
    
    // Populate modal
    document.getElementById('modalName').textContent = msg.name;
    document.getElementById('modalEmail').textContent = msg.email;
    document.getElementById('modalPhone').textContent = msg.phone || 'Nuk është dhënë';
    document.getElementById('modalMessage').textContent = msg.message;
    document.getElementById('modalDate').textContent = formatDate(msg.created_at);
    
    // Update button text
    const markReadBtn = document.getElementById('markReadBtn');
    markReadBtn.textContent = msg.read ? 'Shëno si E Palexuar' : 'Shëno si Lexuar';
    
    // Show modal
    document.getElementById('messageModal').classList.add('active');
}

// Close modal
function closeModal() {
    document.getElementById('messageModal').classList.remove('active');
    currentMessageId = null;
}

// Mark as read/unread
function toggleReadStatus() {
    const msg = messages.find(m => m.id === currentMessageId);
    if (msg) {
        msg.read = !msg.read;
        saveMessages();
        renderMessages();
        closeModal();
    }
}

// Delete message
function deleteMessage() {
    if (!confirm('A jeni i sigurt që dëshironi ta fshini këtë mesazh?')) {
        return;
    }
    
    messages = messages.filter(m => m.id !== currentMessageId);
    saveMessages();
    renderMessages();
    closeModal();
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 60) {
        return `${minutes} min më parë`;
    } else if (hours < 24) {
        return `${hours} orë më parë`;
    } else if (days < 7) {
        return `${days} ditë më parë`;
    } else {
        return date.toLocaleDateString('sq-AL', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderMessages();
        });
    });
    
    // Modal close buttons
    document.querySelector('.modal-close').addEventListener('click', closeModal);
    document.querySelector('.modal-close-btn').addEventListener('click', closeModal);
    document.getElementById('messageModal').addEventListener('click', (e) => {
        if (e.target.id === 'messageModal') {
            closeModal();
        }
    });
    
    // Modal actions
    document.getElementById('markReadBtn').addEventListener('click', toggleReadStatus);
    document.getElementById('deleteBtn').addEventListener('click', deleteMessage);
    
    // Keyboard shortcut
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}
