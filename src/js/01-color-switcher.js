const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;

startBtn.addEventListener('click', onClick);
stopBtn.addEventListener('click', onStop);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onClick() {

    timerId = setInterval(() => {
       document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);

    startBtn.setAttribute('disabled', true);    
}

function onStop() {

    clearInterval(timerId);
    startBtn.removeAttribute('disabled');
}