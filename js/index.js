let canvas;
let ctx;
let carX = 220; 
let obstacles = [];
let score = 0;
let gameStarted = false; 

// Load images
const roadImage = new Image();
roadImage.src = './images/road.png';
const carImage = new Image();
carImage.src = './images/car.png';


function startGame() {
    // Set game state to started
    gameStarted = true;
    
    // Create canvas element
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    // Set event listener for keydown event to control car movement
    document.addEventListener('keydown', handleKeyDown);

    // Start game loop
    updateCanvas();
}

// Function to handle keydown events for car movement
function handleKeyDown(event) {
    if (gameStarted) {
        if (event.key === 'ArrowLeft') {
            // Move the car to the left
            carX -= 10;
            if (carX < 70) {
                carX = 70; // Set boundary to prevent the car from going off the road
            }
        } else if (event.key === 'ArrowRight') {
            // Move the car to the right
            carX += 10;
            if (carX > 380) {
                carX = 380; // Set boundary to prevent the car from going off the road
            }
        }
    }
}

// Function to update canvas and draw elements
function updateCanvas() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw road image
  ctx.drawImage(roadImage, 0, 0, canvas.width, canvas.height);

  // Draw car image with updated position
  ctx.drawImage(carImage, carX, 600, 60, 100); // Adjust position and size as needed

  // Draw obstacles
  obstacles.forEach(obstacle => {
      obstacle.draw();
      obstacle.move();
      if (obstacle.collidesWithCar()) {
          endGame();
      }
  });

  // Generate obstacles
  generateObstacle();

  // Update score
  updateScore();

  // Request next animation frame
  requestAnimationFrame(updateCanvas);
}

// Function to generate obstacles
function generateObstacle() {
    if (Math.random() < 0.02) { // Adjust obstacle generation rate
        const obstacleX = Math.random() * (canvas.width - 50); // Random X position
        obstacles.push({
            x: obstacleX,
            y: 0,
            width: 50,
            height: 50,
            draw: function() {
                ctx.fillStyle = 'red';
                ctx.fillRect(this.x, this.y, this.width, this.height);
            },
            move: function() {
                this.y += 5; // Adjust obstacle speed
                if (this.y > canvas.height) {
                    obstacles.shift(); // Remove obstacle if it goes beyond the canvas
                    score++; // Increment score when obstacle passes the car
                }
            },
            collidesWithCar: function() {
                return (
                    carX < this.x + this.width &&
                    carX + 60 > this.x &&
                    600 < this.y + this.height &&
                    700 > this.y
                );
            }
        });
    }
}

// Function to update score
function updateScore() {
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.fillText('Score: ' + score, 20, 40);
}

// Function to end the game
function endGame() {
    alert('Game Over! Your score: ' + score);
    document.location.reload();
    carX = 220;

    // Clear obstacles array
    obstacles = [];

    // Reset score
    score = 0;

    // Redraw canvas with initial state
    startGame();
}

// Initialize game when the DOM content is loaded
window.addEventListener('load', () => {
  let startBtn = document.querySelector('#start-button');

  startBtn.addEventListener('click', () => {
      startGame();
  });
});