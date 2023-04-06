let sets = 0;
let minute = 0;

let timer;

let timerSets = [];
let setTrack = [];

let currentSet = 0;

let currentTime = 0;

window.onload = function() {
  document.getElementById("timerDisplay").style.display = "none";
  document.getElementById("stop").style.display = "none";
}

function setTimer() {
  if (
    document.getElementById("sets").value > 0 &&
    document.getElementById("warmup").value > 0 &&
    document.getElementById("highInt").value > 0 &&
    document.getElementById("lowInt").value > 0 &&
    document.getElementById("cooldown").value > 0
  ) {
    sets = document.getElementById("sets").value;

    timerSets.push(document.getElementById("warmup").value);
    setTrack.push("Warmup");
    for (let i = 0; i < sets; i++) {
      timerSets.push(document.getElementById("highInt").value);
      timerSets.push(document.getElementById("lowInt").value);
      setTrack.push("High Intensity");
      setTrack.push("Low Intensity");
    }
    timerSets.pop();
    setTrack.pop();
    timerSets.push(document.getElementById("cooldown").value);
    setTrack.push("Cooldown");

    console.log(timerSets);

    currentTime = timerSets[currentSet];
    document.getElementById("setup").style.display = "none";
    document.getElementById("timerDisplay").style.display = "inline";
  }
}

function timerStart() {
  document.getElementById("start").style.display = "none";
  document.getElementById("stop").style.display = "inline";
  document.getElementById("setTrack").innerHTML = setTrack[currentSet];
  timer = setInterval(function () {
    if (currentTime >= 60) {
      minute = parseInt(currentTime / 60);
      currentTime -= minute * 60;
    }
    if (currentTime < 10) {
      document.getElementById("timer").innerHTML = minute + ":0" + currentTime;
    } else {
      document.getElementById("timer").innerHTML = minute + ":" + currentTime;
    }
    
    if(currentTime > 0){
      currentTime--;
    }

    if (currentTime < 0 && minute < 1) {
      nextSet();
    } else if (currentTime < 0 && minute >= 1) {
      minute--;
      currentTime += 60;
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
  document.getElementById("start").style.display = "inline";
  document.getElementById("stop").style.display = "none";
}

function nextSet() {
  if (currentSet < timerSets.length - 1) {
    minute = 0;
    currentSet++;
    currentTime = timerSets[currentSet];
    document.getElementById("setTrack").innerHTML = setTrack[currentSet];
  } else {
    stopTimer();
  }
}

function resetSet() {
  if (currentSet < timerSets.length - 1 && currentTime > 0) {
    currentTime = timerSets[currentSet];
  } else {
    minute = 0;
    currentSet = 0;
    currentTime = timerSets[currentSet];
    document.getElementById("setTrack").innerHTML = setTrack[currentSet];
  }

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}  
}