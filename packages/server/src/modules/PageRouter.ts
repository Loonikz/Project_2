import { Request, Response, Router } from 'express';
import path from 'node:path';
import jwt from 'jsonwebtoken';
import SchemaUser, { User } from '../models/User';


// import Controller from '../interfaces/controller.interface';
// import authMiddleware from '../middleware/auth.middleware';

class PagesRouter {
  path = '/';

  router = Router();

  constructor() {
    this.checkRoutes();
  }

  private checkRoutes() {
    this.router.get('/login', PagesRouter.login);
    this.router.get('/register', PagesRouter.register);
    this.router.get('/main',authMiddleware, PagesRouter.main);
    this.router.get('/*', PagesRouter.redirect);
  }

  static redirect(req: Request, res: Response) {
    res.redirect('/login');
  }

  static main(req: Request, res: Response) {
    res.sendfile(path.resolve(path.resolve(), './../web', 'dist/main.html'));
  }

  static login(req: Request, res: Response) {
    res.sendfile(path.resolve(path.resolve(), './../web', 'dist/login.html'));
  }

  static register(req: Request, res: Response) {
    res.sendfile(path.resolve(path.resolve(), './../web', 'dist/register.html'));
  }
}

export default PagesRouter;

async function authMiddleware(req: Request, res: Response, next) {
  try {
    console.log(req.cookies)
    const jwtCookie = req.cookies.jwt;
    if (jwtCookie) {
      const decoded: User = jwt.verify(jwtCookie, <string>process.env.JWT_SECRET);

      const value = await SchemaUser.findOne({ _id: decoded.id })
      console.log(value);

      if (value) {
        console.log(value);
        next();
      }
    } else {
      res.redirect(303, '/login');
    }
  } catch(e) {
    console.log(e)
    res.redirect(303, '/login');
  }
}
