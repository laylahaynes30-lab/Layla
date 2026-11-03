let player;
let ball;
let goalie;

let score = 0;
let saves = 0;
let message = "Get ready to score!";

let goalTop = 175;
let goalBottom = 325;

function setup() {
  createCanvas(800, 500);

  player = {
    x: 150,
    y: 250,
    size: 30,
    speed: 7
   }; 

  ball = {
    x: 190,
    y: 250,
    r: 10,
    vx: 0,
    vy: 0
  };

  goalie = {
    x: 700,
    y: 250,
    speed: 1, 
    size: 45
  };
}

function draw() {
  drawField();
  moveGoalie();
  movePlayer();
  moveBall();
  checkGoal();
  checkGoalie();
  drawPlayer();
  drawBall();
  drawGoalie();
  drawScoreboard();
}

function drawField() {
  background(40, 145, 65);

  noStroke();

  for (let i = 0; i < 8; i++) {
    if (i % 2 === 0) {
      fill(35, 135, 60);
    } else {
      fill(45, 155, 70);
    }

    rect(i * 100, 0, 100, height);
  }
  stroke(255);
  strokeWeight(3);
  noFill();

  rect(15, 15, 770, 470);

  line(400, 15, 400, 485);

  ellipse(400, 250, 110, 110);

  fill(255);
  noStroke();
  circle(400, 250, 7);

  noFill();
  stroke(255);
  strokeWeight(3);
  rect(590, 145, 195, 210);

  fill(235);
  rect(775, goalTop, 20, goalBottom - goalTop);

  stroke(255);
  strokeWeight(2);
  noFill();
  rect(775, goalTop, 20, goalBottom - goalTop);

  // Goal net
  stroke(180);
  strokeWeight(1);

  for (let y = goalTop + 10; y < goalBottom; y += 15) {
    line(775, y, 795, y);
  }

  for (let x = 780; x < 795; x += 10) {
    line(x, goalTop, x, goalBottom);
  }
}

function movePlayer() {
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    player.x -= player.speed;
  }

  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    player.x += player.speed;
  }

  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    player.y -= player.speed;
  }

  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    player.y += player.speed;
  }

  player.x = constrain(player.x, 30, 760);
  player.y = constrain(player.y, 35, 465);
}

function moveGoalie() {
  if (ball.y > goalie.y) {
    goalie.y += goalie.speed;
  } else if (ball.y < goalie.y) {
    goalie.y -= goalie.speed;
  }

  goalie.y = constrain(
    goalie.y,
    goalTop + goalie.size / 2,
    goalBottom - goalie.size / 2
  );
}

function moveBall() {
  ball.x += ball.vx;
  ball.y += ball.vy;

  ball.vx *= 0.985;
  ball.vy *= 0.985;

  if (abs(ball.vx) < 0.05) ball.vx = 0;
  if (abs(ball.vy) < 0.05) ball.vy = 0;

  if (ball.y < 25 || ball.y > 475) {
    ball.vy *= -0.8;
    ball.y = constrain(ball.y, 25, 475);
  }

  if (ball.x < 25) {
    ball.x = 25;
    ball.vx *= -0.8;
  }

  if (ball.x > 770 && ball.y < goalTop) {
    ball.x = 770;
    ball.vx *= -0.8;
  }

  if (ball.x > 770 && ball.y > goalBottom) {
    ball.x = 770;
    ball.vx *= -0.8;
  }
}

function drawPlayer() {
  // Player shadow
  noStroke();
  fill(20, 80, 30, 100);
  ellipse(player.x, player.y + 18, 35, 12);

  fill(30, 90, 255);
  circle(player.x, player.y, player.size);

  fill(255, 220, 175);
  circle(player.x + 3, player.y - 3, 17);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(12);
  text("10", player.x, player.y + 9);
}

function drawBall() {
  noStroke();
  fill(0, 0, 0, 80);
  ellipse(ball.x + 3, ball.y + 5, 22, 12);

  // Ball
  fill(255);
  stroke(30);
  strokeWeight(1);
  circle(ball.x, ball.y, ball.r * 2);

  fill(20);
  noStroke();
  circle(ball.x, ball.y, 7);
  circle(ball.x - 5, ball.y - 4, 4);
  circle(ball.x + 5, ball.y - 4, 4);
  circle(ball.x - 5, ball.y + 4, 4);
  circle(ball.x + 5, ball.y + 4, 4);
}

function drawGoalie() {
  noStroke();
  fill(0, 0, 0, 80);
  ellipse(goalie.x, goalie.y + 28, 55, 12);

  fill(255, 60, 50);
  rectMode(CENTER);
  rect(goalie.x, goalie.y, 28, 45, 8);

  fill(255, 220, 175);
  circle(goalie.x, goalie.y - 29, 22);

  fill(255, 240, 50);
  circle(goalie.x - 19, goalie.y - 5, 13);
  circle(goalie.x + 19, goalie.y - 5, 13);

  rectMode(CORNER);
}

function checkGoal() {
  if (
    ball.x + ball.r >= 775 &&
    ball.y > goalTop + 3 &&
    ball.y < goalBottom - 3
  ) {
    score++;
    message = "GOAL!!! ⚽";
    resetBall();
  }
}

function checkGoalie() {
  let distance = dist(
    ball.x,
    ball.y,
    goalie.x,
    goalie.y
  );

  if (distance < ball.r + 20 && ball.vx > 0) {
    ball.vx = -abs(ball.vx) * 0.8 - 2;
    ball.vy += random(-2, 2);

    saves++;
    message = "The goalkeeper saved it!";
  }
}

function drawScoreboard() {
  // Scoreboard background
  noStroke();
  fill(0, 0, 0, 170);
  rect(20, 25, 225, 75, 10);

  fill(255);
  textAlign(LEFT, CENTER);

  textSize(21);
  text("⚽ SCORE: " + score, 35, 48);

  textSize(14);
  text("Saves: " + saves, 35, 78);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(14);
  text(
    "MOVE: ARROW KEYS     SHOOT: SPACE",
    400,
    465
  );

  textSize(20);
  text(message, 400, 35);
}

function keyPressed() {
  if (key === " " || keyCode === 32) {
    kickBall();
    return false;
  }

  if (key === "r" || key === "R") {
    resetBall();
    message = "Keep playing!";
  }
}

function kickBall() {
  let distance = dist(
    player.x,
    player.y,
    ball.x,
    ball.y
  );

  if (distance < 55) {
    ball.vx = 9;
    ball.vy = (ball.y - player.y) * 0.15;

    message = "Shoot!";
  } else {
    message = "Move closer to the ball!";
  }
}

function resetBall() {
  ball.x = 190;
  ball.y = 250;
  ball.vx = 0;
  ball.vy = 0;

  player.x = 150;
  player.y = 250;
}