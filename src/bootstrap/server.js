import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from '../routes/authRoutes.js';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import listRoutes from 'express-list-routes';
import { connectDB } from '../config/dbConfig.js';
import fleetRoutes from '../routes/fleetRoutes.js';
import journeyRoutes from '../routes/journeyRoutes.js'
import ticketRoutes from '../app/models/ticketRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import financialRoutes from '../routes/financialRoutes.js';

const app = express();


// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(compression());
app.use(morgan('dev'));
app.use(helmet());

connectDB();

// register Routes
app.use('/auth', authRoutes);
app.use('/api/fleet',fleetRoutes);
app.use('/api/journeys', journeyRoutes);
app.use('/api/tickets',ticketRoutes);
app.use('api/reports', reportRoutes);
app.use('/api/financial', financialRoutes);

//starting the server
const PORT = process.env.PORT || 5432;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});

export default (app ,server);
