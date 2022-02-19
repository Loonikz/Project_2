import { Request, Response, Router } from 'express';
import path from 'node:path';
import { authMiddleware } from '../middleware/authMiddleware';

class PagesRouter {
  path = '/';

  router = Router();

  constructor() {
    this.routes();
  }

  private routes() {
    this.router.get('/login', PagesRouter.login);
    this.router.get('/register', PagesRouter.register);
    this.router.get('/main', authMiddleware, PagesRouter.main);
    this.router.get('/*', authMiddleware, PagesRouter.redirect);
  }

  static redirect(req: Request, res: Response) {
    res.redirect('/main');
  }

  static main(req: Request, res: Response) {
    res.sendfile(path.resolve(path.resolve(), './../web', 'dist/main.html'));
  }

  static login(req: Request, res: Response) {
    const jwtToken = req.cookies.jwt;
    if (!jwtToken) {
      res.sendfile(path.resolve(path.resolve(), './../web', 'dist/login.html'));
    } else {
      res.redirect('/main');
    }
  }

  static register(req: Request, res: Response) {
    const jwtToken = req.cookies.jwt;
    if (!jwtToken) {
      res.sendfile(path.resolve(path.resolve(), './../web', 'dist/register.html'));
    } else {
      res.redirect('/main');
    }
  }
}

export default PagesRouter;
