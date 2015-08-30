var CELL_X = 101;
var CELL_Y = 83;
var ENEMY_OFFSET_Y = 63; // serves to draw enemies aligned to the stones

// Enemies our player must avoid
var Enemy = function () {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.init();
};

Enemy.prototype.init = function () {
  this.x = -CELL_X;
  this.y = ENEMY_OFFSET_Y + getRandomIntInclusive(0, 2) * CELL_Y;
  this.speed = getRandomIntInclusive(75, 375);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
  if (this.x > 5 * CELL_X) {
    this.init();
  }
  var step = this.speed * dt;
  this.x += Math.round(step);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

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
};

Player.prototype.init = function () {
  this.x = getRandomIntInclusive(0, 4) * CELL_X;
  this.y = 5 * CELL_Y;
};

// returns 2 in case of win event, 1 in case of collision and 0 in nothing special happened
Player.prototype.update = function (enemies) {
  if (this.y === 0) { // win event
    this.init();
    return 2;
  }
  var that = this;
  var result = 0;
  enemies.forEach(function (enemy) {
    var distanceX = Math.abs(that.x - enemy.x);
    var distanceY = Math.abs(that.y - enemy.y);

    if (distanceX < CELL_X - 20 && distanceY < ENEMY_OFFSET_Y) { // collision event, 20px are deducted as hero and enemy doesn't occupy all pixels of their respective images
      that.init();
      result = 1;
    }
  });
  return result;
};

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (direction) {
  if (direction === 'left' && this.x > 0) {
    this.x -= CELL_X;
  } else if (direction === 'right' && this.x < 4 * CELL_X) {
    this.x += CELL_X;
  } else if (direction === 'up' && this.y > 0) {
    this.y -= CELL_Y;
  } else if (direction === 'down' && this.y < 5 * CELL_Y) {
    this.y += CELL_Y;
  }
};

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