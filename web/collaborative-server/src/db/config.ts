// src/db/config.ts
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'yoopta_collab',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  retry: {
    max: 5,
    match: [/SequelizeConnectionError/],
    backoffBase: 1000,
    backoffExponent: 1.5,
  },
});

export async function initializeDatabase() {
  try {
    await sequelize.query(`
      SELECT 'CREATE DATABASE yoopta_collab'
      WHERE NOT EXISTS (
        SELECT FROM pg_database WHERE datname = 'yoopta_collab'
      )
    `);

    await sequelize.sync({ force: false });

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
}

export async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
}
