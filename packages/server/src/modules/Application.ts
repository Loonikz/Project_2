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
    // this.app.use(express.static('./../web/dist/data'));

    const statics = express.static('./../web/dist/');

    function secureStatic(pathsToSecure = []) {
      return function (req, res, next) {

        if (pathsToSecure.length === 0) {
          return statics(req, res, next); // Do not secure, forward to static route
        }
        if (pathsToSecure.indexOf(req.path) > -1) {
          return res.redirect('/');
        }

        return statics(req, res, next); // forward to static route
      };
    }

    this.app.use((secureStatic(['/main.html', '/login.html', '/register.html'])));
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

