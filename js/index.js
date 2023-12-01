function startGame() {
  let game = new game();
  game.start();
}

// //create a canvas road
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let road = new Image();
road.src = './images/road.png';
road.onload = () => {
  ctx.drawImage(road, 0, 0, 500, 700);
}

    // Iteration 2: Create the car
    let car = new Image();
    car.src = './images/car.png';
    car.onload = () => {
      ctx.drawImage(car, 225, 600, 50, 100);
    }

    // Iteration 3: Make the car move right and left
    document.addEventListener('keydown', (event) => {
      switch (event.keyCode) {
        case 37:
          car.moveLeft();
          console.log('left', car);
          break;
        case 39:
          car.moveRight();
          console.log('right', car);
          break;
      }
    });

    // Iteration 5: Move the obstacles 
    function Car(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;

      this.moveLeft = function() {
        if (this.x > 0) { // check for left boundary
          this.x -= 10; // change this value to make car move faster or slower
        }
      }
    
      this.moveRight = function() {
        if (this.x < canvas.width - this.width) { // check for right boundary
          this.x += 10; // change this value to make car move faster or slower
        }
      }
    }

    document.addEventListener('keydown', (event) => {
      switch (event.keyCode) {
        case 37: // left arrow key
          car.moveLeft();
          break;
        case 39: // right arrow key
          car.moveRight();
          break;
      }
    });

window.addEventListener('load', () =>{
  let startBtn = document.querySelector('#start-button')

  startBtn.addEventListener('click', (startGame) => {
    function startGame(){
      let canvas = document.getElementById('canvas');
      let ctx = canvas.getContext('2d');

      let road = new Image();
      road.src = './images/road.png';
      road.onload = () => {
        ctx.drawImage(road, 0, 0, 500, 700);
      }
    }
  })
})