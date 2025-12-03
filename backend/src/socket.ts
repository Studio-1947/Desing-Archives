import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';

let io: Server;

export const initSocket = (httpServer: HttpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: '*', // Allow all origins for now, restrict in production
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket: Socket) => {
    console.log('Client connected:', socket.id);

    socket.on('join_challenge', (challengeId: string) => {
      socket.join(`challenge_${challengeId}`);
      console.log(`Socket ${socket.id} joined challenge_${challengeId}`);
    });

    socket.on('leave_challenge', (challengeId: string) => {
      socket.leave(`challenge_${challengeId}`);
      console.log(`Socket ${socket.id} left challenge_${challengeId}`);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
};
