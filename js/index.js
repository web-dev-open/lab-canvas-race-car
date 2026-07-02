const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let car = { x: 225, y: 550, width: 50, height: 100 };
let obstacles = [];
let frames = 0;
let score = 0;
let animationId;

const roadImg = new Image(); roadImg.src = './images/road.png';
const carImg = new Image(); carImg.src = './images/car.png';

function draw() {
    // 1. Clear and Draw Road & Car
    ctx.clearRect(0, 0, 500, 700);
    ctx.drawImage(roadImg, 0, 0, 500, 700);
    ctx.drawImage(carImg, car.x, car.y, car.width, car.height);

    // 2. Obstacle Logic
    frames++;
    if (frames % 100 === 0) {
        let width = Math.random() * (200 - 50) + 50;
        obstacles.push({ x: Math.random() * (450 - width), y: 0, width: width, height: 20 });
    }

    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].y += 3;
        ctx.fillStyle = 'darkred';
        ctx.fillRect(obstacles[i].x, obstacles[i].y, obstacles[i].width, 20);

        // Collision Detection
        if (car.x < obstacles[i].x + obstacles[i].width &&
            car.x + car.width > obstacles[i].x &&
            car.y < obstacles[i].y + 20 &&
            car.y + car.height > obstacles[i].y) {
            
            cancelAnimationFrame(animationId);
            showGameOver();
            return; 
        }

        if (obstacles[i].y > 700) {
            obstacles.splice(i, 1);
            score++;
        }
    }

    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 20, 30);
    animationId = requestAnimationFrame(draw);
}

function showGameOver() {
    // Create overlay dynamically to avoid HTML clutter
    const overlay = document.createElement('div');
    overlay.innerHTML = `
        <div style="position:absolute; top:200px; left:150px; background:black; color:white; padding:20px; text-align:center; border: 2px solid white;">
            <h1>Game Over!</h1>
            <p>Your final score: ${score}</p>
            <button onclick="location.reload()" style="padding:10px; cursor:pointer;">Restart Game</button>
        </div>
    `;
    document.body.appendChild(overlay);
}

function startGame() {
    document.querySelector('.game-intro').style.display = 'none';
    draw();
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && car.x > 30) car.x -= 20;
    if (e.key === 'ArrowRight' && car.x < 420) car.x += 20;
});

window.addEventListener('load', () => {
    document.getElementById('start-button').onclick = startGame;
});