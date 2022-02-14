import { Request, Response, Router } from 'express';
import path from 'node:path';
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
    this.router.get('/main', PagesRouter.main);
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
