import app from './app.js';
import { connectToDb } from './src/db/connect.js';

const PORT = process.env.PORT;

if (!PORT) {
  throw new Error('PORT environment variable is required.');
}

const startServer = async () => {
  try {
    await connectToDb();

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`CSE 341 Books API running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error.message);
    process.exit(1);
  }
};

startServer();
