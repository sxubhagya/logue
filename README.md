# Logue

Real-time collaborative screenwriting editor built with modern web technologies.

## Project Structure

This is a monorepo managed with pnpm and Turborepo:

```
logue/
├── apps/
│   ├── web/          # Next.js 14 frontend
│   └── server/       # Node.js + Express backend
└── packages/
    └── shared/       # Shared TypeScript types
```

## Tech Stack

### Frontend (apps/web)
- **Next.js 14** - React framework with App Router
- **React** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Tiptap/ProseMirror** - Rich text editor
- **Yjs** - Real-time collaboration (client)

### Backend (apps/server)
- **Node.js** - Runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **y-websocket** - WebSocket server for Yjs
- **PostgreSQL** - Database
- **JWT** - Authentication

### Shared (packages/shared)
- **TypeScript** - Shared type definitions

## Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- PostgreSQL (for production use)

## Getting Started

### Installation

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build
```

### Development

```bash
# Run all apps in development mode
pnpm dev
```

This will start:
- Web app at http://localhost:3000
- Server at http://localhost:3001
- WebSocket server at ws://localhost:3001/collaboration

### Individual Apps

```bash
# Run only the web app
cd apps/web
pnpm dev

# Run only the server
cd apps/server
pnpm dev
```

## Database Setup

1. Create a PostgreSQL database:
```bash
createdb logue
```

2. Run the schema:
```bash
psql logue < apps/server/schema.sql
```

3. Configure environment variables:
```bash
# In apps/server/.env
cp apps/server/.env.example apps/server/.env
# Edit DATABASE_URL and JWT_SECRET
```

## Features

- ✅ Real-time collaborative editing with Yjs
- ✅ Rich text editor powered by Tiptap
- ✅ User authentication with JWT
- ✅ Document management (CRUD)
- ✅ WebSocket-based real-time sync
- ✅ Responsive UI with Tailwind CSS
- ✅ Monorepo structure with pnpm + Turborepo

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Documents
- `GET /api/documents` - List all documents (authenticated)
- `GET /api/documents/:id` - Get document (authenticated)
- `POST /api/documents` - Create document (authenticated)
- `PUT /api/documents/:id` - Update document (authenticated)
- `DELETE /api/documents/:id` - Delete document (authenticated)

### Health
- `GET /health` - Health check

## Scripts

```bash
# Development
pnpm dev          # Start all apps in dev mode

# Build
pnpm build        # Build all packages and apps

# Lint
pnpm lint         # Lint all packages and apps

# Clean
pnpm clean        # Clean all build artifacts
```

## License

MIT
