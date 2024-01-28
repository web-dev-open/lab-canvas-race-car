// js/index.js

function startGame() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const roadImage = new Image();
    roadImage.src ="images\road.png";

    roadImage.onload = function () {
        canvas.width = roadImage.width;
        canvas.height = roadImage.height;

        ctx.drawImage(roadImage, 0, 0);

        const car = {
            x: canvas.width / 2 - 30,
            y: canvas.height - 80,
            width: 60,
            height: 40,
            speed: 5,
        };

        function moveCar(direction) {
            if (direction === 'left' && car.x > 0) {
                car.x -= car.speed;
            } else if (direction === 'right' && car.x + car.width < canvas.width) {
                car.x += car.speed;
            }
        }

        function drawCar() {
            ctx.fillStyle = 'blue';
            ctx.fillRect(car.x, car.y, car.width, car.height);
        }

        function clearCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        function gameLoop() {
            clearCanvas();
            drawCar();
            requestAnimationFrame(gameLoop);
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                moveCar('left');
            } else if (e.key === 'ArrowRight') {
                moveCar('right');
            }
        });

        gameLoop();
    };
}

window.addEventListener('load', () => {
    let startBtn = document.querySelector('#start-button');

    startBtn.addEventListener('click', () => {
        startGame();
    });
});
