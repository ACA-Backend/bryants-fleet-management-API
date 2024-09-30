import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/dbConfig.js';
import ExpenseCategory from './expenseCategoryModel.js'

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  type: {
    type: DataTypes.ENUM('income', 'expense'),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  createdBy: {
    type: DataTypes.UUID,
    allowNull: false, 
  },
  expenseCategoryId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
        model: ExpenseCategory,
        key: 'id',
    }
  }
}, {
  timestamps: true,
});

export default Transaction;
