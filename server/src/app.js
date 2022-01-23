const express = require('express');
const { MySQL } = require('./databases/mySQL/MySQL')
const { MongoDB } = require('./databases/MongoDB/MongoDB')

const app = express();
const port = 3000;

app.listen(port, async (err) => {

    if (err) {
        console.error(err)
        return err;
    }
    console.log(`server is listening on ${port}`)

    const mongoDB = new MongoDB();
    // await mongoDB.connection();
    await mongoDB.insertOne('3333','2323', 2, 'test', 'test', 'test', 'test');
    // await mongoDB.findAll();
    // await mongoDB.update();
    // const mySQL = new MySQL({
    //     host: "34.122.166.203",
    //     user: "root",
    //     database: "person",
    //     password: "kFf3hHpxtjI8PFkN"
    // });
    // await mySQL.connection();
    // await mySQL.query('SELECT * FROM persons');

    app.get('/mySQL', (req, res) => {
        mySQL.queryAll('SELECT * FROM persons',(rows) => {
            res.send(rows);
        })
    });
    app.delete('/mySQL/:id', (req, res) => {
        console.log(req.params.id)
        mySQL.delete([req.params.id]);
    });
    app.get('/mySQL/:id', (req, res) => {
        mySQL.queryAll(`SELECT * FROM persons WHERE (id = '${req.params.id}')`,(rows) => {
            res.send(rows);
        })
    });
    return true;
});

