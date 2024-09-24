import { DataTypes } from 'sequelize';
import argon from 'argon2';
import { sequelize } from '../../config/dbConfig.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,  // Ensures that email is valid
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      noSpaces(value) {
        if (/\s/.test(value)) {
          throw new Error('Password should not contain spaces');
        }
      },
    },
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: true, // Optional field for profile pictures
  },
  role: {
    type: DataTypes.ENUM('admin', 'user'),
    defaultValue: 'user', // Role with default value
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
});

// Hash the password before creating a new user
User.beforeCreate(async (user, options) => {
  if (user.password) {
    user.password = await argon.hash(user.password);
  }
});

// Hash the password before updating a user if it was changed
User.beforeUpdate(async (user, options) => {
  if (user.changed('password')) {
    user.password = await argon.hash(user.password);
  }
});

export default User;
