const jwt = require('jsonwebtoken');

const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    
    // Add a safe check to ensure the header exists and is properly formatted
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized User! Token missing or invalid.' });
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized User!' });
    }

    // Verify the JWT purely using the secret, without checking Redis
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: 'Please authenticate' });
  }
};

module.exports = authenticateUser;