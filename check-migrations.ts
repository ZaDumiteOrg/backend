import { AppDataSource } from './src/data-source';

async function checkMigrations() {
  await AppDataSource.initialize();
  console.log('Loaded Migrations:', AppDataSource.migrations);
}

checkMigrations().catch((error) => console.error('Error:', error));
