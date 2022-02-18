import { Request, Response, Router } from 'express';
import { MySQL } from '../controllers/MySQL';
import { authMiddleware } from '../middleware/authMiddleware';

export class MySQLRouter {
  path = '/mysql';

  router = Router();

  constructor() {
    this.checkRoutes();
  }

  checkRoutes() {
    this.router.get('/', authMiddleware, MySQLRouter.getData);
    this.router.post('/', authMiddleware, MySQLRouter.postData);
    this.router.put('/', authMiddleware, MySQLRouter.putData);
    this.router.delete('/clear', authMiddleware, MySQLRouter.clearData);
    this.router.delete('/:id', authMiddleware, MySQLRouter.deleteData);
  }

  static postData(req: Request, res: Response): void {
    try {
      const mySQL = new MySQL();
      const { fname, lname, age, city, phoneNumber, email, companyName } = req.body;
      mySQL
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
      const mySQL = new MySQL();
      const { id, fname, lname, age, city, phoneNumber, email, companyName } = req.body;
      mySQL
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
      const mySQL = new MySQL();
      mySQL
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
      const mySQL = new MySQL();
      mySQL
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
      const mySQL = new MySQL();
      mySQL
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
