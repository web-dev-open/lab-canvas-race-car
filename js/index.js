function startGame() {
  const gameBoardElement = document.getElementById("game-board");
  gameBoardElement.style.display = "block";

}
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const roadImg = new Image();
roadImg.src = "images/road.png";

const carImg = new Image();
carImg.src = "images/car.png";

let carX = canvas.width / 2 - carImg.width / 2;
const carY = canvas.height - carImg.height;

const obstacleWidth = 50;
const obstacleHeight = 50;
let obstacles = [];
const obstacleSpeed = 5;

let score = 0;

function createObstacle() {
  const obstacleX = Math.random() * (canvas.width - obstacleWidth);
  const obstacleY = 0;

  obstacles.push({ x: obstacleX, y: obstacleY });
}

function moveObstacles() {
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].y += obstacleSpeed;
  }
}

function drawCar() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

   // Draw the road
   ctx.drawImage(roadImg, 0, 0, canvas.width, canvas.height);

   // Draw the car
   ctx.drawImage(carImg, carX, carY);

   // Draw obstacles
   for (let i = 0; i < obstacles.length; i++) {
     ctx.fillRect(
       obstacles[i].x,
       obstacles[i].y,
       obstacleWidth,
       obstacleHeight
     );

     // Check for collision with the car
     if (
       carX < obstacles[i].x + obstacleWidth &&
       carX + carImg.width > obstacles[i].x &&
       carY < obstacles[i].y + obstacleHeight &&
       carY + carImg.height > obstacles[i].y
     ) {
       alert("Game Over");
       document.location.reload();
     }

     // Remove obstacles that go off the screen
     if (obstacles[i].y > canvas.height) {
       obstacles.splice(i, 1);
       i--;
     }
   }

   // Update the score
   ctx.font = "30px Arial";
   ctx.fillStyle = "white";
   ctx.fillText("Score: " + score, 20, 40);
 }

 function updateGameArea() {
   moveObstacles();
   draw();
   requestAnimationFrame(updateGameArea);
 }

 document.addEventListener("keydown", function (event) {
   if (event.key === "ArrowLeft" && carX > 0) {
     carX -= 10;
   } else if (event.key === "ArrowRight" && carX + carImg.width < canvas.width) {
     carX += 10;
   }
 });

 // Start the game loop and obstacle creation
 setInterval(createObstacle, 1000);
 updateGameArea();

 window.addEventListener('load', () =>{
  let startBtn = document.querySelector('#start-game')
window.addEventListener("load", () =>{
  startBtn.addEventListener("click", () =>{
    startGame(),
  })
})
  startBtn.addEventListener('click', () => {
    startGame();
  })
})

