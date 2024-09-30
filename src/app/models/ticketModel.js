import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/dbConfig.js';
import Journey from './journeyModel.js';
import User from './userModel.js';

const Ticket = sequelize.define('Ticket', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  journeyId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Journey,
      key: 'id',
    },
  },
  seatNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('booked', 'cancelled'),
    allowNull: false,
    defaultValue: 'booked',
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false, 
  },
}, {
  timestamps: true,
});

export default Ticket;
