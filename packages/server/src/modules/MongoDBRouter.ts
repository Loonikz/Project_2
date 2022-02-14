import { Request, Response, Router } from 'express';
import { MongoDB } from '../controllers/MongoDB';

export class MongoDBRouter {
  path = '/mongodb';

  router = Router();

  constructor() {
    this.checkRoutes();
  }

  checkRoutes() {
    this.router.get('/', this.getData);
    this.router.post('/', this.postData);
    this.router.put('/', this.putData);
    this.router.delete('/clear', this.clearData);
    this.router.delete('/:id', this.deleteData);
  }

  postData(req: Request, res: Response): void {
    const dbRequest = new MongoDB();
    dbRequest
      .insert(req.body.fname, req.body.lname, req.body.age, req.body.city, req.body.phoneNumber, req.body.email, req.body.companyName)
      .then(() => {
        res.status(200).end();
      })
      .catch(() => {
        res.status(409).end();
      });
  }
  putData(req: Request, res: Response): void {
    const dbRequest = new MongoDB();
    dbRequest
      .update(req.body.id,req.body.fname, req.body.lname, req.body.age, req.body.city, req.body.phoneNumber, req.body.email, req.body.companyName)
      .then(() => {
        res.status(200).end();
      })
      .catch(() => {
        res.status(409).end();
      });
  }

  deleteData(req: Request, res: Response): void {
    const deleteId = req.params.id;
    const dbRequest = new MongoDB();
    dbRequest
      .delete(deleteId)
      .then(() => {
        res.status(200).end();
      })
      .catch(() => {
        res.status(409).end();
      });
  }
  clearData(req: Request, res: Response): void {
    const dbRequest = new MongoDB();
    dbRequest
      .clear()
      .then((value) => {
        res.status(200).end();
      })
      .catch(() => {
        res.status(409).end();
      });
  }

  getData(req: Request, res: Response): void {
    const dbRequest = new MongoDB();
    dbRequest
      .select()
      .then((value) => {
        res.send(value);
      })
      .catch(() => {
        res.status(409).end();
      });
  }
}
