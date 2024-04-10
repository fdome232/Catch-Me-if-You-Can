//drawball.js
let ball = {
  x: 0,
  y: 0,
  xspeed: 3,
  yspeed: -2,
  radius: 12, // Ball radius assuming 24x24 circle
  
};

function updateBall() {
  if (ball.x > 550 || ball.x < 100 ) {
    fill(0);
    ellipse(ball.x, ball.y, 25, 25)
  }

if (ball.y > 350 || ball.y < 75) {
  fill(0);
  ellipse(ball.x, ball.y, 25, 25)
}
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
  if (ball.x > 550 || ball.x < 100 ) {
    fill(0);
    ellipse(ball.x, ball.y, 25, 25)
  }

if (ball.y > 350 || ball.y < 75) {
  fill(0);
  ellipse(ball.x, ball.y, 25, 25)
}
}

// function updateBall() {
//   ball.x += ball.xspeed;
//   ball.y += ball.yspeed;

//   //attempt 1 to fix collision issues
//   ball.x = Math.round(ball.x); // Round ball.x position
//   ball.y = Math.round(ball.y); // Round ball.y position

//   // Check for collisions and play sound
//   if (ball.x > width - ball.radius || ball.x < ball.radius) {
//     ball.xspeed *= -1;
//     wallbounce.play();
//   }

//   if (ball.y > height - ball.radius || ball.y < ball.radius) {
//     ball.yspeed *= -1;
//     wallbounce.play();
//   }
// }
function drawball() {
  noStroke();
  fill(255, 0, 0);
  ellipse(ball.x, ball.y, ball.radius * 2, ball.radius * 2);
  updateBall();
}
