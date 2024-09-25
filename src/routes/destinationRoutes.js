import express from 'express';
import {
  createDestination,
  getAllDestinations,
  getDestinationById,
  updateDestination,
  deleteDestination,
} from '../app/controllers/destinationController.js';
import { authMiddleware, adminMiddleware } from '../app/middlewares/authMiddleware.js';

const router = express.Router();

// Admin routes for managing destinations
router.post('/', authMiddleware, adminMiddleware, createDestination);
router.get('/', authMiddleware, getAllDestinations); 
router.get('/:id', authMiddleware, getDestinationById); 
router.put('/:id', authMiddleware, adminMiddleware, updateDestination); 
router.delete('/:id', authMiddleware, adminMiddleware, deleteDestination);

export default router;

