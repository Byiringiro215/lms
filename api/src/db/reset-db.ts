import 'dotenv/config';
import { dataSource } from '../data-source';

async function resetDatabase() {
  try {
    // Initialize the data source
    await dataSource.initialize();
    console.log('Data source initialized');

    // Drop all tables
    console.log('Dropping all tables...');
    await dataSource.dropDatabase();
    console.log('All tables dropped successfully');

    // Run migrations
    console.log('Running migrations...');
    await dataSource.runMigrations();
    console.log('Migrations completed successfully');

    // Close the connection
    await dataSource.destroy();
    console.log('Database reset completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error during database reset:', error);
    process.exit(1);
  }
}

resetDatabase()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error during database reset:', error);
    process.exit(1);
  });
