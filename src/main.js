const PI = Math.PI;

const canvas = document.getElementById('earth');
const brightnessView = document.querySelector('#brightness-view > .value');

const WIDTH = 400;
const HEIGHT = 200;
const RADIUS = 800;
const CENTER_X = 0;
const CENTER_Y = RADIUS + HEIGHT / 2;
const PERSON_HEIGHT = 10;

const PERSON_COLOR = '#FF0000';

earth.width = WIDTH;
earth.height = HEIGHT;


const ctx = canvas.getContext('2d');

function drawEarth (ctx) {
  ctx.beginPath();
  ctx.arc(CENTER_X, CENTER_Y, RADIUS, -PI / 2,  0);
  ctx.stroke();
}

let start;

function drawPerson (ctx, degree) {
  const beforeFill = ctx.fillStyle;
  ctx.fillStyle = PERSON_COLOR;

  ctx.beginPath();
  ctx.moveTo(
    CENTER_X + RADIUS * Math.cos(degree), 
    CENTER_Y - RADIUS * Math.sin(degree)
  );
  ctx.lineTo(
    CENTER_X + (RADIUS + PERSON_HEIGHT) * Math.cos(degree), 
    CENTER_Y - (RADIUS + PERSON_HEIGHT) * Math.sin(degree)
  );
  ctx.stroke();

  ctx.fillStyle = beforeFill;
}

function clear (ctx) {
  const beforeFill = ctx.fillStyle;
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  ctx.fillStyle = beforeFill;
}

function brightness(degree) {
  const b = Math.cos(degree);
  return b > 0 ? b : 0;
}

const START_DATETIME = 16 // to 18

function draw (now) {
  if (!start) start = now;
  
  // console.log(now, now - start);
  const datetime = START_DATETIME + (now - start) / (1000 * 6);

  // console.log(datetime, datetime / 24 * (2 * PI))

  const degree = datetime / 24 * (2 * PI) - PI;
  clear(ctx);
  drawEarth(ctx);
  
  drawPerson(ctx, degree);
  brightnessView.innerText = brightness(degree);

  if (datetime < 18) {
    window.requestAnimationFrame(draw);
  }
}


window.requestAnimationFrame(draw);
