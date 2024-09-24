import { Sequelize } from 'sequelize';
import { config } from 'dotenv';

// Initialize environment variables
config();

let sequelize; // Declare sequelize globally for default export

const initializeDatabaseConnection = (env) => {
  const { DATABASE_URL,
     STAGING_DATABASE_URL,
      TEST_DATABASE_URL,
       DB_NAME, DB_USER,
        DB_PASSWORD,
         DB_HOST } = process.env;

  let databaseUrl;

  switch (env) {
    case 'production':
      databaseUrl = DATABASE_URL;
      break;
    case 'staging':
      databaseUrl = STAGING_DATABASE_URL;
      break;
    case 'test':
      databaseUrl = TEST_DATABASE_URL;
      break;
    default:
      databaseUrl = DATABASE_URL;
  }

  // Initialize sequelize based on the available configurations
  const sequelize = databaseUrl
    ? new Sequelize(databaseUrl, { dialect: 'postgres', logging: false })
    : new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
        host: DB_HOST,
        dialect: 'postgres',
        logging: false,
      });

  // Authenticate the connection
  sequelize.authenticate()
    .then(() => {
      console.log('Successfully connected to the database.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });

  return sequelize;
};

// Wipe all tables in the database
const wipeDatabaseTables = async (sequelize) => {
  try {
    await sequelize.drop();  // Drop all tables
    console.log('All tables dropped successfully (Database wiped)');
  } catch (error) {
    console.error('Error wiping database tables:', error);
  }
};

// Connect to the database (for default usage)
const connectDB = async () => {
  if (!sequelize) {
    throw new Error('Sequelize instance is not initialized. Call initializeDatabaseConnection first.');
  }
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export { initializeDatabaseConnection, wipeDatabaseTables, connectDB, sequelize };


