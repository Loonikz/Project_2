import mysql from 'mysql';

export class MySQL {
  private connect: mysql.createConnection;

  constructor() {
    try {
      this.connect = mysql.createConnection({
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || 'root',
        database: process.env.MYSQL_DATABASE || 'userdatabase',
      });
      this.connect.connect();
    } catch (e) {
      console.log(e);
    }
  }

  insert(
    fname: string,
    lname: string,
    age: number,
    city: string,
    phoneNumber: string,
    email: string,
    companyName: string,
  ) {
    return new Promise((resolve, reject) => {
      try {
        this.connect.query(
          `INSERT INTO ${process.env.MYSQL_DATABASE}.persons (fname, lname, age, city, phoneNumber, email, companyName)
                    VALUES ('${fname}', '${lname}', ${age}, '${city}', '${phoneNumber}', '${email}', '${companyName}')`,
          (err: Error, result: object) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          },
        );
      } catch (e) {
        console.log(e);
      }
    });
  }

  update(
    id,
    fname: string,
    lname: string,
    age: number,
    city: string,
    phoneNumber: string,
    email: string,
    companyName: string,
  ) {
    return new Promise((resolve, reject) => {
      try {
        this.connect.query(
          `UPDATE ${process.env.MYSQL_DATABASE}.persons SET fname = '${fname}', lname = '${lname}', age = '${age}', city = '${city}',
            phoneNumber = '${phoneNumber}', email = '${email}', companyName = '${companyName}' WHERE (id = '${id}')`,
          (err: Error, result: object) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          },
        );
      } catch (e) {
        console.log(e);
      }
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      try {
        this.connect.query(
          `DELETE FROM persons WHERE (id = '${id}')`,
          (err: Error, result: object) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          },
        );
      } catch (e) {
        console.log(e);
      }
    });
  }

  clear() {
    return new Promise((resolve, reject) => {
      try {
        this.connect.query(`TRUNCATE TABLE persons`, (err: Error, result: object) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      } catch (e) {
        console.log(e);
      }
    });
  }

  select() {
    return new Promise((resolve, reject) => {
      try {
        this.connect.query(`select * FROM persons`, (err: Error, result: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      } catch (e) {
        console.log(e)
      }
    });
  }

  close(): void {
    this.connect.end((err: Error) => {
      if (err) {
        return err;
      }
      return true;
    });
  }
}
