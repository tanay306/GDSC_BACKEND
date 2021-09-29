const jwt = require('jsonwebtoken');

const generateToken = () => {
  const token = jwt.sign({id: process.env.ID}, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
  console.log('1');
  console.log(token);
  return token
};

module.exports = { generateToken };