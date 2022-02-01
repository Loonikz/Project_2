const { createConnection } = require('mysql');
class MySQL {
    constructor(config) {
        this.connect = createConnection(config);
    }
    async connection() {
        this.connect.connect((e) => {
            if (e) {
                console.log(e);
            }
            else {
                console.log('Connection mySQL');
            }
        });
    }
    async query(queryString) {
        this.connect.query(queryString, (e, rows, fields) => {
            if (e) {
                console.log(e);
            }
            else {
                console.log(rows);
                return rows;
            }
        });
    }
    async queryAll(str, cb) {
        this.connect.query(str, (e, rows, fields) => {
            if (e) {
                console.log(e);
            }
            else {
                console.log(rows);
                cb(rows);
            }
        });
    }
    async insert(fname, lname, age, city, phoneNumber, email, companyName) {
        await this.query(`INSERT INTO person.persons (fname, lname, age, city, phoneNumber, email, companyName) 
                    VALUES ('${fname}', '${lname}', ${age}, '${city}', '${phoneNumber}', '${email}', '${companyName}')`);
    }
    async update(id, fname, lname, age, city, phoneNumber, email, companyName) {
        await this.query(`UPDATE person.persons SET fname = '${fname}', lname = '${lname}', age = '${age}', city = '${city}', 
            phoneNumber = '${phoneNumber}', email = '${email}', companyName = '${companyName}' WHERE (id = '${id}')`);
    }
    async delete(id) {
        await this.query(`DELETE FROM persons WHERE (id = '${id}')`);
    }
}
module.exports = { MySQL };
//# sourceMappingURL=MySQL.js.map