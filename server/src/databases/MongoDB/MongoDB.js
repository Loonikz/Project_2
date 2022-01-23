const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://root:kFf3hHpxtjI8PFkN@cluster0.qlr4p.mongodb.net/person?retryWrites=true&w=majority";

// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//     const collection = client.db("person").collection("persons");
//     // perform actions on the collection object
//     console.log('4el my podrybilis')
//     client.close();
// });


class MongoDB {
    constructor() {
        this.client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
    }

    async collection() {
        this.client.connect((e, client) => {
            if (e) {
                console.log(e)
            } else {
                console.log('Connection MongoDB')
                const collection = client.db('person').collection('persons');
                collection.countDocuments(function (err, result) {

                    if (err) {
                        return console.log(err);
                    }
                    console.log(`В коллекции users ${result} документов`);
                    client.close();
                });
            }
        })
    }

    async insertOne(fname, lname, age, city, phoneNumber, email, companyName) {
        this.client.connect((e, client) => {
            if (e) {
                console.log(e)
            } else {
                console.log('Connection MongoDB')
                const person = {
                    'id': '',
                    'fname': `${fname}`,
                    'lname': `${lname}`,
                    'age': age,
                    'city': `${city}`,
                    'phoneNumber': `${phoneNumber}`,
                    'email': `${email}`,
                    'companyName': `${companyName}`
                };
                const collection = client.db('person').collection('persons');
                collection.insertOne(person, async function (err, result) {

                    if (err) {
                        return console.log(err);
                    }
                    // console.log(result.insertedId);
                    this.updateId(result['insertedId']).then(() => {
                        client.close();
                    })
                });
            }
        })
    }

    async findAll() {
        this.client.connect(async (e, client) => {
            if (e) {
                console.log(e)
            } else {
                console.log('Connection MongoDB')
                const collection = client.db('person').collection('persons');
                await collection.find({}).toArray()
                    .then((items) => {
                        console.log(items);
                    }).then(() => {
                        client.close();
                    })
            }
        })
    }
    async updateId(id) {
        this.client.connect((e, client) => {
            if (e) {
                console.log(e)
            } else {
                console.log('Connection MongoDB')
                const collection = client.db('person').collection('persons');
                collection.updateOne({'_id': id}, {$set: {'id': id}}, (error, result) => {
                    if (e) {
                        console.log(e)
                    } else {
                        console.log(result)
                    }
                })
            }
        })
    }
}

module.exports = {MongoDB};