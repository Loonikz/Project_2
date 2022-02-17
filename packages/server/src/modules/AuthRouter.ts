import {Request, Response, Router} from "express";

import controller from '../controllers/AuthController'


class AuthRouter {
  path = '/auth';

  router = Router();

  constructor() {
    this.checkRoutes();
  }

  private checkRoutes() {
    this.router.post('/registration', controller.registration);
    this.router.post('/login', controller.login);
    this.router.post('/logout', controller.logout);
  }
}

export default AuthRouter;
