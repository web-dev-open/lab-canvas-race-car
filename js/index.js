function startGame() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const roadImage = new Image();
  roadImage.src = './images/road.png';

  const carImage = new Image();
  carImage.src = './images/car.png';

  let score = 0;
  const car = { width: 50, height: 100, x: 225, y: 600, speed: 5 };
  const obstacles = [];
  let lastObstacleLine = -1;
  let lastObstacleTime = 0;

  roadImage.onload = () => {
    ctx.drawImage(roadImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(carImage, car.x, car.y, car.width, car.height);
  };

  window.addEventListener('keydown', ({ key }) => {
    if (key === 'ArrowLeft') car.x -= car.speed;
    else if (key === 'ArrowRight') car.x += car.speed;
    car.x = Math.max(0, Math.min(canvas.width - car.width, car.x));
  });

  function updateGameArea() {
    ctx.drawImage(roadImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(carImage, car.x, car.y, car.width, car.height);

    obstacles.forEach((obstacle, i) => {
      obstacle.y += 2;
      ctx.fillStyle = 'red';
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

      if (obstacle.y > canvas.height) {
        obstacles.splice(i, 1);
        i--;
      }

      if (isCollision(car, obstacle)) {
        clearInterval(interval);
        alert(`Game Over! Your score: ${score}`);
        return;
      }
    });

    if (Math.random() < 0.02 && Date.now() - lastObstacleTime > 1500) {
      const obstacleX = getRandomXPosition(canvas.width, car.width);
      const obstacleWidth = getRandomObstacleWidth();
      const obstacleLine = Math.floor(obstacleX / 40);
      if (obstacleLine !== lastObstacleLine) {
        obstacles.push({ x: obstacleX, y: 0, width: obstacleWidth, height: 40 });
        lastObstacleLine = obstacleLine;
        lastObstacleTime = Date.now();
      }
    }

    score++;
    drawText(`Score: ${score}`, 20, 40);
  }

  function getRandomXPosition(canvasWidth, carWidth) {
    const maxX = canvasWidth - carWidth;
    return Math.floor(Math.random() * (maxX + 1));
  }

  function getRandomObstacleWidth() {
    return Math.floor(Math.random() * (200 - 100 + 1)) + 100;
  }

  function isCollision(obj1, obj2) {
    return (
      obj1.x < obj2.x + obj2.width &&
      obj1.x + obj1.width > obj2.x &&
      obj1.y < obj2.y + obj2.height &&
      obj1.y + obj1.height > obj2.y
    );
  }

  function drawText(text, x, y) {
    ctx.font = '20px Verdana';
    ctx.fillStyle = 'white';
    ctx.fillText(text, x, y);
  }

  const interval = setInterval(updateGameArea, 20);
}

window.addEventListener('load', () => {
  const startBtn = document.querySelector('#start-button');
  startBtn.addEventListener('click', startGame);
});