window.onload = function () {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var carX;
  var carY;
  var carWidth = 50;
  var carHeight = 100;
  var obstacles = [];
  var score = 0;

  // Load the car image
  var carImg = new Image();
  carImg.onload = startGame; // Start game after image loads
  carImg.src = './images/car.png';

  document.getElementById("start-button").onclick = function () {
    startGame();
  };

  function startGame() {
    // Draw the road
    var roadImg = new Image();
    roadImg.onload = function () {
      ctx.drawImage(roadImg, 0, 0, canvas.width, canvas.height);

      // Draw the car
      carX = (canvas.width / 2) - (carWidth / 2);
      carY = canvas.height - carHeight - 20;
      drawCar(); // Draw the car initially
    };
    roadImg.src = './images/road.png';

    // Create a new obstacle every 2 seconds
    setInterval(function () {
      var obstacle = new Obstacle();
      obstacles.push(obstacle);
    }, 2000);

    // Increase score every second
    setInterval(function () {
      score++;
      document.getElementById('score').innerText = "Score: " + score;
    }, 1000);

    // Start the animation
    animate();
  }

   // Obstacle constructor
   function Obstacle() {
     this.width = Math.random() * 200 + 50; // Random width between 50 and 250
     this.height = 20;
     this.x = Math.random() * (canvas.width - this.width); // Random x position
     this.y = 0;

     this.draw = function () {
       ctx.fillRect(this.x, this.y, this.width, this.height);
     };

     this.update = function () {
       this.y += 2; // Move the obstacle down
     };
   }

   // Animation loop
   function animate() {
     ctx.clearRect(0, 0, canvas.width, canvas.height);

     for (var i = 0; i < obstacles.length; i++) {
       obstacles[i].draw();
       obstacles[i].update();

       // Check for collision with car
       if (
         carX < obstacles[i].x + obstacles[i].width &&
         carX + carWidth > obstacles[i].x &&
         carY < obstacles[i].y + obstacles[i].height &&
         carY + carHeight > obstacles[i].y
       ) {
         console.log('Game Over!');
         return; // End the game
       }
     }

     drawCar(); // Draw the car at its current position

     requestAnimationFrame(animate); // Call animate again to create a loop
   }

   // Function to draw the car
   function drawCar() {
     ctx.drawImage(carImg, carX, carY, carWidth, carHeight);
   }

   // Listen for keydown events
   document.addEventListener('keydown', function (e) {
     e.preventDefault();
     switch (e.keyCode) {
       case 37: // left arrow
         if (carX > 0) {
           carX -= 10;
         }
         break;
       case 39: // right arrow
         if (carX < canvas.width - carWidth) {
           carX += 10;
         }
         break;
     }
   });
};
