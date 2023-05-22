import 'flatpickr/dist/flatpickr.min.css';
import flatpickr from 'flatpickr';
require('flatpickr/dist/themes/dark.css');
import { Notify } from 'notiflix/build/notiflix-notify-aio';

Notify.init({
  position: 'center-top',
  distance: '100px',
  fontSize: '18px',
  timeout: 3000,
  cssAnimationStyle: 'from-top',
  width: '350px',
});

const inputField = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
let dateNumber;
startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  position: 'below center',
  clickOpens: true,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate.getTime() < Date.now()) {
      Notify.failure('Please choose a date in the future');

      inputField._flatpickr.clear();
    } else {
      dateNumber = selectedDate.getTime();
      startButton.disabled = false;
    }
  },
};

flatpickr(inputField, options);

function remainingDate() {
  return dateNumber - Date.now();
}

function updateTimer(days, hours, minutes, seconds) {
  const pages = document.querySelectorAll('.value');
  pages[0].textContent = days.toString().padStart(2, '0');
  pages[1].textContent = hours.toString().padStart(2, '0');
  pages[2].textContent = minutes.toString().padStart(2, '0');
  pages[3].textContent = seconds.toString().padStart(2, '0');
}

function onTick() {
  const remainingTime = remainingDate();
  if (remainingTime <= 0) {
    inputField.disabled = false;
    startButton.disabled = true;
    Notify.success('Timer is finished!');
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(remainingTime);
  updateTimer(days, hours, minutes, seconds);

  setTimeout(onTick, 1000);
}

function startTimer() {
  inputField.disabled = true;
  startButton.disabled = true;
  Notify.success('Timer is started!');
  onTick();
}

startButton.addEventListener('click', startTimer);

function convertMs(milliseconds) {
  const oneSecond = 1000;
  const oneMinute = oneSecond * 60;
  const oneHour = oneMinute * 60;
  const oneDay = oneHour * 24;

  const days = Math.floor(milliseconds / oneDay);
  const hours = Math.floor((milliseconds % oneDay) / oneHour);
  const minutes = Math.floor(((milliseconds % oneDay) % oneHour) / oneMinute);
  const seconds = Math.floor(
    (((milliseconds % oneDay) % oneHour) % oneMinute) / oneSecond
  );

  return { days, hours, minutes, seconds };
}
