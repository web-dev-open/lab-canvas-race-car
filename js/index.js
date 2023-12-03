let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let car;
let obstacles = [];
let intervalId, intervalId2, score;
let roadImg = new Image();
roadImg.src = "./images/road.png";

let gameIntro = document.querySelector(".game-intro");
let gameBoard = document.querySelector("#game-board");
let gameOverScreen = document.querySelector("#game-over");
let finalScoreDisplay = document.querySelector("#final-score");
let restartButton = document.querySelector("#restart-button");


function initializeGame() {
  drawRoad(); 
  drawScoreText();
  car = new Car();
  obstacles = [];
  score = 0;
}

function startGame() {
  initializeGame();

  gameIntro.style.display = "none";
  gameBoard.style.display = "block";

  intervalId = setInterval(() => {
    createObstacle();
  }, 1000);

  intervalId2 = setInterval(() => {
    moveObstacles();
    clearObstacles();
    checkCollision();
    updateCanvas();
    updateScore();
  }, 1000 / 60);
}

function drawRoad() {
  ctx.drawImage(roadImg, 0, 0, 500, 700);
}

function drawScoreText() {
  ctx.font = "30px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(`Score: ${score}`, 50, 50);
}

function updateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRoad();
  drawScoreText();
  drawObstacles();
  car.draw();
}

function createObstacle() {
  let obstacle = new Obstacle();
  obstacles.push(obstacle);
}

function drawObstacles() {
  obstacles.forEach((obstacle) => {
    obstacle.draw();
  });
}

function moveObstacles() {
  obstacles.forEach((obstacle) => {
    obstacle.moveDown();
  });
}

function clearObstacles() {
  obstacles = obstacles.filter((obstacle) => {
    return obstacle.y < canvas.height;
  });
}

function checkCollision() {
  obstacles.forEach((obstacle) => {
    if (
      car.x < obstacle.x + obstacle.width &&
      car.x + car.width > obstacle.x &&
      car.y < obstacle.y + obstacle.height &&
      car.y + car.height > obstacle.y
    ) {
      gameOver();
    }
  });
}

function gameOver() {
  clearInterval(intervalId);
  clearInterval(intervalId2);
  canvas.style.display = "none";
  gameOverScreen.style.display = "block";
  finalScoreDisplay.textContent = `Final Score: ${score}`;
}

function updateScore() {
  score++;
}


restartButton.addEventListener("click", () => {
  canvas.style.display = "block";
  gameOverScreen.style.display = "none";
  startGame();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    car.moveLeft();
  } else if (event.key === "ArrowRight") {
    car.moveRight();
  }
  updateCanvas();
});

window.addEventListener("load", () => {
  let startBtn = document.querySelector("#start-button");

  startBtn.addEventListener("click", () => {
    startGame();
  });
});
