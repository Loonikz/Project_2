import {MongoClient} from 'mongodb'

export class MongoDB {
  private client: any;

  constructor() {
    this.client = new MongoClient(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`);

  }


  async collection() {
    return new Promise((resolve, reject) =>
      this.client.connect((e, client) => {
        if (e) {
          throw e;
        } else {
          const collection = client.db(process.env.MONGODB_DATABASE).collection(process.env.MONGODB_COLLECTION);
          collection.countDocuments((err, result) => {
            if (err) {
              reject(err);
            }
            reject(result);
            client.close();
          });
        }
      }));
  }

  insert(fname: string, lname: string, age: number, city: string, phoneNumber: string, email: string, companyName: string) {
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
    return new Promise((resolve, reject) => {
      this.client.connect((e, client) => {
        if (e) {
          reject(e);
        }
        const collection = client.db(process.env.MONGODB_DATABASE || 'person').collection(process.env.MONGODB_COLLECTION || 'persons');
        collection.insertOne(person, async (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(this.updateId(result['insertedId']));
        });
      })
    });
  }

  select(param = {}) {
    return new Promise((resolve, reject) => {
      this.client.connect((e, client) => {
        if (e) {
          reject(e);
        }
        const collection = client.db(process.env.MONGODB_DATABASE || 'person').collection(process.env.MONGODB_COLLECTION || 'persons');
        collection.find(param).toArray()
          .then((items) => {
            resolve(items);
          })
          .catch(() => reject());
      })
    });
  }

  async updateId(id) {
    return new Promise((resolve, reject) => {
      const collection = this.client.db(process.env.MONGODB_DATABASE).collection(process.env.MONGODB_COLLECTION);
      collection.updateOne({'_id': id}, {
        $set: {
          'id': `${id}`
        }
      }, (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      })
    });
  }

  public closeConnection() {
    this.client.close();
  }
}
