import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({
  position: 'right-top',
  fontSize: '18px',
  cssAnimationStyle: 'from-right',
  width: '350px',
  cssAnimationDuration: 600,
});

const form = document.querySelector('.form');
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function validateInputs(delay, step, amount) {
  if (delay < 0) {
    Notify.failure('Delay should not be less than 0');
    return false;
  }

  if (step < 0) {
    Notify.failure('Step should not be less than 0');
    return false;
  }

  if (amount <= 0) {
    Notify.failure('Amount should be greater than 0');
    return false;
  }

  return true;
}

function getPromise(e) {
  e.preventDefault();
  let delay = parseInt(e.target.elements.delay.value);
  let step = parseInt(e.target.elements.step.value);
  const amount = parseInt(e.target.elements.amount.value);

  if (validateInputs(delay, step, amount)) {
    for (let i = 0; i < amount; i += 1) {
      createPromise(i + 1, delay)
        .then(({ position, delay }) => {
          Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
          console.log(`Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          console.log(`Reject promise ${position} in ${delay}ms`);
          Notify.failure(`Rejected promise ${position} in ${delay}ms`);
        });
      delay += step;
    }
  }
}

form.addEventListener('submit', getPromise);
