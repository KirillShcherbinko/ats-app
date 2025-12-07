import 'dotenv/config';
import { startGrpcServer } from './server';
import { seedDatabase } from './model/seed';

const startServer = async () => {
  try {
    console.log('Starting user service...');
    
    // Seed database with initial roles if needed
    await seedDatabase();
    console.log('Database seeded successfully');
    
    // Start gRPC server
    startGrpcServer();
    
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();