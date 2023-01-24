// Opisany w dokumentacji
import flatpickr from 'flatpickr';
// Dodatkowy import stylów
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const buttonStart = document.querySelector('[data-start]');
buttonStart.disabled = true;

const inputPickerDate = document.querySelector('#datetime-picker');

const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

let userDate;
const actualDate = new Date(); //zmienna z aktualna data

let options = {
  enableTime: true, //pokazuje czas do wyboru
  time_24hr: true, //pokazuje czas w trybie 24h
  defaultDate: new Date(), //domyslna, obecna data pokazywana w inpucie
  minuteIncrement: 1, // wybor czasu z dokladnoscia do 1 minuty (default jest na 5)
  onClose(selectedDates) {
    //wybieramy date po zamknieciu kalendarza
    if (selectedDates[0] < actualDate) {
      // jesli wybrana data przez uzytkownika jest z przeszlosci w porownaniu z aktualna data
      buttonStart.disabled = true; //to przycisk jest nieaktywny
      Notiflix.Notify.warning('Please choose a date in the future'); //i wyswietla sie ostrzezenie, aby wybrac date z przyszlosci
    } else if (selectedDates[0] > actualDate) {
      //chyba, ze wybrana data jest z przyszlosci
      buttonStart.disabled = false; //to przycisk staje sie aktywny
      Notiflix.Notify.success('OK'); //i wyswietla sie komunikat o powodzeniu
      userDate = selectedDates[0].getTime(); //i pobieramy wybrana przez uzytkownika date i lokujemy ja w zmiennej userDate
    }
  },
};

const counterTime = () => {
  //odpalamy licznik czasu
  buttonStart.disabled = true; //przycisk jest nieaktywny bo juz mamy liczony czas
  const counter = setInterval(() => {
    //wykonuje funkcje co 1s
    let gapTime = userDate - new Date().getTime(); //zmienna w ktorej jest roznica czasu miedzy wybranym czasem uzytkownika, a czasem aktualnym
    let gapTimeMs = convertMs(gapTime); //zamiana tej roznicy na ms
    if (gapTime <= 0) {
      //jesli roznica jest mniejsza lub rowna zero
      clearInterval(counter); //to konczymy wykonywanie funkcji/odliczanie czasu
    } else {
      time(gapTimeMs); //w przeciwnym razie nadal liczymy czas
    }
  }, 1000);
};

const datePicker = flatpickr(inputPickerDate, options); //kalendarz
buttonStart.addEventListener('click', counterTime); //na klik start rozpoczyna sie odliczanie czasu

const time = gapTimeMs => {
  days.textContent = gapTimeMs.days;
  hours.textContent = gapTimeMs.hours;
  minutes.textContent = gapTimeMs.minutes;
  seconds.textContent = gapTimeMs.seconds;
};

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
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0'); //padStart  - pierwszy parametr - dlugosc stringa - 2 miejsca, a drugi okresla jakim tekstem beda wypelniane brakujace znaki. jak nie podamy drugiego parametru to bedzie spacja.
}
