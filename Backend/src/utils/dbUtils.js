import { pool } from '../config/db.js';
// import { db } from '../config/db.js';

const resumeTableQuery = `
  CREATE TABLE IF NOT EXISTS resumes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    summary TEXT,
    address TEXT,
    education TEXT,
    experience TEXT,
    skills TEXT
  )
`;

const userTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL, 
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`;

const postTableQuery = `
    CREATE TABLE IF NOT EXISTS posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`;

const createTable = async (tableName, query) => {
    try {
        await pool.query(query);
        console.log(`${tableName} table created or already exists`);
    } catch (error) {
        console.log(`Error creating ${tableName}:`, error);   
    }
};

const createAllTable = async () => {
    try {
        await createTable("Resumes", resumeTableQuery);
        await createTable("Users", userTableQuery);
        await createTable("Posts", postTableQuery);
        console.log("All tables created successfully!!");
    } catch (error) {
        console.log("Error creating tables:", error);
        throw error;
    }
};

export default createAllTable;
