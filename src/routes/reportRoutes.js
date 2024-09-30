import express from 'express';
import { createReport, getReportsByJourney } from '../app/controllers/reportController.js';
import { authMiddleware, driverMiddleware, adminMiddleware } from '../app/middlewares/authMiddleware.js';

const router = express.Router();

// Routes for creating and fetching reports
router.post('/', authMiddleware, driverMiddleware, createReport); // Only drivers can create reports
router.get('/:journeyId', authMiddleware, adminMiddleware, getReportsByJourney); // Admin can view all reports for a journey

export default router;
