import Notiflix from "notiflix";

const form = document.querySelector('form');
const inputFirstDelay = document.querySelector('input[name="delay"]');
const inputSecondDelay = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');

  
function createPromise(position, delay) { //ktory promise (numer), opoznienie
  return new Promise((resolve, reject) => { //zwroc promise resolve lub reject
    setTimeout(() => { //opoznienie czasowe po jakim sie funkcja wykonuje
      const shouldResolve = Math.random() > 0.3; //Math.random - wiekszy lub rowno 0 ale mniejszy niz 1
      if (shouldResolve) { //jesli wylosuje liczbe <1 i >0.3 to jest resolve
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay }); //w przeciwnym wypadku reject
      }
    }, delay); //wartosc opoznienia z setTimeout
  });
}

form.addEventListener("submit", (event) => { //po kiknieciu w button
  event.preventDefault();
  let delay = parseInt(inputFirstDelay.value); //zmienna let = parsuje tekst na liczbe calkowita
  for (let i = 1; i <= amount.value; i++) { //ilosc promisow, dodawanie po 1
    createPromise(i, delay) //odwolanie do funkcji createPromise, ktory promise i jego opoznienie
      .then(({ position, delay }) => { //then obsluguje w praktyce pomyslne wykonanie promise
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => { //w catch wylapujemy bledy
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += parseInt(inputSecondDelay.value); //opoznienie calkowite = opoznienie+opoznienie kolejnej obietnicy wybranej przez uzytkownika
  }
});
