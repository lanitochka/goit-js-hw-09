const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let intervalId = null;

startBtn.addEventListener('click', onClick);
stopBtn.addEventListener('click', onStop);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onClick() {

    intervalId = setInterval(() => {
       document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);

    startBtn.setAttribute('disabled', true);    
}

function onStop() {

    clearInterval(intervalId);
    startBtn.removeAttribute('disabled');
}