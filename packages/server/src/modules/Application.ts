import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';

dotenv.config();

class Application {
  app: express.Application;

  constructor(controllers: any) {
    this.app = express(); // const app = express();
    this.settings();
    this.middlewares();
    this.routes();
    this.controllers(controllers);
    mongoose.connect("mongodb+srv://root:kFf3hHpxtjI8PFkN@cluster0.qlr4p.mongodb.net/User?retryWrites=true&w=majority");
  }

  settings() {
    this.app.set('port', process.env.PORT || 3000);
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
    this.app.use('/photo', express.static('./../web/src/assets'));
  }

  controllers(controllers: any) {
    controllers.forEach((el: any) => {
      this.app.use(el.path, el.router);
    });
  }

  start() {
    this.app.listen(this.app.get('port'), () => {
      console.log(`Server on http://localhost:${this.app.get('port')}`);
    });
  }
}

export default Application;
