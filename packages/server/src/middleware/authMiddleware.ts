import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/Types';
import SchemaUser from '../models/User';

export async function authMiddleware(req: Request, res: Response, next) {
  try {
    const jwtToken = req.cookies.jwt;
    if (jwtToken) {
      const decoded: User = jwt.verify(jwtToken, process.env.JWT_SECRET);
      const user = await SchemaUser.findOne({ _id: decoded.id });
      if (user) {
        next();
      }
    } else {
      res.redirect('/login');
    }
  } catch (e) {
    res.clearCookie('jwt');
    res.redirect('/login');
  }
}
