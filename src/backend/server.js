import { app } from './app.js'; // Use import statement

import http from 'http';

// const IP = process.env.IPADDRESS || "192.168.3.2";
const PORT = process.env.BACKEND_PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server started and is listening on port ${PORT}`);
});

const closeServer = () => {
  server.close(() => {
    process.exit(1);
  });
}

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  closeServer();
});

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
  closeServer();
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Shutting down gracefully...');
  server.close(() => {
    console.log('HTTP server closed.');
    process.exit(0);
  });
});
