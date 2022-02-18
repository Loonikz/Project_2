import { Router } from 'express';
import { UserController } from '../controllers/UserController';

class AuthRouter {
  path = '/auth';

  router = Router();

  constructor() {
    UserController.connect();
    this.routes();
  }

  private routes() {
    this.router.post('/registration', UserController.registration);
    this.router.post('/login', UserController.login);
    this.router.post('/logout', UserController.logout);
    this.router.post('/changeLogin', UserController.changeLogin);
    this.router.post('/changePassword', UserController.changePassword);
  }
}

export default AuthRouter;
