import dotenv from 'dotenv';
import { sequelize } from './config/dbConfig.js';
import app from './bootstrap/server.js';

dotenv.config();
const PORT = process.env.PORT || 5432;

// Sync the database and start the server
const startServer = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Database synced");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error syncing database:", error);
  }
};

startServer();

