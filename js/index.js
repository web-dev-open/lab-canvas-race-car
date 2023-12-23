function startGame() {
  const gameBoardElement = document.getElementById("game-board");
  gameBoardElement.style.display = "block";

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const carWidth = 50;
  const carHeight = 100;
  const carSpeed = 5;
  const obstacleWidth = 50;
  const obstacleHeight = 50;
  const obstacleSpeed = 3;
  let carX = canvas.width / 2 - carWidth / 2;
  const carY = canvas.height - carHeight;
  let obstacles = [];
  let score = 0;

  function drawCar() {
    ctx.fillStyle = "blue";
    ctx.fillRect(carX, carY, carWidth, carHeight);
  }

  function drawObstacles() {
    ctx.fillStyle = "red";
    obstacles.forEach((obstacle) => {
      ctx.fillRect(obstacle.x, obstacle.y, obstacleWidth, obstacleHeight);
    });
  }

  function moveCar(event) {
    if (event.key === "ArrowLeft" && carX > 0) {
      carX -= carSpeed;
    } else if (event.key === "ArrowRight" && carX < canvas.width - carWidth) {
      carX += carSpeed;
    }
  }

  function createObstacle() {
    const randomX = Math.random() * (canvas.width - obstacleWidth);
    obstacles.push({ x: randomX, y: 0 });
  }

  function updateObstacles() {
    obstacles = obstacles.filter((obstacle) => obstacle.y < canvas.height);
    obstacles.forEach((obstacle) => (obstacle.y += obstacleSpeed));
  }

  function checkCollisions() {
    obstacles.forEach((obstacle) => {
      if (
        carX < obstacle.x + obstacleWidth &&
        carX + carWidth > obstacle.x &&
        carY < obstacle.y + obstacleHeight &&
        carY + carHeight > obstacle.y
      ) {
        gameOver();
      }
    });
  }

  function gameOver() {
    alert(`Game Over! Your Score: ${score}`);

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Reset game variables
    carX = canvas.width / 2 - carWidth / 2;
    obstacles = [];
    score = 0;
    obstacleHeight = 0;
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawCar();
    drawObstacles();

    checkCollisions();

    score++;
    updateObstacles();
    if (score % 100 === 0) {
      createObstacle();
    }

    requestAnimationFrame(draw);
  }

  document.addEventListener("keydown", moveCar);
  createObstacle();
  draw();
}

window.addEventListener("load", () => {
  let startBtn = document.querySelector("#start-button");

  startBtn.addEventListener("click", () => {
    startGame();
  });
});