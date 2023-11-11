function startGame() {
  // create road
  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d");
  const roadImage = document.createElement("img");
  roadImage.src = "./images/road.png";
  // roadImage.setAttribute("id", "road");
  const carImage = document.createElement("img");
  // carImage.id = "car";
  carImage.src = "./images/car.png";
  const car = {
    x: 225,
    y: 600,
    width: 50,
    height: 100,
    speed: 10,
  };
  const road = {
    x: 0,
    y: 0,
    width: 500,
    height: 700,
  };
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(roadImage, road.x, road.y, road.width, road.height);
  ctx.drawImage(carImage, car.x, car.y, car.width, car.height);
  requestAnimationFrame(ctx);
}

window.addEventListener("load", () => {
  let startBtn = document.querySelector("#start-button");

  startBtn.addEventListener("click", () => {
    startGame();
  });

  // I din't know why it doesn't work, But try it out!
  // document.addEventListener("keydown", (event) => {
  //   if (event.key === "ArrowLeft") {
  //     car.x -= car.speed;
  //   } else if (event.key === "ArrowRight") {
  //     car.x += car.speed;
  //   }
  // });
});
