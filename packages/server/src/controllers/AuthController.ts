import { Request, Response, Router } from 'express';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User';
import { validationResult } from 'express-validator';
import { generateAccessToken } from '../modules/TokenAcc';

dotenv.config()

export class AuthController {

  static async registration(req, res) {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({message: "Ошибка при регистрации", errors})
      }

      const {username, password} = req.body;
      const candidate = await User.findOne({login: username})

      if (candidate) {
        return res.status(400).json({message: "Пользователь с таким именем уже существует"})
      }

      const hashPassword = bcrypt.hashSync(password, 7);
      const user = new User({login: username, password: hashPassword})
      await user.save();

      return res.json({message: "Пользователь успешно зарегистрирован"})
    } catch (e) {
      console.log(e)
      res.status(400).json({message: 'Registration error'})
    }
  }

  static async login(req, res) {
    try {
      console.log(req.body)
      const {username, password} = req.body
      const user = await User.findOne({ login:username })
      if (!user) {
        return res.status(400).json({message: `Пользователь ${username} не найден`})
      }

      const validPassword = bcrypt.compareSync(password, user.password)
      if (!validPassword) {
        return res.status(400).json({message: `Введен неверный пароль`})
      }

      generateAccessToken(res, String(user._id));
      res.redirect('/main')
    } catch (e) {
      console.log(e)
      res.status(400).json({message: `Login error ${e}`})
    }
  }

  static async logout(req, res){
    res.clearCookie('jwt');
    res.redirect('/login')
  }
}

export default AuthController;
