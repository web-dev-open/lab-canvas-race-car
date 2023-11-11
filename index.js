function startGame() {

}


  // Function to start the game
  function startGame() {
    // Get the canvas element
    var canvas = document.getElementById("gameCanvas");

    // Check if the canvas is supported
    if (canvas.getContext) {
      // Get the 2D rendering context
      var ctx = canvas.getContext("2d");

      // Create an Image object for the road
      var roadImage = new Image();
      roadImage.src = "images/road.jpg"; // Adjust the path based on your file structure

      // Draw the road image on the canvas
      roadImage.onload = function () {
        ctx.drawImage(roadImage, 0, 0, canvas.width, canvas.height);
      };
    } else {
      // Canvas not supported, provide fallback or error message
      alert("Canvas is not supported in your browser.");
    }
  }

  // Event listener for the Start Game button
  document.getElementById("startGameButton").addEventListener("click", startGame);




window.addEventListener('load', () =>{
  let startBtn = document.querySelector('#start-button')

  startBtn.addEventListener('click', () => {
    startGame();
  })
})
document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('start-button');
  const gameCanvas = document.getElementById('game-canvas');
  const context = gameCanvas.getContext('2d');
  
  // Load the road image
  const roadImage = new Image();
  roadImage.src = 'images/road.png';

  startButton.addEventListener('click', () => {
    // Hide the start button
    startButton.style.display = 'none';

    // Display the canvas
    gameCanvas.style.display = 'block';

    // Draw the road image on the canvas
    roadImage.onload = () => {
      context.drawImage(roadImage, 0, 0, gameCanvas.width, gameCanvas.height);
    };
  });
});
