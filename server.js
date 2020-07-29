const express = require('express')
const routes = require('./src/api')
const path = require('path')
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))
app.use('/api',routes);

app.use(express.static('public'))

app.get('/', (req, res)=>{
    res.sendFile('index.html', {root : __dirname})
})

let server = app.listen(process.env.PORT || 4100, ()=>{
let port = server.address().port
let host = server.address().address
console.log(`Listening to ${host}:${port}`)
})

module.export = server;