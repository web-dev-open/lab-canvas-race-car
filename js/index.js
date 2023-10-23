
function startGame() {

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  
  const CarImg = new Image();
  CarImg.src = './images/car.png';

  const CarImgW = 50;
  const CarImgH = 100;

  const obstacleW = (1+Math.random()*(canvas.width - CarImgW));
  const obstacleH = 40+Math.random(CarImgH);
  const obstacleSpeed = 4;


  let carX = canvas.width / 2 - CarImgW / 2;
  let carY = canvas.height - CarImgH;

  let obstacles = [];
  let score = 0;

  function drawCar() {
   
    ctx.drawImage(CarImg, carX, carY,CarImgW, CarImgH);
  }

  function drawObstacles(x,y) {
  
    ctx.fillStyle = "#a64449";
    ctx.fillRect(x, y, obstacleW, obstacleH);

  }


  function moveCar(e) {

     switch (e.keyCode) {
       case 37: if (carX > 0) {
           carX -= 20;
         }
         break;
       case 39: if (carX < canvas.width - CarImgW) {
           carX += 20;
         }
         break;
     }

  }

  

  function ObstacleCreation() {
    const randomX = Math.random() * (canvas.width - obstacleW);
    obstacles.push({ x: randomX, y: 0 });
  }



  function checkCollisions() {
 
    for (let i = 0; i < obstacles.length; i++) {
      const obstacle = obstacles[i];
      if (
        carX < obstacle.x + obstacleW &&
        carX + carWidth > obstacle.x &&
        carY < obstacle.y + obstacleH &&
        carY + carHeight > obstacle.y
      ) {
        // Collision detected
        clearInterval(obstacleInterval); 
        alert(`Game Over! Your Score: ${score}`);
        return true;
      }
    }
    return false; 
  }



  function updateState() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawCar();

    for (let i = 0; i < obstacles.length; i++) {
      const obstacle = obstacles[i];
       
      drawObstacles(obstacle.x, obstacle.y);
      obstacle.y += obstacleSpeed 

      // Removing obstacles 
      if (obstacle.y > canvas.height) {
        obstacles.splice(i, 1);
        score++;
      }

    }
    if (!checkCollisions()) {
      // the collision did not happen. 
      requestAnimationFrame(updateState);
      cancelAnimationFrame(animationFrameID);
    }
  
  }

  document.addEventListener("keydown", moveCar);
  const obstacleInterval = setInterval(ObstacleCreation, 2000);
  updateState();
  
  
}

window.addEventListener("load", () => {
  let startBtn = document.querySelector("#start-button");

  startBtn.addEventListener("click", () => {
    startGame();
  });
});