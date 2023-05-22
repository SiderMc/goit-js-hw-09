const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

let intervalId = null;
let toggle = false;
btnStop.disabled = true;

function startChangeColors() {
  toggle = true;
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = generateRandomHexColor();
  }, 1000);
  toggleChangeColors();
}

function stopChangeColors() {
  toggle = false;

  clearInterval(intervalId);
  toggleChangeColors();
}

function toggleChangeColors() {
  if (toggle === true) {
    btnStart.disabled = true;
    btnStop.disabled = false;
  } else {
    btnStart.disabled = false;
    btnStop.disabled = true;
  }
}

btnStart.addEventListener('click', startChangeColors);
btnStop.addEventListener('click', stopChangeColors);

function generateRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}
