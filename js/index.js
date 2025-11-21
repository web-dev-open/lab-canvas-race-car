const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// LOAD ROAD IMAGE
const roadImg = new Image();
roadImg.src = "./images/road.png";

// DRAW ROAD
function drawRoad() {
  ctx.drawImage(roadImg, 0, 0, canvas.width, canvas.height);
}

// START GAME
function startGame() {
  updateGame();  // road, car, and obstacles update automatically
}

// START BUTTON
window.addEventListener('load', () => {
  const startBtn = document.getElementById('start-button');
  startBtn.addEventListener('click', startGame);
});

// CREATE THE CAR
const carImg = new Image();
carImg.src = "./images/car.png";

// Car position and size
const car = {
  x: 225,      // start in the middle of the road
  y: 550,      // near the bottom
  width: 50,
  height: 100,
  speed: 10    // pixels per key press
};

// Draw the car on the canvas
function drawCar() {
  ctx.drawImage(carImg, car.x, car.y, car.width, car.height);
}

// Listen for key presses
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    car.x -= car.speed;  // move left
  } else if (event.key === 'ArrowRight') {
    car.x += car.speed;  // move right
  }

  // Prevent the car from leaving the road
  if (car.x < 0) car.x = 0;
  if (car.x + car.width > canvas.width) car.x = canvas.width - car.width;

  // Redraw everything
  drawRoad();
  drawCar();
});

// an array to hold obstacles
const obstacles = [];

// an Obstacle class
class Obstacle {

  constructor(x, width) {
    this.x = x;             // horizontal position (randomized later)
    this.y = 0;             // start at the top
    this.width = width;     // random width
    this.height = 20;       // fixed height for now
  }

  draw() {
    ctx.fillStyle = "red"; // color of the obstacle
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.y += 5; // speed of falling
  }

}

// Generate obstacles periodically
setInterval(() => {
  const randomX = Math.floor(Math.random() * (canvas.width - 100)); // max 100 width
  const randomWidth = 50 + Math.floor(Math.random() * 50); // 50-100 px wide
  const obstacle = new Obstacle(randomX, randomWidth);
  obstacles.push(obstacle);
}, 2000); // every 2 seconds

// Update the drawing
function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRoad();
  drawCar();

  obstacles.forEach((obs) => {
    obs.update();
    obs.draw();
  });

  drawScore();

  // Check collision
  if (checkCollision()) {
    alert("Game Over! Your score: " + score);
    return; // stops the game
  }

  // Increase score
  score++;

  requestAnimationFrame(updateGame);
}

let score = 0;
// draw score on the canvas
function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Score: " + score, 20, 30);
}

//Collision detection
function checkCollision() {
  for (let obs of obstacles) {
    if (
      car.x < obs.x + obs.width &&
      car.x + car.width > obs.x &&
      car.y < obs.y + obs.height &&
      car.y + car.height > obs.y
    ) {
      return true; // collision detected
    }
  }
  return false; // no collision
}
