let selectCountry = document.querySelector('#country');

fetch('https://restcountries.eu/rest/v2/all')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.forEach(element => {
        let newOption = new Option(element.alpha2Code, element.alpha2Code);
        selectCountry.append(newOption);
    });
  });

if(localStorage.getItem('user-name')) {
  document.querySelector('#name').value = localStorage.getItem('user-name');
}

function register() {
    let name = document.querySelector('#name').value;
    let country = document.querySelector('#country').value;
    let file = document.querySelector('#file').value;

    if(name == '' || country == '') {
        alert('Name and Country is required fields')
        return 0;
    }

    localStorage.setItem('user-name', name);
    localStorage.setItem('user-region', country);

    startGame();
}

function startGame() {
  let welcomeScreen = document.querySelector('#first-screen');
  let gameScreen = document.querySelector('#game-screen');
  let loaderScreen = document.querySelector('#loader');

  let palyer = document.querySelector('.footer-player');

  welcomeScreen.style.display = 'none';
  loaderScreen.style.display = 'flex';

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://bd8cwk.comp.skill17.com/api/start-game", true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.send(JSON.stringify({
    username: localStorage.getItem('user-name'),
    country_code: localStorage.getItem('user-region')
  }));

  setTimeout(() => {
    loaderScreen.style.display = 'none';
    gameScreen.style.display = 'flex';
    timeCount();
    health();
  }, 2500)

  localStorage.setItem('health', 3);
  palyer.innerHTML = localStorage.getItem('user-name');
}

function throwBall(mySpeed, myAngle) {
  const BOUNCE_SPEED_RATIO = 0.9;
  const BOUNCE_ANGLE_RATIO = 0.85;
  const PERCENTAGE_TO_SPEED_RATIO = 5;
  const COORDINATES_TO_DISPLAY_RATIO = 10;
  const PROJECTILE_STOP_SPEED_THRESHOLD = 75;

  const projectileCoordinates = (tick, speed, initialAngle) => ({
    x: speed * tick * Math.cos(initialAngle),
    y: speed * tick * Math.sin(initialAngle) - 0.5 * 9.81 * (tick * tick),
    speed
  });

  const debugmode = true;

  const $containerScene = document.querySelector("#scene");
  const ball = document.createElement("div");
  ball.classList.add("ball");
  $containerScene.appendChild(ball);

  const drawCurve = (color, initialSpeed, initialAngle) => {
  let bounces = [];
  let currentFlightTick = 0;

  let projectileMoving = true;

  function step() {
  const lastBounce =
  bounces.length >= 1 ? bounces[bounces.length - 1] : null;
  const lastInitialSpeed = lastBounce ? lastBounce.speed : initialSpeed;
  const lastInitialAngle = lastBounce ? lastBounce.angle : initialAngle;
  const lastHorizontalPosition = lastBounce ? lastBounce.x : 0;

  const coordinates = projectileCoordinates(
  currentFlightTick,
  lastInitialSpeed,
  lastInitialAngle
  );

  const x = coordinates.x + lastHorizontalPosition;
  const y = lastBounce ? coordinates.y : coordinates.y + 500;
  if (y < 0) {
  bounces.push({
  x,
  speed: lastInitialSpeed * BOUNCE_SPEED_RATIO,
  angle: lastInitialAngle * BOUNCE_ANGLE_RATIO
  });
  currentFlightTick = 0;
  }
  else {
  drawPlot(x, y, color);
    currentFlightTick+=0.1;
  }
  if (lastInitialSpeed < PROJECTILE_STOP_SPEED_THRESHOLD)
  projectileMoving = false;
  if (projectileMoving) {
  window.requestAnimationFrame(step);
  }
  }
  window.requestAnimationFrame(step);
  };


  const drawPlot = (x, y, color) => {
    if (debugmode) {
      const $plot = document.createElement("div");
      $plot.classList.add("dot");
      $plot.style.left = x / COORDINATES_TO_DISPLAY_RATIO + "px"; // adjust the ratio to get less space between two points on display
      $plot.style.top = 680 - y / COORDINATES_TO_DISPLAY_RATIO + "px";
      $plot.style.backgroundColor = color || "#F00";
      $containerScene.appendChild($plot);
    }

    ball.style.left = x / COORDINATES_TO_DISPLAY_RATIO + "px";
    ball.style.top = 680 - y / COORDINATES_TO_DISPLAY_RATIO + "px";
  };

  const degreesToRadians = (deg) => (deg * Math.PI) / 180;

  const powerPercentageToInitialSpeed = (percentage) =>
  Math.min(Math.max(percentage, 0), 100) * PERCENTAGE_TO_SPEED_RATIO;

  document.addEventListener("click", () => {
      if(myAngle >= 5 && localStorage.getItem('health') >= 0) {
        drawCurve(
          "#F00",
          powerPercentageToInitialSpeed(mySpeed),
          degreesToRadians(myAngle)
        );
        health();
      } else {
        loseResult();
      }
  });
}

function timeCount() {
    const mins = document.getElementById('mins');
    const secs = document.getElementById('secs');
    let S = '00', M = '00', H = '00';

    setInterval(function(){
        S = +S +1;
        if( S < 10 ) { S = '0' + S; }
        if( S == 60 ) {
          S = '00';
          M = +M + 1;
          if( M < 10 ) { M = '0' + M; }
          if( M == 60 ) {
            M = '00';
            H = +H + 1;
            if( H < 10 ) { H = '0' + H; }
          }
        }
        secs.innerText = S;
        mins.innerText = M;
    },1000);
}

let scene = document.querySelector('.game-box');
scene.addEventListener('click', coordsCursor, 'false');

function coordsCursor(event) {
  let scene = document.querySelector('#scene');

  if(event.clientX && event.clientY) {
    let cursorX = event.clientX - 93;
    let cursorY = event.clientY - 107;

    let heightScene = 640 - cursorY;
    let angle = Math.round(Math.atan(heightScene/cursorX) * 180/Math.PI);

    throwBall(60, angle);
  }
}

function loseResult() {
  let welcomeScreen = document.querySelector('#first-screen');
  let gameScreen = document.querySelector('#game-screen');
  let overScreen = document.querySelector('#over-screen');
  let loaderScreen = document.querySelector('#loader');

  const hour = document.getElementById('hour');
  const mins = document.getElementById('mins');
  const secs = document.getElementById('secs');

  welcomeScreen.style.display = 'none';
  gameScreen.style.display = 'none';
  overScreen.style.display = 'flex';

}

function health() {
  let healthBox = document.querySelector('.health');
  let count = localStorage.getItem('health');

  healthBox.innerHTML = ``;
  
  for(let i = 0; i <= count - 1; i++) {
    let block = document.createElement('div');
    block.className = 'heal';
    healthBox.appendChild(block);
  }
  
  count--;
  localStorage.setItem('health', count);
}

function newGame() {
  location.reload();
}
