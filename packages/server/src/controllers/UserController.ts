import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { User } from '../models/Types';
import SchemaUser from '../models/User';
import { generateAccessToken } from '../modules/TokenAcc';

dotenv.config();

export class UserController {
  static async connect() {
    mongoose.connect(process.env.MONGODB_URL);
  }

  static async registration(req: Request, res: Response): Promise<Response> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Ошибка валидации', errors });
      }
      const { username, password } = req.body;
      const candidate: User = await SchemaUser.findOne({ login: username });
      if (candidate) {
        return res.status(400).json({ message: 'Пользователь с таким именем уже существует' });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const user = new SchemaUser({ login: username, password: hashPassword });
      await user.save();
      return res.json({ message: 'Пользователь успешно зарегистрирован' });
    } catch (e) {
      return res.status(400).json({ message: `Registration error ${e}` });
    }
  }

  static async login(req: Request, res: Response): Promise<Response> {
    try {
      const { username, password } = req.body;
      const user: User = await SchemaUser.findOne({ login: username });
      if (!user) {
        return res.status(400).json({ message: `Пользователь ${username} не найден` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: `Введен неверный пароль` });
      }
      generateAccessToken(res, String(user._id));
      res.redirect('/main');
      return res.status(200);
    } catch (e) {
      return res.status(400).json({ message: `Login error ${e}` });
    }
  }

  static async logout(req: Request, res: Response) {
    res.clearCookie('jwt');
    res.redirect('/login');
  }

  static async changeLogin(req: Request, res: Response): Promise<Response> {
    try {
      const jwtCookie = req.cookies.jwt;
      if (jwtCookie) {
        const decoded: User = jwt.verify(jwtCookie, <string>process.env.JWT_SECRET);
        const user = await SchemaUser.findOne({ _id: decoded.id });
        if (user) {
          const { username, password } = req.body;
          const candidate: User = await SchemaUser.findOne({ login: username });
          if (candidate) {
            return res.status(418).json({ message: 'Пользователь с таким именем уже существует' });
          }
          const validPassword = bcrypt.compareSync(password, user.password);
          if (!validPassword) {
            return res.status(419).json({ message: `Введен неверный пароль` });
          }
          await SchemaUser.updateOne({ _id: decoded.id }, { $set: { login: username } });
          return res.status(200).json({ message: `Все оки` });
        }
        return res.status(400).json({ message: `Пользователь не найден` });
      }
      return res.status(401).json({ message: `Пользователь не авторизован` });
    } catch (e) {
      return res.status(500).json({ message: `Change login error ${e}` });
    }
  }

  static async changePassword(req: Request, res: Response): Promise<Response> {
    try {
      const jwtCookie = req.cookies.jwt;
      if (jwtCookie) {
        const decoded: User = jwt.verify(jwtCookie, <string>process.env.JWT_SECRET);
        const user = await SchemaUser.findOne({ _id: decoded.id });
        if (user) {
          const { password, newPassword } = req.body;
          const validPassword = bcrypt.compareSync(password, user.password);
          if (!validPassword) {
            return res.status(419).json({ message: `Введен неверный пароль` });
          }
          const hashPassword = bcrypt.hashSync(newPassword, 7);
          await SchemaUser.updateOne({ _id: decoded.id }, { $set: { password: hashPassword } });
          return res.status(200).json({ message: `Все оки токи` });
        }
        return res.status(400).json({ message: `Пользователь не найден` });
      }
      return res.status(401).json({ message: `Пользователь не авторизован` });
    } catch (e) {
      return res.status(500).json({ message: `Change login error ${e}` });
    }
  }
}
