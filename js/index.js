const obstacles = [];
let score = 0;

// function generateObstacle() {
//   const obstacleWidth = 50; // Adjust the obstacle size as needed
//   const xPosition = Math.random() * (canvas.width - obstacleWidth);
//   const obstacle = { x: xPosition, y: 0, width: obstacleWidth, height: 20 }; // Adjust the height as needed
//   obstacles.push(obstacle);
// }
function generateObstacle() {
  const obstacleWidth = 50; // Adjust the obstacle size as needed
  const xPosition = Math.random() * (canvas.width - obstacleWidth);
  const obstacle = { x: xPosition, y: 0, width: obstacleWidth, height: 80, color: 'red' }; 
  obstacles.push(obstacle);
}


function startGame() {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  const roadImage = new Image();
  roadImage.src = './images/road.png';

  roadImage.onload = function() {
    context.drawImage(roadImage, 0, 0, canvas.width, canvas.height);
  };
      // Hide the intro and show the canvas
    // const introDiv = document.querySelector('.game-intro');
    // const canvasDiv = document.querySelector('#game-board');
    // introDiv.style.display = 'none';
    // canvasDiv.style.display = 'block';

  // Load the player's car image
  const carImage = new Image();
  carImage.src = './images/car.png';
  // Set the width and height of the car
  carImage.width = 50; // Adjust the width as needed
  carImage.height = 100; // Adjust the height as needed

  // Initial car position
  let carX = canvas.width / 2 - carImage.width / 2;
  const carY = canvas.height - carImage.height; // Place the car at the bottom
  // const carY = 50
  carImage.onload = function() {
    // context.drawImage(carImage, carX, carY);
    context.drawImage(carImage, carX, carY, carImage.width, carImage.height);

  };

  // Now, we'll add code to move the car left and right
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      // Move the car left within the canvas boundaries
      if (carX > 0) {
        carX -= 10; // Adjust the speed as needed
        context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        context.drawImage(roadImage, 0, 0, canvas.width, canvas.height); // Redraw the road
        // context.drawImage(carImage, carX, carY); // Draw the car in the new position
        context.drawImage(carImage, carX, carY, carImage.width, carImage.height);

      }
    } else if (event.key === 'ArrowRight') {
      // Move the car right within the canvas boundaries
      if (carX + carImage.width < canvas.width) {
        carX += 10; // Adjust the speed as needed
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(roadImage, 0, 0, canvas.width, canvas.height);
        // context.drawImage(carImage, carX, carY);
        context.drawImage(carImage, carX, carY, carImage.width, carImage.height);

      }
    }
  });

  // Create obstacles at regular intervals
  setInterval(generateObstacle, 2000); // Adjust the interval as needed
}

// function updateGame() {
//   const context = canvas.getContext('2d');
//   context.clearRect(0, 0, canvas.width, canvas.height);
//   context.drawImage(roadImage, 0, 0, canvas.width, canvas.height);

//   // Move obstacles and check for collisions
//   for (let i = 0; i < obstacles.length; i++) {

//     obstacles[i].y += 5; // Adjust the speed as needed
//     context.fillRect(obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);

//     // Check for collisions with the car (you need to implement this)
//     if (checkCollision(carX, carY, carImage.width, carImage.height, obstacles[i])) {
//       // Handle collision (e.g., end the game)
//     }
//     if (obstacles[i].y > canvas.height) {
//       score += 1;
//       obstacles.splice(i, 1);
//       i--;
//     }
//   }

function updateGame() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(roadImage, 0, 0, canvas.width, canvas.height);

  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].y += 5; // Adjust the speed as needed

    // Set the obstacle color
    context.fillStyle = obstacles[i].color;

    // Draw the obstacle
    context.fillRect(obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);

    // Check for collisions with the car (you need to implement this)
    if (checkCollision(carX, carY, carImage.width, carImage.height, obstacles[i])) {
      // Handle collision (e.g., end the game)
    }
    if (obstacles[i].y > canvas.height) {
      score += 1;
      obstacles.splice(i, 1);
      i--;
    }
  }

  context.drawImage(carImage, carX, carY, carImage.width, carImage.height);

  // Display the score
  context.fillStyle = '#000';
  context.font = '30px Arial';
  context.fillText(`Score: ${score}`, 10, 30);

  // Request the next frame
  requestAnimationFrame(updateGame);
}


//   // Redraw the car
//   context.drawImage(carImage, carX, carY, carImage.width, carImage.height);

//   // Request the next frame
//   requestAnimationFrame(updateGame);

//   // Display the score
//   context.fillStyle = '#000'; // Set the text color
//   context.font = '30px Arial'; // Set the font size and style
//   context.fillText(`Score: ${score}`, 10, 30); // Display the score
// }




window.addEventListener('load', () =>{
  let startBtn = document.querySelector('#start-button')

  startBtn.addEventListener('click', () => {
    startGame();
  })
})