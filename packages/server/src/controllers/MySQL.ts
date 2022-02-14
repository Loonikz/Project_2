import mysql from 'mysql';

export class MySQL {
  private connect: any;

  constructor() {
    this.connect = mysql.createConnection({
      host: process.env.MYSQL_HOST || 'localhost',
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || 'root',
      database: process.env.MYSQL_DATABASE || 'userdatabase',
    });
    this.connect.connect();
  }

  insert(fname: string, lname: string, age: number, city: string, phoneNumber: string, email: string, companyName: string) {
    return new Promise((resolve, reject) => {
      this.connect.query(`INSERT INTO heroku_74f535d3c337155.persons (fname, lname, age, city, phoneNumber, email, companyName)
                    VALUES ('${fname}', '${lname}', ${age}, '${city}', '${phoneNumber}', '${email}', '${companyName}')`,
        ((err: Error, result: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        })
      );
    });
  }

  update(id, fname: string, lname: string, age: number, city: string, phoneNumber: string, email: string, companyName: string) {
    return new Promise((resolve, reject) => {
      this.connect.query(`UPDATE heroku_74f535d3c337155.persons SET fname = '${fname}', lname = '${lname}', age = '${age}', city = '${city}',
            phoneNumber = '${phoneNumber}', email = '${email}', companyName = '${companyName}' WHERE (id = '${id}')`,
        ((err: Error, result: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        })
      );
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      this.connect.query(`DELETE FROM persons WHERE (id = '${id}')`,
        ((err: Error, result: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        })
      );
    });
  }

  select(id?: string) {
    if (id) {
      return new Promise((resolve, reject) => {
        this.connect.query(`select * FROM persons WHERE (id = '${id}')`,
          ((err: Error, result: any) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          })
        );
      });
    } else {
      return new Promise((resolve, reject) => {
        this.connect.query(`select * FROM persons`,
          ((err: Error, result: any) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          })
        );
      });
    }
  }

  closeConnection(): void {
    this.connect.end((err: Error) => {
      if (err) {
        return err;
      }
      return true;
    });
  }
}

