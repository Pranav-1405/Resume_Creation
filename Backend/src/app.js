import express from 'express';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';

import { checkConnection } from './config/db.js';
import createAllTable from './utils/dbUtils.js';

const app = express();

// Middleware
app.use(cors({
  origin: ["http://localhost:5173","http://localhost:5174"], 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());


app.use('/api', resumeRoutes);
app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);


app.listen(3000, async () => {
  console.log('Server is running on port 3000');
  try {
    await checkConnection();
    await createAllTable();
  } catch (error) {
    console.error("Failed to initialize database", error);
  }
});