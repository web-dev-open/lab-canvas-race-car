function startGame() {           //access the canvas from dom
 const canvas=document.getElementById('canvas');
 const ctx=canvas.getContext('2d');

// iteration 1: draw hte game board
let roadImg=new Image();
roadImg.src='./images/road.png';
roadImg.onload = () =>{
  ctx.drawImage(roadImg,0,0,canvas.width,canvas.height);
  updateGame();
};


// iteration 2:  draw the car
let carImg=new Image();
carImg.src='./images/car.png';
const car={x:canvas.width/2-25, y:canvas.height-100,  width: 50, height:100};
carImg.onload=() =>{
  ctx.drawImage(carImg, car.x, car.y, car.width, car.height);
};

// iteration 3: making the car move right and left
document.addEventListener('keydown',(e)=>{
  switch(e.key){
    case 'ArrowLeft':
      if(car.x>0) car.x -=10;
      break;
    case 'ArrowRight':
      if(car.x< canvas.width-car.width) car.x+=10;
      break;
  }
  updateGame();
});


//iteration 4: creating obstacles
function createObstacle(){
  const x=Math.random() * (canvas.width-50);
  obstacles.push({x,y:0,width:50,height:100});
} setInterval(createObstacle,2000);

// iteration 5: moving the obstacles
function updateObstacles(){
  obstacles.forEach((obstacle, index) => {
    obstacle.y+=5;
    if (obstacle.y>canvas.height){
      obstacles.splice(index,1);
    }
    
  });
}

function updateGame(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.drawImage(roadImg,0,0,canvas.width,canvas.height);
  ctx.drawImage(carImg,car.x,car.y,car.width,car,height);
  updateObstacles();
  obstacles.forEach(obstacle=>{
    ctx.fillRect(obstacle.x,obstacle.y, obstacle.width,obstacle.height);
  });
  updateScore();
} setInterval(updateGame,50);

// iteration 6: counting the score

let score=0;
function updateScore(){
  score+=1;
  ctx.font='20px Ariel';
  ctx.fillStyle='white';
  ctx.fillText(`Score: ${score}`, 10, 20);
}
window.addEventListener('load', () =>{
  let startBtn = document.querySelector('#start-button')

  startBtn.addEventListener('click', () => {
    startGame();
  })
}) 


