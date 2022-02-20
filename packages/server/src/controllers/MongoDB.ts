import { MongoClient } from 'mongodb';

export class MongoDB {
  private client: MongoClient;

  constructor() {
    this.client = new MongoClient(
      `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`,
    );
  }

  insert(
    fname: string,
    lname: string,
    age: number,
    city: string,
    phoneNumber: string,
    email: string,
    companyName: string,
  ): Promise<any> {
    return this.updateId('id').then((id) => {
      const person = {
        id: `${id}`,
        fname: `${fname}`,
        lname: `${lname}`,
        age,
        city: `${city}`,
        phoneNumber: `${phoneNumber}`,
        email: `${email}`,
        companyName: `${companyName}`,
      };
      return new Promise((resolve, reject) => {
        this.client.connect((e, client) => {
          if (e) {
            reject(e);
          }
          const collection = client
            .db(process.env.MONGODB_DATABASE || 'person')
            .collection(process.env.MONGODB_COLLECTION || 'persons');
          collection.insertOne(person, async (err, result) => {
            if (err) {
              reject(err);
            }
            resolve(result);
          });
        });
      });
    });
  }

  select(param = {}) {
    return new Promise((resolve, reject) => {
      this.client.connect((e, client) => {
        if (e) {
          reject(e);
        }
        const collection = client
          .db(process.env.MONGODB_DATABASE || 'person')
          .collection(process.env.MONGODB_COLLECTION || 'persons');
        collection
          .find(param)
          .toArray()
          .then((items) => {
            resolve(items);
          })
          .catch(() => reject());
      });
    });
  }

  private updateId(name) {
    return new Promise((resolve, reject) => {
      this.client.connect((e, client) => {
        if (e) {
          console.log(e);
        }
        this.client
          .db(process.env.MONGODB_DATABASE)
          .collection('counters')
          .findOneAndUpdate(
            { id: name },
            { $inc: { seq: 1 } },
            {
              // new: true,
              upsert: true,
            },
          )
          .then((result) => {
            resolve(result['value']['seq']);
          })
          .catch(() => {
            reject();
          });
      });
    });
  }

  update(
    id: string,
    fname: string,
    lname: string,
    age: number,
    city: string,
    phoneNumber: string,
    email: string,
    companyName: string,
  ) {
    return new Promise((resolve, reject) => {
      this.client.connect((e, client) => {
        if (e) {
          reject(e);
        }
        const collection = client
          .db(process.env.MONGODB_DATABASE)
          .collection(process.env.MONGODB_COLLECTION);
        collection.updateOne(
          { id },
          {
            $set: {
              fname: `${fname}`,
              lname: `${lname}`,
              age,
              city: `${city}`,
              phoneNumber: `${phoneNumber}`,
              email: `${email}`,
              companyName: `${companyName}`,
            },
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          },
        );
      });
    });
  }

  delete(id: string) {
    return new Promise((resolve, reject) => {
      this.client.connect((e, client) => {
        if (e) {
          reject(e);
        }
        const collection = client
          .db(process.env.MONGODB_DATABASE)
          .collection(process.env.MONGODB_COLLECTION);
        collection.deleteOne({ id }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      });
    });
  }

  clear() {
    return new Promise((resolve, reject) => {
      this.client.connect((e, client) => {
        if (e) {
          reject(e);
        }
        const collection = client
          .db(process.env.MONGODB_DATABASE)
          .collection(process.env.MONGODB_COLLECTION);
        collection.deleteMany({}, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      });
    });
  }
}
