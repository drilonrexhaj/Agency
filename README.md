# N'HAP Agency - Modern Landing Page

A luxury digital marketing agency landing page with contact form and admin dashboard, built with vanilla HTML, CSS, and JavaScript.

## 🎨 Features

### Frontend
- **Modern Design**: Dark violet/blue gradient theme with glassmorphism effects
- **Responsive**: Fully responsive (mobile, tablet, desktop)
- **8 Key Sections**: Hero, Services, Pricing, About, Contact, Footer, etc.
- **Animations**: Smooth scroll-reveal animations and micro-interactions
- **Contact Form**: Built-in validation with localStorage fallback

### Admin Dashboard
- Message list view with filtering (All/Unread/Read)
- Message detail modal with full content
- Mark as read/unread and delete functionality
- localStorage persistence
- 8 sample messages for testing

### Backend (Youware Backend Ready)
- Cloudflare Workers API setup
- D1 Database schema configured
- 4 RESTful API endpoints
- CORS enabled
- TypeScript implementation

## 🚀 Quick Start

### Open Landing Page
```bash
# Simply open in browser
open index.html

# Or use a local server
python -m http.server 8000
# Visit: http://localhost:8000
```

### Access Admin Dashboard
```bash
# Open admin interface
open admin.html

# Sample data is pre-loaded in localStorage
# To reset: Clear browser localStorage
```

### Backend Setup
```bash
cd backend
npm install
npm run build      # Verify build
npm run deploy     # Deploy to Youware Backend
```

## 📁 Project Structure

```
.
├── index.html              # Main landing page
├── stili.css              # All styles (responsive, animated)
├── admin.html             # Admin dashboard
├── admin.css              # Admin styling
├── admin.js               # Admin logic & state management
├── .gitignore             # Git ignore rules
├── YOUWARE.md             # Developer documentation
├── yw_manifest.json       # Youware Backend config
├── backend/               # Cloudflare Workers
│   ├── src/index.ts       # API endpoints
│   ├── schema.sql         # Database schema
│   ├── wrangler.toml      # Worker config
│   └── package.json       # Dependencies
└── foto/                  # Assets (logo, images)
```

## 🎯 API Endpoints

All endpoints require backend deployment:

- `POST /api/contact` - Submit contact form
- `GET /api/contact/messages` - Get all messages (admin)
- `PUT /api/contact/{id}` - Update message status (admin)
- `DELETE /api/contact/{id}` - Delete message (admin)

## 🛠 Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Icons**: HugeIcons (CDN)
- **Images**: Pixabay (CDN)
- **Backend**: Cloudflare Workers + D1 Database
- **Configuration**: yw_manifest.json for Youware Backend

## 💾 Database

### contact_messages Table
```sql
CREATE TABLE contact_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'unread',
  ip_address TEXT,
  user_agent TEXT
);
```

## 🎨 Design System

### Colors
- **Primary**: #b901b0 (vibrant purple)
- **Dark**: #9a0a8a, #1a0033, #0f0f23
- **Text**: #1e293b, #64748b

### Responsive Breakpoints
- Desktop: 1200px+
- Tablet: 768px–1199px
- Mobile: < 768px
- Small Mobile: < 480px

## 📚 Documentation

For detailed developer documentation, see [YOUWARE.md](./YOUWARE.md)

## 🚀 Deployment Options

1. **Youware Backend** (Recommended)
   - Deploy backend: `cd backend && npm run deploy`
   - Configure yw_manifest.json

2. **Static Hosting** (Netlify, Vercel, GitHub Pages)
   - Push index.html + CSS + JS files
   - Works without backend (uses localStorage fallback)

3. **Self-Hosted**
   - Use any web server (nginx, Apache)
   - Deploy backend separately if using API

## 📝 Development Workflow

1. **Edit Frontend**: Modify index.html, admin.html, stili.css, admin.js
2. **Test Locally**: Open files in browser or use local server
3. **Backend**: Edit backend/src/index.ts and deploy when ready
4. **Version Control**: Commit changes to Git repository
5. **Deploy**: Push to hosting platform

## 🔄 Feature Status

- ✅ Landing page (100% complete)
- ✅ Admin dashboard (100% complete)
- ✅ Backend API (ready for deployment)
- ✅ Youware Backend configuration (complete)
- ⏳ Database deployment (pending Youware Backend setup)
- 🔜 Admin authentication (next phase)
- 🔜 Email notifications (next phase)

## 📞 Contact & Support

For issues or customization:
- Check browser console for errors (F12)
- Review YOUWARE.md for architecture details
- Validate HTML/CSS syntax
- Test on real devices for responsive design

## 📄 License

All code is for N'HAP Agency. Brand colors and messaging are proprietary.

---

**Last Updated**: 2025-11-07  
**Status**: Production Ready MVP  
**Language**: Albanian (Shqip)
