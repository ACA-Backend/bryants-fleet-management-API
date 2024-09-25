import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/dbConfig.js';

const Destination = sequelize.define('Destination', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  distance: {
    type: DataTypes.FLOAT,
    allowNull: false, 
  },
  baseFare: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  timestamps: true,
});

export default Destination;
