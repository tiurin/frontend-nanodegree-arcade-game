var cellX = 101;
var cellY = 83;
var enemyOffsetY = 63; // serves to draw enemies aligned to the stones

// Enemies our player must avoid
var Enemy = function () {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.init();
}

Enemy.prototype.init = function () {
  this.x = -cellX;
  this.y = enemyOffsetY + getRandomIntInclusive(0, 2) * cellY;
  this.speed = getRandomIntInclusive(75, 375);
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
  if (this.x > 5 * cellX) {
    this.init();
  }
  var step = this.speed * dt;
  this.x += Math.round(step);
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Returns a random integer between min (included) and max (included)
//
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
  this.sprite = 'images/char-boy.png';
  this.init();
}

Player.prototype.init = function () {
  this.x = getRandomIntInclusive(0, 4) * cellX;
  this.y = getRandomIntInclusive(4, 5) * cellY;
}

Player.prototype.update = function (enemies) {
  var that = this;
  enemies.forEach(function (enemy) {
    var distanceX = Math.abs(that.x - enemy.x);
    var distanceY = Math.abs(that.y - enemy.y);

    if (distanceX < cellX && distanceY < enemyOffsetY) {
      that.init();
    }
  });
}

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function (direction) {
  if (direction === 'left' && this.x > 0) {
    this.x -= cellX;
  } else if (direction === 'right' && this.x < 4 * cellX) {
    this.x += cellX;
  } else if (direction === 'up' && this.y > 0) {
    this.y -= cellY;
  } else if (direction === 'down' && this.y < 5 * cellY) {
    this.y += cellY;
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];
// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});