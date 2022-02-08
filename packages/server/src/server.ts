import * as process from 'process';

const express = require('express');
// @ts-ignore
const { MySQL } = require('./databases/mySQL/MySQL');
// @ts-ignore
const { MongoDB } = require('./databases/MongoDB/MongoDB');
const CORS = require('cors'); // решение корс политики
const helmet = require('helmet');
const bodyParser = require('express');
const app = express();
const port = process.env.PORT || 3000;

// @ts-ignore
app.listen(port, async (err) => {

  if (err) {
    console.error(err);
    return err;
  }
  console.log(`server is listening on ${port}`);
  const mongoDB = new MongoDB();
  await mongoDB.connection();
  const mySQL = new MySQL({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'root',
    database: process.env.MYSQL_DATABASE || 'userdatabase',
  });
  await mySQL.connection();
  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );
  app.use(CORS({
    origin: 'localhost:3000',
  }));
  app.get('/mySQL', (req, res) => {
    mySQL.queryAll('SELECT * FROM persons', (rows) => {
      res.send(rows);
    });
  });
  app.delete('/mySQL/:id', (req, res) => {
    if (!req.params.id) return res.sendStatus(400);
    mySQL.delete([req.params.id]);
    res.sendStatus(200);

  });
  app.get('/mySQL/:id', (req, res) => {
    mySQL.queryAll(`SELECT * FROM persons WHERE (id = '${req.params.id}')`, (rows) => {
      res.send(rows);
    });
  });
  app.use(express.json());
  app.post('/mySQL', (req, res) => {
    if (!req.body) return res.sendStatus(400);
    mySQL.insert(req.body.fname, req.body.lname, req.body.age, req.body.city, req.body.phoneNumber, req.body.email, req.body.companyName);
    res.sendStatus(200);
  });
  app.post('/mySQL/:id', (req, res) => {
    console.log(req.body);
    if (!req.body) return res.sendStatus(400);
    mySQL.update(req.params.id, req.body.fname, req.body.lname, req.body.age, req.body.city, req.body.phoneNumber, req.body.email, req.body.companyName);
    res.sendStatus(200);
  });
  app.get('/mongoDB', (req, res) => {
    // const mongoDB = new MongoDB();
    mongoDB.findAll((record) => {
      res.send(record);
    });
  });
  app.get('/mongoDB/:id', (req, res) => {
    mongoDB.findAll((record) => {
      res.send(record);
    }, { 'id': `${req.params.id}` });
  });
  app.post('/mongoDB', (req, res) => {
    if (!req.body) return res.sendStatus(400);
    mongoDB.insertOne(req.body.fname, req.body.lname, req.body.age, req.body.city, req.body.phoneNumber, req.body.email, req.body.companyName);
    res.sendStatus(200);
  });
});
