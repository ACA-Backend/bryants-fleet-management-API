import express from 'express';
import { createPayment, recordExpense, generateFinancialReport, getExpenseCategories } from '../app/controllers/financialController.js';
import {authMiddleware, adminMiddleware } from '../app/middlewares/authMiddleware.js';

const router = express.Router();

// Routes for financial transactions
router.post('/payment', authMiddleware, createPayment);
router.post('/expense', authMiddleware, adminMiddleware, recordExpense);
router.get('/report', authMiddleware, adminMiddleware, generateFinancialReport); 

//expense categories
router.get('/categories', authMiddleware, adminMiddleware, getExpenseCategories);

export default router;
