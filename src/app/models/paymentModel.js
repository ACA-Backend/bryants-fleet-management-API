import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/dbConfig.js';
import Transaction from './transactionModel.js';

const Payment = sequelize.define('Payment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  paymentMethod: {
    type: DataTypes.ENUM('credit_card', 'debit_card', 'paypal', 'bank_transfer'),
    allowNull: false,
  },
  paymentDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  transactionId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: Transaction,
      key: 'id',
    },
  },
}, {
  timestamps: true,
});

export default Payment;
