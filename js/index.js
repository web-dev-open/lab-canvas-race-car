
function startGame() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const rightBtn = document.querySelector('.bt');
  const leftBtn = document.querySelector('.btn');
  const showScore = document.querySelector('.sc');
  const gameOverMsg = document.querySelector('.gameover'); 
  const carImg = new Image();
  const roadImg = new Image();
  let score = 0;
  const car = {
    x: 216,
    y: 480,
    width: 65,
    height: 132,
    speed: 4
  };

  const obstacles = []; // Array to store obstacle positions

  carImg.onload = () => {
    ctx.drawImage(carImg, 0, 0, canvas.width, canvas.height);
    roadImg.src = './images/car.png'; 
  };
  carImg.src = './images/road.png';

  function moveRight() {
    car.x += 35;
  }

  function moveLeft() {
    car.x -= 35;
  }

  function drawObstacle(x, y) {
    ctx.fillStyle = '#870007';
    ctx.fillRect(x, y, 150, 25);
  }

  function generateObstacle() {
    const randomX = Math.random() * (canvas.width - 150);
    obstacles.push({ x: randomX, y: 0 });
  }

  function checkCollision() {
    const carWidth = 150;  
    const carHeight = 100;
    const obstacleWidth = 150; 
    const obstacleHeight = 25; 
  
    for (let i = 0; i < obstacles.length; i++) {
      const obstacle = obstacles[i];
      if (
        car.x < obstacle.x + obstacleWidth &&
        car.x + carWidth > obstacle.x &&
        car.y < obstacle.y + obstacleHeight &&
        car.y + carHeight > obstacle.y
      ) {
        // Collision detected
        clearInterval(obstacleInterval); 
        gameOverMsg.innerHTML = `<span class="one">Game Over!</span> <br> <span class="two">Your Final Score is</span> <br> <span class="two">${score}</span>`; 
        return true;
      }
    }
    return false; 
  }
  

  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(carImg, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(roadImg, car.x, car.y, car.width, car.height);

    for (let i = 0; i < obstacles.length; i++) {
      const obstacle = obstacles[i];
      obstacle.y += car.speed; // obstacles down
      drawObstacle(obstacle.x, obstacle.y);

      // Removing obstacles 
      if (obstacle.y > canvas.height) {
        obstacles.splice(i, 1);
        score++;
        showScore.innerHTML = `Score: ${score}`;
      }
    }

    if (!checkCollision()) {
      // the game is not over
      requestAnimationFrame(update);
      cancelAnimationFrame(animationFrameID);
    }
  }

  
  rightBtn.addEventListener('click', moveRight);
  leftBtn.addEventListener('click', moveLeft);
  const obstacleInterval = setInterval(generateObstacle, 1900);
  update();
}


window.addEventListener('load', () => {
  let startBtn = document.querySelector('#start-button');
  let showScore = document.querySelector('.sc'); 

  startBtn.addEventListener('click', () => {
    startGame();
    
  });
});