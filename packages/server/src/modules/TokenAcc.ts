const jwt = require('jsonwebtoken');
const secret = require('../config/config')

function authToken (req, res, next)  {
  const token = req.headers.authorization;
  if (!token) return res.sendStatus(401).json({message: "Вы не авторизированы"});
  jwt.verify(token, secret, (err, user) => {
    if (err) return res.sendStatus(401).json({message: "Вы не авторизированы"});
    req.user = user;
    next();
  });
}

module.exports = authToken;
