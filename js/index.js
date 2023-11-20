// **************************************
// Iteration No. 1 - Draw the Game Board.
// **************************************

function startGame() {
// remove the game intro section when starting it
document.querySelector(".game-intro").style.display = "none";

  // Getting the canvas element
  const canvas = document.getElementById("canvas");

  // Getting the 2D rendering context
  const ctx = canvas.getContext("2d");

  // Creating the image element for the road
  const roadImg = new Image();

  // Getting the image from the source code
  roadImg.src = "./images/road.png";

  // When the road image is loaded. Execute it.
  roadImg.onload = () => {
    // Drawing the road on the canvas
    ctx.drawImage(roadImg, 0, 0, canvas.width, canvas.height);
  };

}

// Listening for the load event on the window
window.addEventListener('load', () =>{

  // Getting the Start Button
  let startBtn = document.querySelector('#start-button')

  // Attaching a click listener to the Start Game Button
  startBtn.addEventListener('click', () => {
    
    // Calling the start game function
    startGame();
  });
});