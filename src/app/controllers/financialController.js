import Payment from '../models/paymentModel.js';
import Transaction from '../models/transactionModel.js';
import ExpenseCategory from '../models/expenseCategoryModel.js';
import { sequelize } from '../../config/dbConfig.js';

// Creating a payment record
export const createPayment = async (req, res) => {
  const { userId, amount, paymentMethod } = req.body;

  try {
    // Creating a payment
    const payment = await Payment.create({
      userId,
      amount,
      paymentMethod,
    });

    // Create an associated transaction (income)
    const transaction = await Transaction.create({
      type: 'income',
      description: `Payment received from User ${userId}`,
      amount,
      createdBy: req.user.id, // Assuming req.user contains admin/finance info
    });

    // Update payment with transaction ID
    payment.transactionId = transaction.id;
    await payment.save();

    res.status(201).json({ message: 'Payment and transaction recorded successfully', payment, transaction });
  } catch (error) {
    res.status(500).json({ message: 'Error creating payment and transaction', error });
  }
};

// Record an expense
export const recordExpense = async (req, res) => {
  const { description, amount, categoryId } = req.body;

  try {
    // ensuring the expense category exists
    const category = await ExpenseCategory.findByPk(categoryId);
    if (!category) {
        return res.status(404).json({message: 'expense category not found'});
    }
    // Create the expense transaction 
    const transaction = await Transaction.create({
      type: 'expense',
      description,
      amount,
      createdBy: req.user.id,
      expenseCategoryId: categoryId,
    });

    res.status(201).json({ message: 'Expense recorded successfully', transaction });
  } catch (error) {
    res.status(500).json({ message: 'Error recording expense', error });
  }
};

//fetching all categories
export const getExpenseCategories = async (req, res) => {
    try{
        const categories = await ExpenseCategory.findAll();
        res.status(200).json({ categories });
    } catch (error) {
        res.status(500).json({message: 'error fetching categories', error})
    }
}

// Generate financial report 
export const generateFinancialReport = async (req, res) => {
  try {
    // Sum all income and expenses
    const income = await Transaction.sum('amount', { where: { type: 'income' } });
    const expenses = await Transaction.sum('amount', { where: { type: 'expense' } });

    //the code to get expenses grouped by category
    const expenseByCategory = await Transaction.findAll({
        where: { type: 'expense'},
        attributes: ['expenseCategoryId', [sequelize.fn('SUM', sequelize.col('amount')), 'totalAmount']],
        group: ['expenseCategoryId'],
        include: [{
        model: ExpenseCategory,
        attributes: ['name'],
        }]
    })

    const netProfit = income - expenses;

    res.status(200).json({ income, expenses, netProfit,  expenseByCategory });
  } catch (error) {
    res.status(500).json({ message: 'Error generating financial report', error });
  }
};


export default { createPayment, recordExpense, generateFinancialReport };
