let breakIncrementButton = document.getElementById("break-increment");
let breakDecrementButton = document.getElementById("break-decrement");
let sessionIncrementButton = document.getElementById("session-increment");
let sessionDecrementButton = document.getElementById("session-decrement");
let startStopButton = document.getElementById("start_stop");
let resetButton = document.getElementById("reset");
let beepSound = document.getElementById("beep");
let breakLengthElement = document.getElementById("break-length");
let sessionLengthElement = document.getElementById("session-length");
let timeLeftElement = document.getElementById("time-left");
let timerLabelElement = document.getElementById("timer-label");

let breakLength = 5;
let sessionLength = 25;
let isSession = true;
let isRunning = false;
let timeRemaining;
let timerInterval;

function updateBreakLength(value) {
  if (!isRunning) {
    breakLength += value;
    if (breakLength < 1) {
      breakLength = 1;
    } else if (breakLength > 60) {
      breakLength = 60;
    }
    breakLengthElement.textContent = breakLength;
  }
}

function updateSessionLength(value) {
  if (!isRunning) {
    sessionLength += value;
    if (sessionLength < 1) {
      sessionLength = 1;
    } else if (sessionLength > 60) {
      sessionLength = 60;
    }
    sessionLengthElement.textContent = sessionLength;
    timeRemaining = sessionLength * 60;
    updateTimerDisplay();
  }
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const displayTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  timeLeftElement.textContent = displayTime;
}

function toggleTimer() {
  isRunning = !isRunning;
  if (isRunning) {
    startStopButton.textContent = "Stop";
    timerInterval = setInterval(decrementTimer, 1000);
  } else {
    startStopButton.textContent = "Start";
    clearInterval(timerInterval);
  }
}

function decrementTimer() {
  if (timeRemaining > 0) {
    timeRemaining--;
    updateTimerDisplay();
  } else {
    beepSound.play();
    if (isSession) {
      isSession = false;
      timerLabelElement.textContent = "Break";
      timeRemaining = breakLength * 60;
      updateTimerDisplay();
    } else {
      isSession = true;
      timerLabelElement.textContent = "Session";
      timeRemaining = sessionLength * 60;
      updateTimerDisplay();
    }
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  breakLength = 5;
  sessionLength = 25;
  isSession = true;
  isRunning = false;
  timeRemaining = sessionLength * 60;
  breakLengthElement.textContent = breakLength;
  sessionLengthElement.textContent = sessionLength;
  timerLabelElement.textContent = "Session";
  updateTimerDisplay();
  startStopButton.textContent = "Start";
  beepSound.pause();
  beepSound.currentTime = 0;
}

breakDecrementButton.addEventListener("click", () => updateBreakLength(-1));
breakIncrementButton.addEventListener("click", () => updateBreakLength(1));
sessionIncrementButton.addEventListener("click", () => updateSessionLength(1));
sessionDecrementButton.addEventListener("click", () => updateSessionLength(-1));
startStopButton.addEventListener("click", toggleTimer);
resetButton.addEventListener("click", resetTimer);
