import express from 'express';
import {
  createJourney,
  getAllJourneys,
  getJourneyById,
  updateJourney,
  deleteJourney,
} from '../app/controllers/journeyController.js';
import { authMiddleware, adminMiddleware } from '../app/middlewares/authMiddleware.js';

const router = express.Router();

// Admin routes for managing journeys
router.post('/', authMiddleware, adminMiddleware, createJourney); 
router.get('/', authMiddleware, getAllJourneys); 
router.get('/:id', authMiddleware, getJourneyById); 
router.put('/:id', authMiddleware, adminMiddleware, updateJourney); 
router.delete('/:id', authMiddleware, adminMiddleware, deleteJourney);

export default router;
