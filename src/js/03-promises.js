import Notiflix from 'notiflix';


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({position, delay});
      } else {
        // Reject
        reject({position, delay});
      }
    }, delay);
  });
}

const refs = {
  delay: document.querySelector('input[name=delay]'),
  step: document.querySelector('input[name=step]'),
  amount: document.querySelector('input[name=amount]'),
  submit: document.querySelector('button[type=submit]')
};

refs.submit.addEventListener('click', function (e) {
  e.preventDefault();

  let currDelay;

  for (let i = 1; i <= Number(refs.amount.value); i++) {

    if (i === 1) {
      currDelay = Number(refs.delay.value);
    } else {
      currDelay += Number(refs.step.value);
    }

    createPromise(i, currDelay)
      .then(({position, delay}) => {
        // console.log({position, delay});
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({position, delay}) => {
        // console.log({position, delay});
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});