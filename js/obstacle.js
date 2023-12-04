class Obstacle {
    constructor() {
      this.width = Math.floor(Math.random() * 200) + 50; // Random width between 50 and 250
      this.height = 25;
      this.x = Math.floor(Math.random() * (500 - this.width)); // Random x within road bounds
      this.y = 0;
      this.speed = 5;
    }
  
    draw() {
      ctx.fillStyle = "red";
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  
    moveDown() {
      this.y += this.speed;
    }
  }