import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import ORoutes from './routes/organisationRoutes';
import './config/database';  // Connect to MongoDB

const app = express();
app.use(cors()); // Enable CORS

app.use(express.json());

app.use('/', ORoutes);

export default app;