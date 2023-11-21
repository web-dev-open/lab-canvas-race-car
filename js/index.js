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

  // *************************
  // Iteration 2: Draw the car
  // *************************

  // Creating the image element for the car
  const carImg = new Image();
  carImg.src = "./images/car.png";

  // When the road image is loaded. Execute it.
  roadImg.onload = () => {
    // Drawing the road on the canvas
    ctx.drawImage(roadImg, 0, 0, canvas.width, canvas.height);

    // Drawing the player's car on the canvas
    const carWidth = carImg.width / 2; // Adjusting the car width
    const carHeight = carImg.height / 2; // Adjusting the car height
    let carX = canvas.width / 2 - carWidth / 2; // Centering horizontally
    const carY = canvas.height - carHeight - 20; // Placing at the bottom

    ctx.drawImage(carImg, carX, carY, carWidth, carHeight);

    // *********************************************
    // Iteration 3: Make the car move right and left
    // *********************************************

    // Initialize a variable to track the car movement
    let carSpeed = 0;

    // Add the listener for the arrow keys left and right
    document.addEventListener("keydown", (event) => {
      switch (event.key) {
        // Moving the car to the left
        case "ArrowLeft":
          carSpeed = -5;
          break;
        // Moving the car to the right
        case "ArrowRight":
          carSpeed = 5;
          break;
      }
    });

    // Stopping the car
    document.addEventListener("keyup", (event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        carSpeed = 0;
      }
    });

    // Updating the car position
    const updateCarPosition = () => {
      carX += carSpeed;

      // Boundaries
      if (carX < 0) {
        carX = 0;
      } else if (carX > canvas.width - carWidth) {
        carX = canvas.width - carWidth;
      }
    };

    // Adding animation loop
    function drawGame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(roadImg, 0, 0, canvas.width, canvas.height);
      updateCarPosition();
      ctx.drawImage(carImg, carX, carY, carWidth, carHeight);
      requestAnimationFrame(drawGame);
    }

    drawGame();
  };
}

// Listening for the load event on the window
window.addEventListener("load", () => {
  // Getting the Start Button
  let startBtn = document.querySelector("#start-button");

  // Attaching a click listener to the Start Game Button
  startBtn.addEventListener("click", () => {
    // Calling the start game function
    startGame();
  });
});
