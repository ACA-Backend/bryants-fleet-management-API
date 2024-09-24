import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from '../routes/authRoutes.js';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import listRoutes from 'express-list-routes';
import { connectDB } from '../config/dbConfig.js';
// import other routes

const app = express();


// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(compression());
app.use(morgan('dev'));
app.use(helmet());

connectDB();

// Routes
app.use('/auth', authRoutes);
// app.use other routes

export default (app ,server);
