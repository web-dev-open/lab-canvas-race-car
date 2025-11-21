const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function startGame() {


}


window.addEventListener('load', () =>{
  let startBtn = document.querySelector('#start-button')

  startBtn.addEventListener('click', () => {
    startGame();
  })
})
