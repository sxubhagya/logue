import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { WebSocketServer } from 'ws';
import http from 'http';
import authRoutes from './routes/auth';
import documentRoutes from './routes/documents';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Create HTTP server
const server = http.createServer(app);

// WebSocket server for Yjs collaboration
const wss = new WebSocketServer({ 
  server,
  path: '/collaboration'
});

// Set up y-websocket server
// Note: y-websocket doesn't have TypeScript declarations
const { setupWSConnection } = require('y-websocket/bin/utils');

wss.on('connection', (ws, req) => {
  console.log('WebSocket connection established');
  setupWSConnection(ws, req);
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`WebSocket server running on ws://localhost:${PORT}/collaboration`);
});
