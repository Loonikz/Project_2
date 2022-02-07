const {createConnection} = require('mysql');
// @ts-ignore
class MySQL {
    private connect: any;

    constructor(config) {
        this.connect = createConnection(config);
    }

    async connection() {
        this.connect.connect((e) => {
            if (e) {
                console.log(e)
            } else {
                console.log('Connection mySQL')
            }
        })
    }

    async query(queryString: string) {
        this.connect.query(queryString, (e, rows, fields) => {
            if (e) {
                console.log(e)
            } else {
                console.log(rows);
                return rows;
            }
        })
    }

    async queryAll(str, cb) {
        this.connect.query(str, (e, rows, fields) => {
            if (e) {
                console.log(e)
            } else {
                console.log(rows);
                cb(rows);
            }
        })
    }

    async insert(fname: string, lname: string, age: number, city: string, phoneNumber: string, email: string, companyName: string) {
        await this.query(`INSERT INTO heroku_74f535d3c337155.persons (fname, lname, age, city, phoneNumber, email, companyName)
                    VALUES ('${fname}', '${lname}', ${age}, '${city}', '${phoneNumber}', '${email}', '${companyName}')`)
    }

    async update(id, fname: string, lname: string, age: number, city: string, phoneNumber: string, email: string, companyName: string) {
        await this.query(`UPDATE heroku_74f535d3c337155.persons SET fname = '${fname}', lname = '${lname}', age = '${age}', city = '${city}',
            phoneNumber = '${phoneNumber}', email = '${email}', companyName = '${companyName}' WHERE (id = '${id}')`);
    }

    async delete(id) {
        await this.query(`DELETE FROM persons WHERE (id = '${id}')`)
    }
}

module.exports = {MySQL}
