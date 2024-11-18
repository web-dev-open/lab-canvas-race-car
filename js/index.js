let cnv = document.getElementById('canvas')
const ctx = cnv.getContext('2d');
let carX;
let carY = 570;
let animationId = null;
let interval;
let point;
let obstacles;
let speed;

function startGame() {
  interval = setInterval(createBarrier, 1890)
  document.addEventListener('keydown', (event) => {
    if (event.key == 'ArrowLeft') {
      carX -= 15
    }
    if (event.key == 'ArrowRight') {
      carX += 15
    }
  })
  updatecanvas();
}
function updatecanvas() {
  clearCanvas()
  if (drawCanvas())
    animationId = requestAnimationFrame(updatecanvas)
}
function clearCanvas() {
  ctx.clearRect(0, 0, 500, 700)
}
function drawCanvas() {
  const road = new Image();
  road.src = 'images/road.png';
  ctx.drawImage(road, 0, 0, 500, 700);
  const car = new Image();
  car.src = 'images/car.png'
  ctx.drawImage(car, carX, carY, 80, 130)
  if (carX < 30 || carX > 390) {
    gameOver();
    return false;
  }
  for (let i = 0; i < obstacles.length; i++) {
    let obs = obstacles[i]
    let x = obs[0]
    let y = obs[1]
    let len = obs[2]
    ctx.fillStyle = '#870007';
    ctx.fillRect(x, y, len, 30)
    y += speed;
    let carEx = carX + 80
    let barrierEx = x + len
    if (((carX > x && carX < barrierEx) || (carEx > x && carEx < barrierEx)) && (y > carY)) {
      gameOver();
      return false;
    }
    if (y > 700) {
      obstacles.splice(i, 1)
      point += 1
    }
    else
      obstacles[i][1] = y

  }
  return true;
}

function createBarrier() {
  let len = 140 + parseInt(Math.random() * 110)
  let x = 64
  if (len > 220) {
    if (Math.random() < 0.5)
      x = 374 - len
  }
  else
    x = 70 + parseInt(Math.random() * 150);
  let y = 0;
  obstacles.push([x, y, len])
}
function gameOver() {
  cancelAnimationFrame(animationId)
  clearInterval(interval)
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 500, 200)
  ctx.font = '40px monospace'
  ctx.fillStyle = 'red'
  ctx.fillText('Game Over', 140, 80)
  ctx.font = '36px monospace'
  ctx.fillStyle = 'white'
  ctx.fillText(`Score: ${point}`, 180, 130);
  document.removeEventListener('keydown')
}

window.addEventListener('load', () =>{
  let startBtn = document.querySelector('#start-button')

  startBtn.addEventListener('click', () => {
    carX = 210;
    speed = 3
    point = 0;
    obstacles = []
    startGame();
  })
})