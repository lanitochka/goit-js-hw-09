import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';


const inputDate = document.querySelector('input#datetime-picker');
const startBtn = document.querySelector('button[data-start]');

const refs = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),    
}

startBtn.addEventListener('click', onClick);

let selectedTime = null;
let currentTime = null;

let intervalId = null;
startBtn.disabled = true;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {

    selectedTime = selectedDates[0];
    const currentTime = new Date();

    if (selectedTime < currentTime) {
      Notiflix.Notify.failure("Please choose a date in the future");
      return;
    }
      
    clearInterval(intervalId);
    startBtn.disabled = false;
  },
};


flatpickr(inputDate, options);

function timer() {

  currentTime = Date.now();

  const parseSelectedTime = Date.parse(selectedTime);
  const deltaTime = parseSelectedTime - currentTime;

  if (parseSelectedTime <= currentTime) {
    clearInterval(intervalId);
    return;
  }
  
  convertMs(deltaTime);
}

timer();

function onClick() {

  startBtn.disabled = true; 
  intervalId = setInterval(timer, 1000);
}


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));  
  
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}

convertMs(0);

function addLeadingZero(value) {
    return String(value).padStart(2, '0'); 
}