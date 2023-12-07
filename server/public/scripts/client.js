function onReady() {
  console.log("JavaScript is loaded!");
}
 let roundCount = 0;

function handleSubmit(event) {
  event.preventDefault();

  // player 1 inputs
  let player1Name = document.getElementById("nameOneInput").value
  let player1Guess = document.getElementById("numberOneInput").value

  // player 2 inputs
  let player2Name = document.getElementById("nameTwoInput").value
  let player2Guess = document.getElementById("numberTwoInput").value

  // increment roundCount
  roundCount ++

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
    // handleGetInfo() // reuse GET request to retrieve latest POST and updata DOM
  })
  .catch((error)=>{
    console.log("server error", error);
  })
  document.getElementById("formInputs").reset();

}

onReady();
