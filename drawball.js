//drawball.js
let ball = {
  x: 0,
  y: 0,
  xspeed: 3,
  yspeed: -2,
  radius: 12, // radius of ball; 24x24 pixels
};

function updateBall() {
  // Check for collisions before updating position
  if (
    ball.x + ball.xspeed > width - ball.radius ||
    ball.x + ball.xspeed < ball.radius
  ) {
    ball.xspeed *= -1;
    wallbounce.play();
  } else {
    ball.x += ball.xspeed; // Update X position if no collision
  }

  if (
    ball.y + ball.yspeed > height - ball.radius ||
    ball.y + ball.yspeed < ball.radius
  ) {
    ball.yspeed *= -1;
    wallbounce.play();
  } else {
    ball.y += ball.yspeed; // Update Y position if no collision
  }
}

function drawball() {
  noStroke();
  fill(255, 0, 0);
  ellipse(ball.x, ball.y, ball.radius * 2, ball.radius * 2);
  updateBall();
}
