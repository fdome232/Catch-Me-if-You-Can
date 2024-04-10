//physics.js
function move() {}

function bounce() {
  if (ball.x > width || ball.x < 0) {
    // Check for right and left wall collisions
    ball.xspeed *= -1;
    wallbounce.play();
  }

  if (ball.y > height || ball.y < 0) {
    // Check for top and bottom wall collisions
    ball.yspeed *= -1;
    wallbounce.play();
  }
  
}
