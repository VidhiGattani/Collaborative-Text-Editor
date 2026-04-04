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

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database (or Neon DB)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/VidhiGattani/Collaborative-Text-Editor.git
   cd Collaborative-Text-Editor/client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the `client` directory:
   ```
   DATABASE_URL=your_postgresql_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## Usage

### Creating a Document
1. Log in or sign up with your credentials
2. Click "Create Document" on the home page
3. Start typing and formatting your document
4. Share the document code or link with collaborators

### Joining a Document
1. Log in to your account
2. On the home page, paste the document code
3. Click "Join Document"
4. You'll now see real-time updates as collaborators edit

### Sharing
1. Open a document you created
2. Click "Copy Code" to copy the document ID
3. Share this code with collaborators
4. Alternatively, click "Copy Link" to get the full shareable URL

## Architecture

```
Collaborative-Text-Editor/
├── client/                          # Next.js application
│   ├── app/
│   │   ├── page.tsx                # Home page with create/join
│   │   ├── login/page.tsx          # Login page
│   │   ├── signup/page.tsx         # Signup page
│   │   ├── doc/[docId]/page.tsx    # Editor view
│   │   ├── api/
│   │   │   ├── login/route.js      # Auth endpoint
│   │   │   ├── signup/route.js     # Registration endpoint
│   │   │   └── document/route.js   # Document persistence
│   │   └── globals.css
│   ├── components/
│   │   └── Editor.js               # TipTap editor with collaboration
│   ├── lib/
│   │   └── db.js                   # PostgreSQL connection pool
│   ├── public/
│   └── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/signup` - Register new user
  - Body: `{ email, password }`
  - Response: `{ message }`

- `POST /api/login` - Login user
  - Body: `{ email, password }`
  - Response: `{ token }`

### Documents
- `GET /api/document?id={docId}` - Fetch document content
  - Response: `{ content, docId }`

- `POST /api/document` - Save document content
  - Body: `{ docId, content }`
  - Response: `{ message }`

## Deployment

### Deploy to Vercel

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables:
     - `DATABASE_URL`: Your PostgreSQL connection string
     - `JWT_SECRET`: Your JWT secret key

3. **Deploy:**
   - Vercel will automatically build and deploy on push

### Database Setup (Neon)

1. Create a PostgreSQL database at [neon.tech](https://neon.tech)
2. Run the schema:
   ```sql
   CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     email VARCHAR(255) UNIQUE NOT NULL,
     password VARCHAR(255) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   CREATE TABLE documents (
     id VARCHAR(255) PRIMARY KEY,
     content TEXT,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   CREATE INDEX idx_users_email ON users(email);
   CREATE INDEX idx_documents_created ON documents(created_at);
   ```

3. Update `DATABASE_URL` in your environment variables

## Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Run production server
npm run lint     # Run ESLint
```

### Configuration Files
- `next.config.js` - Next.js configuration with external package setup
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.mjs` - PostCSS configuration
- `tsconfig.json` - TypeScript configuration

## Performance Optimizations

- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based code splitting
- **Lazy Loading**: Components loaded on-demand
- **Externals**: Node modules configured for optimal bundling
- **Conflict Resolution**: Yjs handles merge conflicts automatically

## Security Features

- JWT-based authentication with 7-day expiry
- Bcryptjs password hashing (10 salt rounds)
- Secure API endpoints protected by token verification
- Environment variable protection for sensitive data
- LocalStorage for token management

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Known Limitations

- Documents are stored as plain text (no version history yet)
- No user permissions system (all authenticated users can access shared documents)
- No rich media support (images, videos)
- Limited to one server instance

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Roadmap

- [ ] Version history and document recovery
- [ ] User roles and permissions (editor, viewer, admin)
- [ ] Rich media support (images, embeds)
- [ ] Document export (PDF, Word, Markdown)
- [ ] User presence indicators
- [ ] Comments and annotations
- [ ] Offline support with service workers
- [ ] Mobile app support

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Getting Help

- **Issues**: [Create an issue](https://github.com/VidhiGattani/Collaborative-Text-Editor/issues)
- **Email**: For direct inquiries, contact the maintainers

## Acknowledgments

- [TipTap](https://tiptap.dev/) - Rich text editor framework
- [Yjs](https://docs.yjs.dev/) - Conflict-free editing
- [HocusPocus](https://hocuspocus.dev/) - Real-time collaboration provider
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS

---

**Built for:** Hackathon 2026

**Status:** Production Ready ✅
