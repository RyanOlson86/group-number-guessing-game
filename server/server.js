const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5001;
let results =[]
let randomNumberResult = 0;
let min = 1;
let max = 25;

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
// if statement to see if random number has been chosen
if(randomNumberResult === 0) {
  randomNumberResult = randomNumberGen(min, max)
}
console.log('random number is:',randomNumberResult)

// check player 1 guess
if(req.body.player1.guess == randomNumberResult){
  req.body.player1.result = 'You were correct!'
} else if(req.body.player1.guess < randomNumberResult){
  req.body.player1.result = 'You were too low!'
} else if(req.body.player1.guess > randomNumberResult){
  req.body.player1.result = 'You were too high!'
}

// check player 2 guess
if(req.body.player2.guess == randomNumberResult){
  req.body.player2.result = 'You were correct!'
} else if(req.body.player2.guess < randomNumberResult){
  req.body.player2.result = 'You were too low!'
} else if(req.body.player2.guess > randomNumberResult){
  req.body.player2.result = 'You were too high!'
}

results.push(req.body)
console.log("checking results:", results);
res.sendStatus(201)
})

app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})

function randomNumberGen (min, max) {
  let result = Math.floor(Math.random()*max) + min;
  return result;
}
