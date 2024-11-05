let cnv = document.getElementById('canvas');
const ctx = cnv.getContext('2d');
// let carX;
// let carY = 570;
// let animationId = null;
// let interval;
// let point;
// let obstacles;
// let speed;

function startGame() {

  //Load Road
  const roadImage = new Image();
  roadImage.src = 'images/road.png';

  //Load Car
  const carImage = new Image();
  carImage.src = 'images/car.png';

  const car = {x : 225, y : 600, width : 50, height : 100};

  const obstacles = [];
  let obsInterval = 2000;
  let score = 0;

  function drawRoad() {
    ctx.drawImage(roadImage, 0, 0, canvas.width, canvas.height);
  }

  function drawCar() {
    ctx.drawImage(carImage, car.x, car.y, car.width, car.height);
  }

  function createObstacle() {
    const minWidth = 50;
    const maxWidth = 150;
    const width = Math.floor(Math.random() * (maxWidth - minWidth + 1) + minWidth);
    const x = Math.floor(Math.random() * (canvas.width - width));
    obstacles.push({x:x, y:0, width:width, height:20});
  }

  function moveObstacles() {
    obstacles.forEach(obstacle => {
      obstacle.y += 5; 
    });
  }
  
  function drawObstacles() {
    obstacles.forEach(obstacle => {
      ctx.fillStyle = 'red';
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
  }
  
  function updateScore() {
    score += 1;
    ctx.clearRect(400, 20, 150, 40); 
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 400, 50);
  }
  
  function checkCollision() {
    obstacles.forEach(obstacle => {
      if (
        car.x < obstacle.x + obstacle.width &&
        car.x + car.width > obstacle.x &&
        car.y < obstacle.y + obstacle.height &&
        car.y + car.height > obstacle.y
      ) {
        alert(`Game Over! Your score: ${score}`);
        window.location.reload(); 
      }
    });
  }
  
  function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRoad();
    drawCar();
    moveObstacles();
    drawObstacles();
    updateScore();
    checkCollision();
    requestAnimationFrame(updateGame);
  }

  function start() {
    roadImage.onload = () => {
      carImage.onload = () => {
        updateGame();
      };
    };

    // Obstacles at intervals
    setInterval(() => {
      createObstacle();
    }, obsInterval);

    // Left and Right
    document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft' && car.x > 0) {
        car.x -= 10;
      }
      if (event.key === 'ArrowRight' && car.x < canvas.width - car.width) {
        car.x += 10;
      }
    });
  }

  start();

  // interval = setInterval(createBarrier, 1890);
  // document.addEventListener('keydown', (event) => {
  //   if (event.key == 'ArrowLeft') {
  //     carX -= 30;
  //   }
  //   if (event.key == 'ArrowRight') {
  //     carX += 30;
  //   }
  // })
}


window.addEventListener('load', () =>{
  const startBtn = document.querySelector('#start-button');
    startBtn.addEventListener('click', () => {
      startGame();
    });
  });

  // Start button

  