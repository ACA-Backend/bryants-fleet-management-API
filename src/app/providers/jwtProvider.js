import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  const payload = { id: user.id, username: user.username, role: user.role };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });// an hour is considered standerd so i used it.
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid Token');
  }
};

export { generateToken, verifyToken };
