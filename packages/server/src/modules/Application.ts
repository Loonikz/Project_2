import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

class Application {
  app: express.Application;

  constructor(controllers: any) {
    this.app = express();
    this.middlewares();
    this.routes();
    this.controllers(controllers);
  }

  middlewares() {
    // парсер
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(cors());
  }

  routes() {
    this.app.use(express.static('./../web/dist/'));
  }

  controllers(controllers: any) {
    controllers.forEach((el: any) => {
      this.app.use(el.path, el.router);
    });
  }

  start() {
    this.app.listen(process.env.PORT || 3000);
  }
}

export default Application;
