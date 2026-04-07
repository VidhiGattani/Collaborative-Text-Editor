# Collaborative Text Editor

A real-time collaborative text editor built with Next.js, React, and WebSocket technology. Multiple users can simultaneously edit documents, see live changes, and share links to collaborate seamlessly.

![Next.js](https://img.shields.io/badge/Next.js-16.2.2-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.4-blue?style=flat-square&logo=react)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-blue?style=flat-square&logo=postgresql)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## Features

✨ **Real-Time Collaboration**
- Live document updates across multiple users
- Powered by Yjs for conflict-free distributed editing
- WebSocket integration via HocusPocus for instant synchronization

📝 **Rich Text Editing**
- Built on TipTap editor framework
- Complete formatting toolbar support
- Markdown and HTML support

🔐 **Secure Authentication**
- User registration and login system
- JWT-based authentication
- Password hashing with bcryptjs

📎 **Document Management**
- Create and share documents with unique codes
- Join existing documents with document codes
- Copy shareable links for easy collaboration
- Persistent storage with PostgreSQL

🎨 **Modern UI**
- Clean, responsive design with Tailwind CSS
- Dark theme by default
- Optimized for desktop and tablet viewing

## Tech Stack

**Frontend:**
- Next.js 16 (React 19)
- TipTap Editor with Collaboration Extension
- Tailwind CSS for styling
- TypeScript for type safety

**Backend:**
- Next.js API Routes
- Node.js runtime
- PostgreSQL (Neon DB) for data persistence

**Real-Time Collaboration:**
- Yjs for conflict-free editing
- HocusPocus provider for WebSocket communication
- Automatic sync and conflict resolution

**Authentication & Security:**
- bcryptjs for password hashing
- jsonwebtoken (JWT) for session management
- Secure token storage in localStorage
---

## API Endpoints

### Authentication
- POST /api/signup
- POST /api/login

### Documents
- GET /api/document?id={docId}
- POST /api/document

---

## Deployment

- Fully deployed on Vercel
- Connected with PostgreSQL (Neon DB)
- Environment variables managed securely

---
## 🌐 Live Demo

🚀 Try the project here:  
👉 https://gattani-09-2q47vmn9p-vidhigattanis-projects.vercel.app/

---


