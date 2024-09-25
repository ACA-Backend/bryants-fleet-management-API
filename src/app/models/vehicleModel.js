import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/dbConfig.js';

const Vehicle = sequelize.define('Vehicle', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  plateNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'in_maintenance', 'retired'),
    allowNull: false,
    defaultValue: 'active',
  },
  assignedDriverId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
}, {
  timestamps: true, 
});

export default Vehicle;
