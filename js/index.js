// **************************************
// Iteration No. 1 - Draw the Game Board.
// **************************************

// Function to start the game
function startGame() {
  // Hide the game intro section when starting the game
  document.querySelector(".game-intro").style.display = "none";

  // Getting the canvas element
  const canvas = document.getElementById("canvas");

  if (!canvas) {
    console.error("Canvas element not found.");
    return;
  }

  // Getting the 2D rendering context
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    console.error("2D rendering context not supported.");
    return;
  }

  // Creating the image element for the road
  const roadImg = new Image();

  // Getting the image from the source code
  roadImg.src = "./images/road.png";

  // Wait for the road image to load before proceeding
  roadImg.onload = () => {
    // ******************************
    // Iteration No. 2 - Draw the car
    // ******************************

    // Creating the image element for the car
    const carImg = new Image();
    carImg.src = "./images/Porsche-911.png";

    // Wait for the car image to load before proceeding
    carImg.onload = () => {
      // Initialize points and lives
      let points = 0;
      let lives = 3;

      // Car position
      let carX = (canvas.width / 2) - 10;
      const carY = canvas.height - carImg.height + 270;
      const carWidth = carImg.width / 2.3;
      const carHeight = carImg.height / 2.3;

      // Function to update the car position
      const updateCarPosition = () => {
        carX += carSpeed;

        // Boundaries
        if (carX < 0) {
          carX = 0;
        } else if (carX > canvas.width - carWidth) {
          carX = canvas.width - carWidth;
        }
      };

      // Function to draw points on the canvas
      const drawPoints = () => {
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(10, 10, 100, 40);
        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("Points: " + points, 15, 30);
      };

      // Function to draw lives on the canvas
      const drawLives = () => {
        const heart = "❤️";
        const livesText = "Lives: " + heart.repeat(lives);
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(canvas.width - 150, 10, 140, 40);
        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(livesText, canvas.width - 150, 30);
      };


      // **************************************************
      // Iteration No. 3 - Make the Car move Rigth and Left
      // ***************************************************

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

      // *************************
      // Iteration No. 4 - Create obstacles
      // *************************

      // Array to store obstacles
      const obstacles = [];

      // Function to create a new obstacle
      const createObstacle = () => {
        const obstacleWidth = 80;
        const obstacleHeight = 20;
        const obstacleX = Math.random() * (canvas.width - obstacleWidth);
        const obstacleY = 0;

        obstacles.push({ x: obstacleX, y: obstacleY, width: obstacleWidth, height: obstacleHeight });
      };

      // Function to update obstacle positions
      const updateObstacles = () => {
        for (let i = 0; i < obstacles.length; ++i) {
          const obstacle = obstacles[i];

          // Adjust the speed of obstacles
          obstacle.y += 5;

          // Remove obstacles when they go beyond the canvas
          if (obstacle.y > canvas.height) {
            obstacles.splice(i, 1);

            // Adjust the index after removing an obstacle
            i--;
          }
        }
      };

      // Function to draw obstacles
      const drawObstacles = () => {
        // Adjust obstacle color
        ctx.fillStyle = "red";

        for (const obstacle of obstacles) {
          ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        }
      };

      // ************************************
      // Iteration No. 5 - Move the Obstacles
      // ************************************

      // Initialize a variable to track the road movement
      let roadSpeed = 0;

      // Update the road position
      const updateRoadPosition = () => {
        roadSpeed = 2; // Adjust the speed of the road

        // Move the road
        ctx.drawImage(roadImg, 1, roadSpeed, canvas.width, canvas.height);
        ctx.drawImage(roadImg, 1, -canvas.height + roadSpeed, canvas.width, canvas.height);

        // Reset the road position
        if (roadSpeed >= canvas.height) {
          roadSpeed = 0;
        }
      };

      // Function to handle game over
      const gameOver = () => {
        // Display game over text
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = "40px Arial";
        ctx.fillStyle = "red";
        ctx.fillText("Game Over :(", canvas.width / 2 - 120, canvas.height / 2);

        // Display restart button
        displayRestartButton();
      };
      // Function to restart the game
      const restartGame = () => {
        // Reset points and lives
        points = 0;
        lives = 3;

        // Clear obstacles
        obstacles.length = 0;

        // Remove restart button
        removeRestartButton();

        // Continue the game loop
        gameLoop = requestAnimationFrame(drawGame);
      };

      // Function to check collisions with obstacles
      const checkCollisions = () => {
        for (const obstacle of obstacles) {
          if (
            carX < obstacle.x + obstacle.width &&
            carX + carWidth > obstacle.x &&
            carY < obstacle.y + obstacle.height &&
            carY + carHeight > obstacle.y
          ) {
            // Collision detected, handle game over
            lives--;

            if (lives <= -1) {
              gameOver();
              displayRestartButton();
              cancelAnimationFrame(gameLoop);
            }

            // Remove the collided obstacle
            const index = obstacles.indexOf(obstacle);
            obstacles.splice(index, 1);
          }
        }
      };

      // **********************************************
      // Iteration No. 6 - Points, Points and Points!!!
      // **********************************************

      // Function to check if the car has passed an obstacle
      const checkPassedObstacles = () => {
        for (const obstacle of obstacles) {
          if (obstacle.y + obstacle.height >= canvas.height) {
            // Car has passed the obstacle, increment points
            points += 10;

            // Remove the passed obstacle
            const index = obstacles.indexOf(obstacle);
            obstacles.splice(index, 1);
          }
        }
      };

      // Function to display the restart button
      const displayRestartButton = () => {
        const restartButton = document.createElement("button");
        restartButton.id = "restart-button";
        restartButton.innerText = "Restart";
        restartButton.style.position = "fixed";
        restartButton.style.bottom = "5px"; // Adjust the vertical position
        restartButton.style.left = "calc(50% - 90px)"; // Center the button horizontally
        restartButton.addEventListener("click", restartGame);
        document.body.appendChild(restartButton);
        
      };
      
      // Function to remove the restart button
      const removeRestartButton = () => {
        const restartButton = document.getElementById("restart-button");
        if (restartButton) {
          restartButton.remove();
          location.reload();

        }
      };
      // Adding the Animation loop
      let gameLoop;

      const drawGame = () => {
        // Clear the canvas
        ctx.clearRect(10, 10, canvas.width, canvas.height);

        // Draw and update road position
        updateRoadPosition();

        // Draw and update obstacles
        updateObstacles();
        drawObstacles();

        // Draw and update car position
        updateCarPosition();
        ctx.drawImage(carImg, carX, carY, carWidth, carHeight);

        // Check for collisions
        checkCollisions();

        // Check for passed obstacles
        checkPassedObstacles();

        // Draw points and lives
        drawPoints();
        drawLives();

        // Continue the game loop
        gameLoop = requestAnimationFrame(drawGame);
      };

      // Start the game loop
      drawGame();

      // Interval to create new obstacles every 2 seconds
      setInterval(() => {
        createObstacle();
      }, 2000);
    };
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