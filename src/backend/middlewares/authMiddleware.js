const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

const validateToken = (req, res, next) => {
  // Check the Authorization header
  const authHeader = req.headers.authorization;
  let token;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else if (req.query.token) {
    // Check the query parameters
    token = req.query.token;
  } else if (req.cookies && req.cookies.token) {
    // Check the cookies
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Token is not provided',
    });
  }

  jwt.verify(token, jwtConfig.TOKEN_KEY, (err, payload) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Invalid token',
      });
    } else {
      //console.log('Decoded Payload:', payload);
      req.user = payload;
      next();
    }
  });
};

module.exports = validateToken;
