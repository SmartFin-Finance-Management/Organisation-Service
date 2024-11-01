import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import ORoutes from './routes/organisationRoutes';
import './config/database';  // Connect to MongoDB

const app = express();
  
// Enable CORS
app.use(cors());
// app.use(cors({ origin: 'http://localhost:2000' }));

app.use(express.json());

app.use('/', ORoutes);

export default app;