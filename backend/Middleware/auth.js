const jwt = require('jsonwebtoken');
const { User } = require('../Model/user'); // Adjust import path
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract the token from "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Token is required for authentication' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Optionally, fetch the user from the database
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Attach user data to request for later use
    req.user = user;
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

// for Role Verifiction Future update

const authorizeRole = (requiredRole) => {
    return (req, res, next) => {
      if (!req.user || req.user.role !== requiredRole) {
        return res.status(403).json({ message: 'Access forbidden: insufficient permissions' });
      }
      next();
    };
  };
  
  
  

module.exports = {authenticateToken,authorizeRole};
