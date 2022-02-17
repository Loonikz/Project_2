import { Response } from 'express';

const jwt = require('jsonwebtoken');

export function generateAccessToken(res: Response, id) {
  const token = jwt.sign({'id': id}, <string>process.env.JWT_SECRET, {expiresIn: "24h"})

  const cookieOptions = {
    expires: new Date(Date.now() + Number(process.env.JWT_EXPIRES) * 24 * 60 * 60 * 1000),
    httponly: true,
  };
  res.cookie('jwt', token, cookieOptions);
}

export function authToken (req, res, next)  {
  const token = req.cookies.jwt;
  if (!token) return res.sendStatus(401).json({message: "Вы не авторизированы"});
  jwt.verify(token, <string>process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(401).json({message: "Вы не авторизированы"});
    req.user = user;
    next();
  });
}
