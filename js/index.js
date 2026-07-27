const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

const roadImg = new Image();
roadImg.src = "./images/road.png";

let score = 0;
const obstacles = []
let isGameOver = false;

class Car {
  constructor() {
    this.x = 200;
    this.y = 570;
    this.width = 50;
    this.height = 50;
    const img = new Image();
    img.addEventListener('load', () => {
      this.img = img;
    })

    img.src = './images/car.png'
  }
  moveRight() {
    if (this.x > 400) {
      this.x = this.x
    } else {
      this.x += 40
    }
  }
  moveLeft() {
    if (this.x < 150) {
      this.x = this.x
    } else {
      this.x -= 40
    }
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
}

class Obstacle {
  constructor() {
    this.x = getX();
    this.width = getWidth();
    this.y = 0;
    this.height = 20;
    this.scored = false;
  }
  update() {
    this.y += 3;
  }
  draw() {
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}

const car = new Car()


document.addEventListener('keydown', (e) => {
  switch (e.code) {
    case 'ArrowLeft':
      car.moveLeft();
      console.log('moved left')
      break;
    case 'ArrowRight':
      car.moveRight();
      console.log('moved right')
      break;
  }
})

function drawRoad() {
  ctx.drawImage(roadImg, 100, 0, 400, 650);
}

function getX() {
  return Math.floor(Math.random() * (300 - 150 + 1)) + 150;
}

function getWidth() {
  return Math.floor(Math.random() * 120) + 100;
}

function addObstacle() {
  obstacles.push(new Obstacle())
}
function updateObstacle() {
  for (const obstacle of obstacles) {
    obstacle.update()
    obstacle.draw()
  }
}
function deleteObstacle() {
  for (const obstacle of obstacles) {
    if (obstacle.y > 650) {
      obstacles.splice(obstacles.indexOf(obstacle), 1)
    }
  }
}

function checkCollision(rect1, rect2) {
  return (
    rect1.x + rect1.width > rect2.x &&
    rect1.x < rect2.x + rect2.width &&
    rect1.y + rect1.height > rect2.y &&
    rect1.y < rect2.y + rect2.height
  )
}

function carHitObstacle() {
  for (const obstacle of obstacles) {
    if (checkCollision(obstacle, car)) {
      isGameOver = true;
    }
  }
}

function updateScore() {
  for (const obstacle of obstacles) {
    if (!obstacle.scored && obstacle.y > car.y + car.height) {
      score += 1;
      obstacle.scored = true;
    }
  }
}

function displayScore() {
  updateScore()
  ctx.font = "20px Arial";
  ctx.strokeStyle = "white";
  ctx.strokeText(`Score: ${score}`, 270, 600);
}

function updateCanvas() {
  if (isGameOver) return;
  ctx.clearRect(0, 0, 500, 700)
  drawRoad()
  car.draw()
  updateObstacle()
  deleteObstacle()
  carHitObstacle()
  displayScore()
  requestAnimationFrame(updateCanvas)
}

function startGame() {
  setInterval(addObstacle, 2000)
  updateCanvas()
}


window.addEventListener('load', () => {
  let startBtn = document.querySelector('#start-button')

  startBtn.addEventListener('click', () => {
    startGame();
  })
})