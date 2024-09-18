function startGame() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  const roadImg = new Image();
  roadImg.src = './images/road.png';
  const carImg = new Image();
  carImg.src = './images/car.png';

  let carX = 225;
  let carY = 600;

  const obstacles = [];
  let gameSpeed = 3;
  let frames = 0;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(roadImg, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(carImg, carX, carY, 50, 100);
  }

  function createObstacle() {
    let randomX = Math.floor(Math.random() * (canvas.width - 50));
    let obstacleWidth = Math.floor(Math.random() * 100) + 50;
    obstacles.push({
      x: randomX,
      y: 0,
      width: obstacleWidth,
      height: 20
    });
  }

  function drawObstacles() {
    obstacles.forEach((obstacle) => {
      ctx.fillStyle = 'red';
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      obstacle.y += gameSpeed;
    });
  }

  function checkCollision() {
    obstacles.forEach((obstacle) => {
      if (
        carX < obstacle.x + obstacle.width &&
        carX + 50 > obstacle.x &&
        carY < obstacle.y + obstacle.height &&
        carY + 100 > obstacle.y
      ) {
        alert('Game Over!');
        location.reload();
      }
    });
  }

  window.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'ArrowLeft':
        if (carX > 0) {
          carX -= 10;
        }
        break;
      case 'ArrowRight':
        if (carX < canvas.width - 50) {
          carX += 10;
        }
        break;
    }
  });

  function updateGame() {
    frames += 1;

    draw();
    drawObstacles();
    checkCollision();

    if (frames % 120 === 0) {
      createObstacle();
    }

    requestAnimationFrame(updateGame);
  }

  updateGame();
}
window.addEventListener('load', () =>{
  let startBtn = document.querySelector('#start-button')

  startBtn.addEventListener('click', () => {
    startGame();
  })
})