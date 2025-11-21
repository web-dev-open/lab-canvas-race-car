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
}

// START BUTTON
window.addEventListener('load', () => {
  const startBtn = document.getElementById('start-button');
  startBtn.addEventListener('click', startGame);
});
