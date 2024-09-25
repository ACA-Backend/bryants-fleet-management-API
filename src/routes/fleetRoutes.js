import express from 'express';
import {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} from '../app/controllers/fleetController.js';
import { authMiddleware, adminMiddleware } from '../app/middlewares/authMiddleware.js'; 

const router = express.Router();

// Admin only routes
router.post('/', authMiddleware, adminMiddleware, createVehicle);
router.get('/', authMiddleware, adminMiddleware, getAllVehicles);
router.get('/:id', authMiddleware, adminMiddleware, getVehicleById);
router.put('/:id', authMiddleware, adminMiddleware, updateVehicle);
router.delete('/:id', authMiddleware, adminMiddleware, deleteVehicle);

export default router;
