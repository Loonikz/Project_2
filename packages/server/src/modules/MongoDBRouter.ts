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
    this.router.post('/', this.createData);
    // this.router.delete('/:*', this.deleteData);
    // this.router.delete('/clear', this.clearData);
  }

  // clearData(req: Request, res: Response): void {
  //   const dbRequest = new MongoDB();
  //   dbRequest
  //     .clear()
  //     .then(() => {
  //       dbRequest.endConnection();
  //       res.status(200).end();
  //     })
  //     .catch(() => {
  //       dbRequest.endConnection();
  //       res.status(409).end();
  //     });
  // }

  createData(req: Request, res: Response): void {
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

  // deleteData(req: Request, res: Response): void {
  //   const deleteId = req.url.split(':')[1];
  //   const dbRequest = new MongoDB();
  //   dbRequest
  //     .delete(deleteId)
  //     .then(() => {
  //       res.status(200).end();
  //     })
  //     .catch(() => {
  //       res.status(409).end();
  //     });
  // }

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
