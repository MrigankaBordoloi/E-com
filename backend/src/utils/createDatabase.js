const mysql = require('mysql2/promise');
require('dotenv').config();

const createDatabase = async () => {
    try {
        // Connect without database
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        });

        console.log('📡 Connected to MySQL server');

        // Create database
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
        console.log(`✅ Database '${process.env.DB_NAME}' created successfully`);

        await connection.end();
        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating database:', error);
        process.exit(1);
    }
};

createDatabase();
