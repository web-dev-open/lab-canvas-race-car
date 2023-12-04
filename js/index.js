const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const carImage = new Image();
carImage.src = 'https://i.postimg.cc/5NdSP7yC/car.png';

const arrowImage = new Image();
arrowImage.src = './images/arrows.png';

const roadImage = new Image();
roadImage.src = 'https://i.postimg.cc/8C967cr6/road.png';

let gameRunning = false;
let score = 0;

const car = {
  x: 225,
  y: 600,
  width: 50,
  height: 50,
  speed: 5
};

const obstacles = [];

function startGame() {
  if (!gameRunning) {
    gameRunning = true;
    window.addEventListener('keydown', handleKeyPress);
    setInterval(updateGame, 20); // Use setInterval for constant updates
  }
}

function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRoad();
  drawCar();
  drawObstacles();
  moveObstacles();
  checkCollision();
  drawScore();
}

function drawRoad() {
  ctx.drawImage(roadImage, 0, 0, canvas.width, canvas.height);
}

function drawCar() {
  ctx.drawImage(carImage, car.x, car.y, car.width, car.height);
}

function handleKeyPress(event) {
  if (event.code === 'ArrowLeft') {
    moveCar('left');
  } else if (event.code === 'ArrowRight') {
    moveCar('right');
  }
}

function moveCar(direction) {
  if (direction === 'left' && car.x > 0) {
    car.x -= car.speed;
  } else if (direction === 'right' && car.x + car.width < canvas.width) {
    car.x += car.speed;
  }
}

function drawObstacles() {
  obstacles.forEach((obstacle) => {
    ctx.fillStyle = 'red';
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  });
}

function moveObstacles() {
  obstacles.forEach((obstacle) => {
    obstacle.y += obstacle.speed;
  });

  if (Math.random() < 0.02) {
    const newObstacle = {
      x: Math.random() * (canvas.width - 30),
      y: 0,
      width: 30,
      height: 30,
      speed: 5
    };
    obstacles.push(newObstacle);
  }

  obstacles.filter((obstacle) => obstacle.y < canvas.height);
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

function drawScore() {
  ctx.fillStyle = 'black';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 10, 30);
}

function gameOver() {
  gameRunning = false;
  alert(`Game Over! Your score: ${score}`);
  score = 0;
  obstacles.length = 0;
  startGame();
}

window.addEventListener('load', () => {
  const startBtn = document.querySelector('#start-button');

  startBtn.addEventListener('click', () => {
    startGame();
  });
});
