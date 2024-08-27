const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Car initial position
let carX = canvas.width / 2 - 25;
const carY = canvas.height - 100;

// Store obstacles and score
let obstacles = [];
let score = 0;

// Car image object
const carImg = new Image();
carImg.src = "./images/car.png";

// Road image object
const roadImg = new Image();
roadImg.src = "./images/road.png";

// Start the game when the road image is loaded
roadImg.onload = () => {
  startGame();
};

function startGame() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the road and the car
  ctx.drawImage(roadImg, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(carImg, carX, carY, 50, 100);

  // Set intervals for game updates
  setInterval(createObstacle, 2000);
  setInterval(updateCanvas, 20);
}

function createObstacle() {
  let obstacleX = Math.random() * (canvas.width - 50);
  let obstacleY = 0;
  obstacles.push({ x: obstacleX, y: obstacleY, width: 50, height: 20 });
}

function drawObstacles() {
  obstacles.forEach((obstacle) => {
    ctx.fillStyle = "red";
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  });
}

function moveObstacles() {
  obstacles.forEach((obstacle) => {
    obstacle.y += 5;
  });
}

function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(`Score: ${score}`, 10, 30);
}

function updateCanvas() {
  // Clear the canvas before drawing
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the road and car in the updated position
  ctx.drawImage(roadImg, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(carImg, carX, carY, 50, 100);

  // Move and draw obstacles, and update the score
  moveObstacles();
  drawObstacles();
  drawScore();
  score++;
}
 

function handleKeydown(e) {
  // Move the car left or right depending on the key pressed
  if (e.key === "ArrowLeft" && carX > 0) {
    carX -= 10;
  }
  if (e.key === "ArrowRight" && carX < canvas.width - 50) {
    carX += 10;
  }
  updateCanvas();
}

// Listen for keydown events to move the car
window.addEventListener("keydown", handleKeydown);

window.addEventListener("load", () => {
  let startBtn = document.querySelector("#start-button");
  startBtn.addEventListener("click", () => {
    startGame();
  });
});
