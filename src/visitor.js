require('dotenv').config()

let { Pool } = require('pg')

let pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: 5432,
  database: 'visitordb'
})
class Visitors {
  constructor (fullname, age, dateofvisit, timeofvisit, assistedby, comments) {
    this.fullname = fullname
    this.age = age
    this.dateofvisit = dateofvisit
    this.timeofvisit = timeofvisit
    this.assistedby = assistedby
    this.comments = comments
    pool.connect()
  }

  async addNewVisitor () {
    try {
      let results = await pool.query(
        'INSERT into visitors(fullname, visitorsage, dateofvisit, timeofvisit, assistedby, comments) values($1,$2,$3,$4,$5,$6) ON CONFLICT(fullname) DO UPDATE SET dateofvisit = EXCLUDED.dateofvisit  RETURNING *',
        [
          this.fullname,
          this.age,
          this.dateofvisit,
          this.timeofvisit,
          this.assistedby,
          this.comments
        ]
      )
      return results.rows
    } catch (error) {
      throw error
    }
  }

  async viewAllVisitors () {
    try {
      let results = await pool.query('SELECT * from visitors')
      return results.rows
    } catch (error) {
      throw 'Cannot view all visitors ' + error
    }
  }

  async deleteVisitor (id) {
    try {
      let results = await pool.query(
        'DELETE from visitors WHERE visitorid = $1 RETURNING *',
        [id]
      )
      return results
    } catch (error) {
      throw 'Cannot delele a visitor ' + error
    }
  }

  async updateVisitorInfo (id) {
    try {
      let results = await pool.query(
        `INSERT into visitors values($1,$2,$3,$4,$5,$6,$7) ON CONFLICT (visitorid)
        DO UPDATE SET fullname= EXCLUDED.fullname, visitorsage = EXCLUDED.visitorsage,
        dateofvisit = EXCLUDED.dateofvisit, timeofvisit = EXCLUDED.timeofvisit, 
        assistedby = EXCLUDED.assistedby, comments = EXCLUDED.comments`,
        [
          id,
          this.fullname,
          this.age,
          this.dateofvisit,
          this.timeofvisit,
          this.assistedby,
          this.comments
        ]
      )
      console.log("Visitor updated")
      return results.rows
    } catch (error) {
      throw 'Cannot update visitor information' + error
    }
  }

  async viewOneVisitor (visitorid) {
    try {
      let results = await pool.query(
        'SELECT * from visitors WHERE visitorid = $1',
        [visitorid]
      )
      return results.rows
    } catch (error) {
      throw 'Visitor cannot be viewed ' + error
    }
  }

  async deleteAllVisitors () {
    try {
      let results = await pool.query('DELETE FROM visitors')
      return results
    } catch (error) {
      throw 'Visitors cannot be deleted ' + error
    }
  }
}

module.exports = {
  Visitors
}
