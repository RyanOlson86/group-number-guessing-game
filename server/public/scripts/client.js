function onReady() {
  console.log("JavaScript is loaded!");
  handleGetInfo()
}
 let roundCount = 1;

function handleSubmit(event) {
  event.preventDefault();

  // player 1 inputs
  let player1Name = document.getElementById("nameOneInput").value
  let player1Guess = document.getElementById("numberOneInput").value

  // player 2 inputs
  let player2Name = document.getElementById("nameTwoInput").value
  let player2Guess = document.getElementById("numberTwoInput").value

  axios({
    method: "POST",
    url: "/guess",
    data: { 
      round: roundCount,
      player1:  
      {
        name: player1Name,
        guess: player1Guess
      },
      player2:
      {
        name: player2Name,
        guess: player2Guess
      }
    }
  })
  .then((response)=>{
    console.log('successfully added')
    // increment roundCount
  roundCount ++
    // handleGetInfo() // reuse GET request to retrieve latest POST and updata DOM
    handleGetInfo()
  })
  .catch((error)=>{
    console.log("server error", error);
  })
  document.getElementById("formInputs").reset();

}

function handleGetInfo() {

  axios({
    method: "GET",
    url: "/guess",
  })
  .then((response)=>{
    console.log('response from get', response.data)
   let incArray = response.data
   let resultDiv = document.getElementById("resultDiv")
   resultDiv.innerHTML='';
   for (let round of incArray) {
    resultDiv.innerHTML += `<div>Round ${round.round} ${round.player1.name} guessed ${round.player1.guess} and ${round.player1.result}</div>`
    resultDiv.innerHTML += `<div>Round ${round.round} ${round.player2.name} guessed ${round.player2.guess} and ${round.player2.result}</div>`
   }
    // handleGetInfo() // reuse GET request to retrieve latest POST and updata DOM
  })
  .catch((error)=>{
    console.log("server error", error);
  })
}

// Function to reset game and tell server to reset data
function resetFunction(){
  
  axios({
    method: "POST",
    url: "/reset",
    data: {}
  })
  .then((response)=>{
    roundCount = 1;
    handleGetInfo()
  })
  .catch((error)=>{
    console.log("server error", error);
  })
  
}


onReady();
