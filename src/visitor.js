let {Pool, Client} = require("pg");
require('dotenv').config()


let client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: 5432,
    database: "visitordb"
});

client.connect()


class Visitors {
    constructor() {
        this.successMessage
        this.errorMessage
        this.myQuery
        this.myParams
    }

    async myTryCatch() {
        try {
           let results =  await client.query(this.myQuery, this.myParams)
           return results 
        } catch (err) {
            throw `${this.errorMessage} ${err}`;
        } 
    };

    async createTable() {
        this.myQuery = "CREATE TABLE visitors(visitorID SERIAL PRIMARY KEY, fullname VARCHAR(50) NOT NULL, visitorsage INT NOT NULL, dateofvisit DATE NOT NULL, timeofvisit TIME NOT NULL, assistedBy VARCHAR(50) NOT NULL, comments VARCHAR(100) NOT NULL)"
        this.errorMessage = "Table couldn't created";
        await this.myTryCatch();

    }
  
    async addNewVisitor(fullname, visitorsage, dateofvisit, timeofvisit, assistedby, comments) {
        this.myQuery= "INSERT into visitors(fullname, visitorsage, dateofvisit, timeofvisit, assistedby, comments) values($1,$2,$3,$4,$5,$6) RETURNING *"
        this.myParams= [
            fullname, visitorsage, dateofvisit, timeofvisit, assistedby, comments
          ]
        this.errorMessage= "Visitor could not be added"
        let results = await this.myTryCatch()
        return results.rows
    }

    async viewAllVisitors() {
        try {
            this.myQuery ="SELECT * from visitors"
            this.errorMessage = "Visitors cannot be listed";    
            let results =  await client.query(this.myQuery)
            return results.rows
         } catch (err) {
             throw `${this.errorMessage} ${err}`;
         } 
    }

    async deleteVisitor(visitorid) {
        this.myQuery ="DELETE from visitors WHERE visitorid = $1 RETURNING *" 
        this.myParams = [visitorid];
        this.errorMessage = "Visitor couldn't be deleted";
        this.successMessage = "Visitor successfully deleted";
        let results = await this.myTryCatch();
        // console.log(results.rows)
        return results.rows
    }

    async updateVisitorInfo(visitorid, fullname, visitorsage, dateofvisit, timeofvisit, assistedby, comments) {
        let insert = "INSERT into visitors(visitorid, fullname, visitorsage, dateofvisit, timeofvisit, assistedby, comments) values($1,$2,$3,$4,$5,$6,$7)"
        let conflict = "ON CONFLICT(visitorid) DO UPDATE SET"
        let fields = "fullname= EXCLUDED.fullname, visitorsage = EXCLUDED.visitorsage,dateofvisit = EXCLUDED.dateofvisit, timeofvisit = EXCLUDED.timeofvisit, assistedby = EXCLUDED.assistedby, comments = EXCLUDED.comments  RETURNING *"
        this.myQuery = `${insert} ${conflict} ${fields}`
        this.myParams = [visitorid, fullname, visitorsage, dateofvisit, timeofvisit, assistedby, comments]
        this.errorMessage = "Unable to update visitor information";
        let results = await this.myTryCatch();
        return results.rows
    }
    async selectOneVisitor(visitorID) {
       
        this.myQuery ="SELECT * FROM visitors WHERE visitorid = $1" 
        this.myParams = [visitorID];
        this.errorMessage = "Visitor cannot be selected";
        let results = await this.myTryCatch();
        return results.rows;
    }

    async deleteAllVisitors() {
        this.myQuery = "DELETE from visitors"
        this.errorMessage = "Unable to delete visitor";
        let results = await this.myTryCatch();
        return results
    }
}

// let f = new Visitors()
// f.deleteVisitor(80);
// f.viewAllVisitors();
module.exports = {
    Visitors
};
