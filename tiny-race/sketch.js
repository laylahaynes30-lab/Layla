let racerXs = [50, 30, 30];
let startY = 70;
let yStep = 40;
let finishX = 560;

function setup() {
  createCanvas(600, startY + yStep * racerXs.length);
}

function draw() {
  background(240);
  line(finishX, 0, finishX, height);
  for (let i = 0; i < racerXs.length; i++) {
    let y = startY + yStep * i;
    if (racerXs[i] < finishX) {
      racerXs[i] += random(1, 3);
    }
    circle(racerXs[i], y, 24);
  }
  fillrandomXs[i] -= random(1,3);
  circle(racersXs[i], y, 24);
  fill(#A6eC8A);
    }