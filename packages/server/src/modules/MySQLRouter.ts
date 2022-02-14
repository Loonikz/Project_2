import { Request, Response, Router } from 'express';
import { MySQL } from '../controllers/MySQL';

export class MySQLRouter {
  path = '/mysql';

  router = Router();

  constructor() {
    this.checkRoutes();
  }

  checkRoutes() {
    this.router.get('/', this.getData);
    this.router.post('/', this.createData);
    this.router.delete('/:*', this.deleteData);
    // this.router.delete('/clear', this.clearData);
  }

  // clearData(req: Request, res: Response): void {
  //   const dbRequest = new MySQL();
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

  deleteData(req: Request, res: Response): void {
    const deleteId = req.url.split(':')[1];
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
