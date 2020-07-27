const express = require('express')
const routes = require('./api')
const path = require('path')
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))
app.use('/api',routes);

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,`../public/visitorForm.html`))
})

// app.post(`/new_visit`, async (req, res) => {

    // let visitor = new Visitors(
    //   req.body.visitor_name,
    //   req.body.visitor_age,
    //   req.body.date_of_visit,
    //   req.body.time_of_visit,
    //   req.body.your_name,
    //   req.body.comments
    //   );
    //   visitor.addNewVisitor()
    // });


let server = app.listen(process.env.PORT || 4100, ()=>{
let port = server.address().port
let host = server.address().address
console.log(`Listening to ${host}:${port}`)
})

module.export = server;