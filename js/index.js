window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const roadImg = new Image();
roadImg.src = './images/road.png';
const carImg = new Image();
carImg.src = './images/car.png';

let obstacles = [];
let frames = 0;
const leftLimit = 45;
const rightLimit = 250;
const widthCanvas = 350;
const heightCanvas = 500;
let carX = leftLimit;
let carY = 410;
let carSpeed = 10;

class Component {
  constructor(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
  }

  update() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  newPos() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
}

class Obstacle extends Component {
  constructor(width, height, color, x, y) {
    super(width, height, color, x, y);
  }

  update() {
    this.y += 5; // Move obstacles down the road
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

function startGame() {
  clear();
  draw();
  updateObstacles();
  requestAnimationFrame(startGame);
}

function updateObstacles() {
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].update();
  }

  frames += 1;
  if (frames % 120 === 0) {
    let x = Math.floor(Math.random() * (widthCanvas - 20)) + 10; // Random x position within canvas width
    let obstacle = new Obstacle(10, 20, 'green', x, 0);
    obstacles.push(obstacle);
  }
}

function clear() {
  ctx.clearRect(0, 0, widthCanvas, heightCanvas);
}

function draw() {
  ctx.drawImage(roadImg, 0, 0, widthCanvas, heightCanvas);
  ctx.drawImage(carImg, carX, carY, 60, 60);
}

window.addEventListener('keydown', (e) => {
  switch (e.keyCode) {
    case 37: // left arrow
      carX -= carSpeed;
      if (carX < leftLimit) carX = leftLimit;
      break;
    case 39: // right arrow
      carX += carSpeed;
      if (carX > rightLimit) carX = rightLimit;
      break;
  }
});



