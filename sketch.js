//sketch.js

let player;
let timer = 10;
let points = 0;
let mode = 0; // mode 0: main menu, mode 1: gameplay, mode 2: game over

let chimepts, chimego, wallbounce;

//background shift function
let bgshift = 0;

// let rectWidth = 850;
// let rectHeight = 400;
// let currentRectSize = rectWidth;

function preload() {
  chimepts = loadSound("pts.wav");
  chimego = loadSound("chime4.wav");
  wallbounce = loadSound("bouncefx.mp3");
}

function keyPressed() {
  if (keyCode === 32) {
    // Spacebar
    if (mode === 0 || mode === 2) {
      // If in main menu or game over mode, start/restart the game
      startGame();
    }
  }
}

function startGame() {
  mode = 1; // Switch to gameplay mode
  timer = 15; // Reset timer
  points = 0; // Reset points
  ball.x = random(825); // Set random initial position for the ball within canvas dimensions corrected to not hug the walls
  ball.y = random(375);
  bgshift = 0; // Reset background shift
  loop(); // Start the draw loop
}

function setup() {
  createCanvas(850, 400);
  // fill(0);
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
  background(255);
  textAlign(CENTER);

  textSize(20);
  textStyle(BOLD);
  text("Title of Game", width / 2, 20);
  text("DIRECTIONS:", width / 2, 50);
  textStyle(NORMAL);
  text("Start With 15 Second Timer.", width / 2, 80);
  text("Click On The Ball to Add More Time.", width / 2, 110);
  text("If Timer Reaches Zero, Game Over.", width / 2, 140);

  textSize(30);
  text("Press SPACEBAR to start", width / 2, height / 2);
}

/////////////////////////////////////////////////////////
function playGame() {
  //fill(0);
  // rect(0, 0, currentRectSize, rectHeight);
  background(bgshift, 0, 0);
  
  // fill(0);
  // rect(0, 0, currentRectSize, rectHeight);
  bgshift++;

  if (bgshift >= 255) {
    bgshift = 255;
  }

  if (bgshift <= 0) {
    bgshift = 0;
  }

  drawball();
  // move();
  updateBall();
  bounce();

  player = createVector(mouseX, mouseY);
  timer -= 1 / 60;
  if (timer <= 0){// || currentRectSize <= 0) {
    mode = 2; // Switch to game over mode
    chimego.play();
    //noLoop();
  }
  // let shrinkRate = map(timer, 0, 15, 0, rectWidth * 0.8); // Reduce max shrink to 80% of width
  // currentRectSize = Math.max(0, rectWidth - shrinkRate); // Ensure minimum size is 0

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
  background(255);
  textAlign(CENTER);
  textSize(30); // Set the text size
  fill(0);
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
  const clickTolerance = 25; // Radius for click detection (in pixels)

  let distance = sqrt(
    (mouseX - ball.x) * (mouseX - ball.x) +
      (mouseY - ball.y) * (mouseY - ball.y)
  );

  if (distance <= clickTolerance && mode === 1) {
    points++;
    chimepts.play();
    timer += 1;
    bgshift -= 100;

    // currentRectSize += 5; // Increase rectangle size based on reward size
  }
}
