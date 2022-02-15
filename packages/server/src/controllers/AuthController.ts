import { Request, Response, Router } from 'express';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
// import MySQLUser from '../database/userDataBase';
// @ts-ignore
import { secret } from "../config/config"
// @ts-ignore
import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
// import Controller from '../interfaces/controller.interface';
// import { generateJWT } from '../middleware/jwtGenerate.middlewate';

const generateAccessToken = (id) => {
  return jwt.sign({'id': id}, secret, {expiresIn: "24h"})
}

export class AuthController {

  static async registration(req, res) {
    try {
      // console.log(req)
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
      const {username, password} = req.body
      const user = await User.findOne({username})
      if (!user) {
        return res.status(400).json({message: `Пользователь ${username} не найден`})
      }
      const validPassword = bcrypt.compareSync(password, user.password)
      if (!validPassword) {
        return res.status(400).json({message: `Введен неверный пароль`})
      }
      // console.log(user._id);
      const token = generateAccessToken(String(user._id))
      // console.log(token)
      return res.json({token})
    } catch (e) {
      console.log(e)
      res.status(400).json({message: 'Login error'})
    }
  }
}

export default AuthController;
