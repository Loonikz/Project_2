// import * as process from 'process';
// import express from 'express';
// import { MySQL } from './controller/MySQL';
// import { MongoDB } from './controller/MongoDB';
// import CORS  from 'cors'; // решение корс политики
// import helmet  from 'helmet';
// import * as dotenv from 'dotenv';
// const app = express();
// const port = process.env.PORT || 3000;
//
// dotenv.config();
//
// // @ts-ignore
// app.listen(port, async (err) => {
//
//   if (err) {
//     console.error(err);
//     return err;
//   }
//   console.log(`server is listening on ${port}`);
//   const mongoDB = new MongoDB();
//   await mongoDB.connection();
//   const mySQL = new MySQL();
//   app.use(
//     helmet({
//       contentSecurityPolicy: false,
//     }),
//   );
//   app.use(CORS({
//     origin: 'localhost:3000',
//   }));
//   app.get('/mySQL', (req, res) => {
//     mySQL.queryAll('SELECT * FROM persons', (rows) => {
//       res.send(rows);
//     });
//   });
//   app.delete('/mySQL/:id', (req, res) => {
//     if (!req.params.id) return res.sendStatus(400);
//     mySQL.delete([req.params.id]);
//     res.sendStatus(200);
//
//   });
//   app.get('/mySQL/:id', (req, res) => {
//     mySQL.queryAll(`SELECT * FROM persons WHERE (id = '${req.params.id}')`, (rows) => {
//       res.send(rows);
//     });
//   });
//   app.use(express.json());
//   app.post('/mySQL', (req, res) => {
//     if (!req.body) return res.sendStatus(400);
//     mySQL.insert(req.body.fname, req.body.lname, req.body.age, req.body.city, req.body.phoneNumber, req.body.email, req.body.companyName);
//     res.sendStatus(200);
//   });
//   app.post('/mySQL/:id', (req, res) => {
//     console.log(req.body);
//     if (!req.body) return res.sendStatus(400);
//     mySQL.update(req.params.id, req.body.fname, req.body.lname, req.body.age, req.body.city, req.body.phoneNumber, req.body.email, req.body.companyName);
//     res.sendStatus(200);
//   });
//   app.get('/mongoDB', (req, res) => {
//     mongoDB.findAll((record) => {
//       res.send(record);
//     });
//   });
//   app.get('/mongoDB/:id', (req, res) => {
//     mongoDB.findAll((record) => {
//       res.send(record);
//     }, { 'id': `${req.params.id}` });
//   });
//   app.post('/mongoDB', (req, res) => {
//     if (!req.body) return res.sendStatus(400);
//     mongoDB.insertOne(req.body.fname, req.body.lname, req.body.age, req.body.city, req.body.phoneNumber, req.body.email, req.body.companyName);
//     res.sendStatus(200);
//   });
// });

import Application from './modules/Application';
import PagesController from './modules/PageRouter';
import {MySQLRouter} from "./modules/MySQLRouter";
import {MongoDBRouter} from "./modules/MongoDBRouter";

// import {MongoDB} from "./database/mongoDB";
// import MongoController from "./controllers/mainMongo";

const app = new Application(
  // [new AuthenticationController(), new PagesController(), new MongoController()]
  [ new PagesController(), new MySQLRouter(), new MongoDBRouter()],
);

app.start();
