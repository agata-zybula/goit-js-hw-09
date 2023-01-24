const buttonStart = document.querySelector("[data-start]");
const buttonStop = document.querySelector("[data-stop]");
const bodyColor = document.querySelector("body");

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let timerId = null;

buttonStart.addEventListener('click', () => {
  if (
    (timerId = setInterval(() => {
      bodyColor.style.backgroundColor = getRandomHexColor();
    }, 1000))) {
    buttonStart.disabled = true;
  }
});

buttonStop.addEventListener('click', () => {
  buttonStart.disabled = false;
  clearInterval(timerId)
});