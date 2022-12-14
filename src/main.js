const hoursEl = document.querySelector("#hours");
const minutesEl = document.querySelector("#minutes");
const secondsEl = document.querySelector("#seconds");
const btnStart = document.querySelector(".btn-start-resume");
const btnPause = document.querySelector(".btn-pause");
const btnStop = document.querySelector(".btn-stop");
const alarm = document.querySelector("#alarm");
let interval;
let pause = false;
let totalSeconds = 0;
let totalSecondsBackup = 0;

init();

function init() {
  btnPause.style.display = "none";
  btnStop.style.display = "none";

  const handleStart = () => {
    const hours = parseInt(hoursEl.value);
    const minutes = parseInt(minutesEl.value);
    const seconds = parseInt(secondsEl.value);

    totalSecondsBackup = totalSeconds =
      hours * 60 * 60 + minutes * 60 + seconds;
    if (totalSeconds < 0) {
      return;
    }

    startTimer();

    btnPause.style.display = "inline-block";
    btnStop.style.display = "inline-block";
    btnStart.style.display = "none";
  };
  const handlePause = () => {
    pause = !pause;
    if (pause) {
      btnPause.innerText = "Resume";
    } else {
      btnPause.innerText = "Pause";
    }
  };
  const handleStop = () => {
    stopTimer();
    totalSeconds = totalSecondsBackup;
    pause = false;
    updateInputs();

    btnPause.style.display = "none";
    btnStop.style.display = "none";
    btnStart.style.display = "";
  };

  btnStart.addEventListener("click", handleStart);

  btnPause.addEventListener("click", handlePause);

  btnStop.addEventListener("click", handleStop);
}

function startTimer() {
  interval = setInterval(() => {
    if (pause) return;
    totalSeconds--;
    updateInputs();

    if (totalSeconds <= 0) {
      alarm.play();
      stopTimer();
    }
  }, 1000);
}

function stopTimer() {
  interval = clearInterval(interval);
}

function updateInputs() {
  const hours = Math.floor(totalSeconds / 60 / 60);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  hoursEl.value = hours;
  minutesEl.value = minutes;
  secondsEl.value = seconds;
}
