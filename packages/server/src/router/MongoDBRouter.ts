import { Request, Response, Router } from 'express';
import { MongoDB } from '../controllers/MongoDB';
import { authMiddleware } from '../middleware/authMiddleware';

export class MongoDBRouter {
  path = '/mongodb';

  router = Router();

  constructor() {
    this.checkRoutes();
  }

  checkRoutes() {
    this.router.get('/', authMiddleware, MongoDBRouter.getData);
    this.router.post('/', authMiddleware, MongoDBRouter.postData);
    this.router.put('/', authMiddleware, MongoDBRouter.putData);
    this.router.delete('/clear', authMiddleware, MongoDBRouter.clearData);
    this.router.delete('/:id', authMiddleware, MongoDBRouter.deleteData);
  }

  static postData(req: Request, res: Response): void {
    try {
      const mongoDB = new MongoDB();
      const { fname, lname, age, city, phoneNumber, email, companyName } = req.body;
      mongoDB
        .insert(fname, lname, age, city, phoneNumber, email, companyName)
        .then(() => {
          res.status(200).end();
        })
        .catch(() => {
          res.status(409).end();
        });
    } catch (e) {
      res
        .status(400)
        .json({ message: `Error ${e}` })
        .end();
    }
  }

  static putData(req: Request, res: Response): void {
    try {
      const mongoDB = new MongoDB();
      const { id, fname, lname, age, city, phoneNumber, email, companyName } = req.body;
      mongoDB
        .update(id, fname, lname, age, city, phoneNumber, email, companyName)
        .then(() => {
          res.status(200).end();
        })
        .catch(() => {
          res.status(409).end();
        });
    } catch (e) {
      res
        .status(400)
        .json({ message: `Error ${e}` })
        .end();
    }
  }

  static deleteData(req: Request, res: Response): void {
    try {
      const deleteId = req.params.id;
      const mongoDB = new MongoDB();
      mongoDB
        .delete(deleteId)
        .then(() => {
          res.status(200).end();
        })
        .catch(() => {
          res.status(409).end();
        });
    } catch (e) {
      res
        .status(400)
        .json({ message: `Error ${e}` })
        .end();
    }
  }

  static clearData(req: Request, res: Response): void {
    try {
      const mongoDB = new MongoDB();
      mongoDB
        .clear()
        .then(() => {
          res.status(200).end();
        })
        .catch(() => {
          res.status(409).end();
        });
    } catch (e) {
      res
        .status(400)
        .json({ message: `Error ${e}` })
        .end();
    }
  }

  static getData(req: Request, res: Response): void {
    try {
      const mongoDB = new MongoDB();
      mongoDB
        .select()
        .then((value) => {
          res.send(value);
        })
        .catch(() => {
          res.status(409).end();
        });
    } catch (e) {
      res
        .status(400)
        .json({ message: `Error ${e}` })
        .end();
    }
  }
}
