const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// LOAD ROAD IMAGE
const roadImg = new Image();
roadImg.src = "./images/road.png"; // <-- CORRECTED PATH

// DRAW ROAD
function drawRoad() {
  ctx.drawImage(roadImg, 0, 0, canvas.width, canvas.height); // <-- FIXED
}

// START GAME
function startGame() {
  drawRoad();
  drawCar();
}

// START BUTTON
window.addEventListener('load', () => {
  const startBtn = document.getElementById('start-button');
  startBtn.addEventListener('click', startGame);
});

// CREATE THE CAR
const carImg = new Image();
carImg.src = "./images/car.png"; // make sure the name matches exactly

// Car position and size
const car = {
  x: 225,      // start in the middle of the road
  y: 550,      // near the bottom
  width: 50,
  height: 100
};

// Draw the car on the canvas
function drawCar() {
  ctx.drawImage(carImg, car.x, car.y, car.width, car.height);
}
