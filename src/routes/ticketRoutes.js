import express from 'express';
import { bookTicket, getUserTickets, cancelTicket } from '../app/controllers/ticketController.js';
import { authMiddleware } from '../app/middlewares/authMiddleware.js';

const router = express.Router();

// User routes for booking and managing tickets
router.post('/book', authMiddleware, bookTicket); 
router.get('/my-tickets', authMiddleware, getUserTickets); 
router.put('/cancel/:ticketId', authMiddleware, cancelTicket); 

export default router;
