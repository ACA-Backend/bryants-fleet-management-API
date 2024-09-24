import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { generateToken } from '../providers/jwtProvider.js';

// Registration controller
 const register = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Checking if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hashing the password using Argon2
    const hashedPassword = await argon2.hash(password);

    // Create the new user
    const user = await User.create({ username, email, password: hashedPassword, role });

    // Generate JWT token
    const token = generateToken(user);

    res.status(201).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed: ' + error.message });
  }
};

// Login controller
 const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare the password using Argon2
    const isMatch = await argon2.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = generateToken(user);

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: 'Login failed: ' + error.message });
  }
};

export { register, login};