const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
    return jwt.sign(payload, '12345');// Adjust expiry as needed
  };

const authMiddleware = (req, res, next) => {
    // Function to generate JWT token


  const authHeader = req.headers.authorization;
  console.log(authHeader)
  if (!authHeader) {
    return res.status(401).send('Access denied. No token provided.');
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, '12345');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send('Invalid token.');
  }
};

module.exports = {authMiddleware,generateToken};