import 'dotenv/config';
import { startGrpcServer } from './grpc/server';
import { seedDatabase } from './db/seed';

const startServer = async () => {
  try {
    console.log('Starting user service...');
    
    await seedDatabase();
    console.log('Database seeded successfully');
    
    startGrpcServer();
    
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();