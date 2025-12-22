import "dotenv/config";

const startGrpcServer = () => {};

const startServer = async () => {
  try {
    console.log("Starting user service...");

    startGrpcServer();
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
