import {Request, Response, Router} from 'express';
import {MySQL} from '../controllers/MySQL';

export class MySQLRouter {
  path = '/mysql';

  router = Router();

  constructor() {
    this.checkRoutes();
  }

  checkRoutes() {
    this.router.get('/', this.getData);
    this.router.post('/', this.postData);
    this.router.put('/', this.putData);
    this.router.delete('/clear', this.deleteAllData);
    this.router.delete('/:id', this.deleteData);
  }

  deleteAllData(req: Request, res: Response): void {
    const dbRequest = new MySQL();
    dbRequest
      .clear()
      .then(() => {
        dbRequest.closeConnection();
        res.status(200).end();
      })
      .catch(() => {
        dbRequest.closeConnection();
        res.status(409).end();
      });
  }

  postData(req: Request, res: Response): void {
    const dbRequest = new MySQL();
    dbRequest
      .insert(req.body.fname, req.body.lname, req.body.age, req.body.city, req.body.phoneNumber, req.body.email, req.body.companyName)
      .then(() => {
        dbRequest.closeConnection();
        res.status(200).end();
      })
      .catch(() => {
        dbRequest.closeConnection();
        res.status(409).end();
      });
  }
  putData(req: Request, res: Response): void {
    const dbRequest = new MySQL();
    dbRequest
      .update(req.body.id,req.body.fname, req.body.lname, req.body.age, req.body.city, req.body.phoneNumber, req.body.email, req.body.companyName)
      .then(() => {
        dbRequest.closeConnection();
        res.status(200).end();
      })
      .catch(() => {
        dbRequest.closeConnection();
        res.status(409).end();
      });
  }

  deleteData(req: Request, res: Response): void {
    const deleteId = req.params.id;
    const dbRequest = new MySQL();
    dbRequest
      .delete(deleteId)
      .then(() => {
        dbRequest.closeConnection();
        res.status(200).end();
      })
      .catch(() => {
        dbRequest.closeConnection();
        res.status(409).end();
      });
  }

  getData(req: Request, res: Response): void {
    const dbRequest = new MySQL();
    dbRequest
      .select()
      .then((value) => {
        dbRequest.closeConnection();
        res.send(value);
      })
      .catch(() => {
        dbRequest.closeConnection();
        res.status(409).end();
      });
  }
}
