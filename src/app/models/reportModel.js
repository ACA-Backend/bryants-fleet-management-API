import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/dbConfig.js';
import Journey from './journeyModel.js';
import User from './userModel.js'; 

const Report = sequelize.define('Report', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  journeyId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Journey,
      key: 'id',
    },
  },
  driverId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  passengerFeedback: {
    type: DataTypes.ARRAY(DataTypes.STRING), 
    allowNull: true,
  },
  issuesReported: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  journeyDuration: {
    type: DataTypes.FLOAT, 
    allowNull: false,
  },
  fuelConsumption: {
    type: DataTypes.FLOAT, 
    allowNull: true,
  },
}, {
  timestamp: true,
});

export default Report;
