const {MongoClient} =require('mongodb');
const uri = "mongodb+srv://root:kFf3hHpxtjI8PFkN@cluster0.qlr4p.mongodb.net/person?retryWrites=true&w=majority";

// @ts-ignore
class MongoDB {
    private client: any;

    constructor() {
        // @ts-ignore
        this.client = new MongoClient(uri, {'useNewUrlParser': true, useUnifiedTopology: true});

    }

    async connection() {
        this.client.connect().then(r => {
            console.log('connect ')
        });
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

    async insertOne(fname:string, lname:string, age:number, city:string, phoneNumber:string, email:string, companyName:string) {
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
        const collection = this.client.db('person').collection('persons');
        collection.insertOne(person, async (err, result) => {
            if (err) {
                return console.log(err);
            }
            await this.updateId(result['insertedId']);
        });
    }

    async findAll(cb, param = {}) {
        const collection = this.client.db('person').collection('persons');
        await collection.find(param).toArray()
            .then((items) => {
                cb(items);
            })
    }

    async updateId(id) {
        const collection = this.client.db('person').collection('persons');
        collection.updateOne({'_id': id}, {$set: {'id': `${id}`}}, (error, result) => {
            if (error) {
                console.log(error)
            } else {
                console.log(result)
            }
        })
    }
}
module.exports = {MongoDB}
