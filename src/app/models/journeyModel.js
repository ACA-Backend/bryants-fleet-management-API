import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/dbConfig.js';
import Vehicle from './vehicleModel.js';
import Destination from './destinationModel.js';

const Journey = sequelize.define('Journey', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  vehicleId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Vehicle,
      key: 'id',
    },
  },
  destinationId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Destination,
      key: 'id',
    },
  },
  departureTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  availableSeats: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0, // Auto-calculated based on vehicle capacity
  },
  status: {
    type: DataTypes.ENUM('scheduled', 'in_progress', 'completed', 'cancelled'),
    allowNull: false,
    defaultValue: 'scheduled',
  },
}, {
  timestamps: true,
});

// this is to calculate available seats based on vehicle capacity
Journey.beforeCreate(async (journey) => {
  const vehicle = await Vehicle.findByPk(journey.vehicleId);
  journey.availableSeats = vehicle.capacity;
});

export default Journey;
