class Car {
    constructor() {
      this.x = 225;
      this.y = 500;
      this.width = 50;
      this.height = 100;
      this.speed = 5;
      this.carImg = new Image();
      this.carImg.src = "./images/car.png";
    }
  
    draw() {
      ctx.drawImage(this.carImg, this.x, this.y, this.width, this.height);
    }
  
    moveLeft() {
      if (this.x <= 75) return;
      this.x -= 25;
    }
  
    moveRight() {
      if (this.x >= 375) return;
      this.x += 25;
    }
  }