import express from 'express';
import {
  createJourney,
  getAllJourneys,
  getJourneyById,
  updateJourney,
  deleteJourney,
  generateManifest,
} from '../app/controllers/journeyController.js';
import { submitJourneyReport } from '../app/controllers/reportController.js';
import { authMiddleware, adminMiddleware, adminMiddlewareOrDriverMiddleware } from '../app/middlewares/authMiddleware.js';

const router = express.Router();

// routes for managing journeys
router.post('/', authMiddleware, adminMiddleware, createJourney); 
router.get('/', authMiddleware, getAllJourneys); 
router.get('/:id', authMiddleware, getJourneyById); 
router.put('/:id', authMiddleware, adminMiddleware, updateJourney); 
router.delete('/:id', authMiddleware, adminMiddleware, deleteJourney);
router.get('/:id/manifest', authMiddleware, adminMiddleware, generateManifest);
router.post('/:journeyId/report', authMiddleware, adminMiddlewareOrDriverMiddleware, submitJourneyReport )

export default router;
