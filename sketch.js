//sketch.js

let player;
let timer = 10;
let points = 0;

// mode 0 ismain menu, mode 1 is gameplay, mode 2 is game over
let mode = 0;

//the menu background
let menubg;

//sounds
let chimepts, chimego, wallbounce;

//background shift function
let bgshift = 0;

function preload() {
  chimepts = loadSound("pts.wav");
  chimego = loadSound("chime4.wav");
  wallbounce = loadSound("bouncefx.mp3");
  menubg = loadImage("menu.png");
}

function keyPressed() {
  // Spacebar
  if (keyCode === 32) {
    // If in main menu or game over mode, start/restart the game
    if (mode === 0 || mode === 2) {
      startGame();
    }
  }
}

function startGame() {
  mode = 1; // Switch to gameplay mode
  timer = 15; // starting timer
  points = 0; // starting points

  // Set random initial position for the ball within canvas dimensions corrected to not hug the walls
  ball.x = random(825);
  ball.y = random(375);

  bgshift = 0; //background shift

  loop(); // Start the draw loop
}

function setup() {
  menubg = loadImage("menu.png");
  createCanvas(850, 400);
}

function draw() {
  if (mode === 0) {
    displayMainMenu();
  } else if (mode === 1) {
    playGame();
  } else if (mode === 2) {
    displayGameOver(); // Call the function here
  }
}

function displayMainMenu() {
  background(menubg);
  textAlign(CENTER);
  fill(255);
  textSize(25);
  textStyle(BOLD);
  text("Catch Me if You Can", width / 2, 50);
  text("DIRECTIONS:", width / 2, 80);
  textStyle(NORMAL);
  text("Start With 15 Seconds on the Clock.", width / 2, 110);
  text("Click On The Ball to Add More Time.", width / 2, 140);
  text("If Timer Reaches Zero, Game Over.", width / 2, 170);

  textSize(30);
  text("Press SPACEBAR to start", width / 2, 250);
}

/////////////////////////////////////////////////////////
function playGame() {
  background(bgshift, 0, 0);
  
  //fast shift
  //bgshift++;
  
  //slow shift
  bgshift += 0.5;
  if (ball.x > 550 || ball.x < 100) {
    fill(0);
    ellipse(ball.x, ball.y, 25, 25);
  }

  if (ball.y > 350 || ball.y < 75) {
    fill(0);
    ellipse(ball.x, ball.y, 25, 25);
  }
  if (bgshift >= 255) {
    bgshift = 255;
  }

  if (bgshift <= 0) {
    bgshift = 0;
  }

  drawball();

  updateBall();
  bounce();

  player = createVector(mouseX, mouseY);
  timer -= 1 / 60;
  if (timer <= 0) {
    mode = 2; // Switch to game over mode
    chimego.play();
    //noLoop();
  }

  let length = map(timer, 0, 15, 0, 200);
  stroke(255);
  strokeWeight(4);
  fill(36, 173, 17);
  rect(20, 20, 10, length);
  textSize(30);
  noStroke();
  fill(255);
  text("SCORE: ", 650, 30);
  text(points, 750, 30);
}
/////////////////////////////////////////////////////////////////
function displayGameOver() {
  background(0);
  textAlign(CENTER);
  textSize(30); // Set the text size
  fill(255);
  text("Game Over!", width / 2, height / 2 - 40);
  textSize(20); // Set the text size
  text("Press SPACEBAR to restart", width / 2, height / 2);
  text("Score: " + points, width / 2, height / 2 + 50);
  noLoop();
}
/////////////////////////////////////////////////////////////////
function move() {}

function bounce() {}

function drawball() {}

function mouseClicked() {
  const clickTolerance = 25; // click detection in pixels

  let distance = sqrt(
    (mouseX - ball.x) * (mouseX - ball.x) +
      (mouseY - ball.y) * (mouseY - ball.y)
  );

  if (distance <= clickTolerance && mode === 1) {
    points++;
    chimepts.play();
    timer += 1;
    bgshift -= 50;
  }
}
