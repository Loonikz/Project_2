import { Response } from 'express';
import jwt from 'jsonwebtoken';

export function generateAccessToken(res: Response, id) {
  const token = jwt.sign({ id: `${id}` }, process.env.JWT_SECRET, { expiresIn: '15s' });

  const cookieOptions = {
    expires: new Date(Date.now() + Number(process.env.JWT_EXPIRES) * 15000),
    httponly: true,
  };
  res.cookie('jwt', token, cookieOptions);
}
