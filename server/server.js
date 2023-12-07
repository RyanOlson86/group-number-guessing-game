const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5001;
let results =[]
// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// GET & POST Routes go here

app.get("/guess", (req, res) => {
console.log("in get /guess", results);
res.send(results)
})

app.post("/guess", (req, res) => {
console.log("in POST /guess", req.body);
results.push(req.body)
console.log("checking results:", results);
res.sendStatus(201)
})

app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})
